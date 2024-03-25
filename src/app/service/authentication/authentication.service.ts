import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {UserAuthInterface} from "../../user/models/user-auth.interface";
import {AuthResponseInterface} from "../../user/models/auth-response.interface";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = "http://localhost:8080/api/auth/";
  private _user: UserAuthInterface | null = null;

  constructor(
    private toast: ToastrService,
    private router: Router,
    private http: HttpClient,
    ) {
  }

  set user(user: UserAuthInterface) {
    this._user = user;
  }

  get user(): Observable<UserAuthInterface> {
    if (!this._user) {
      let userObservable = this.profile();
      userObservable.subscribe(
        (user) => this.user = user
      );
      return userObservable;
    }

    return of(this._user);
  }

  login(username: string, password: string): Observable<AuthResponseInterface> {
    return this.http.post<AuthResponseInterface>(this.url + 'login', {username, password});
  }

  profile(): Observable<UserAuthInterface> {
    return this.http.get<UserAuthInterface>(this.url + 'profile');
  }

  isAuthenticate(): Observable<boolean> {
    let token = localStorage.getItem("access-token");
    let expiration = localStorage.getItem("token-expiration");

    if (token && expiration) {
      const expirationDate = new Date(expiration);
      const now = new Date();

      if (expirationDate >= now) {
        return of(true);
      }

      return this.user
        .pipe(
          map(() => true)
        );
    }
    this.toast.error("You are not authenticated")

    this.router.navigate(["/login"]);

    return of(false);
  }

  hasRightAuthority(authority: string): Observable<boolean> {
    return this.user.pipe(
      map(user => user.authorities.length > 0 && user.authorities.includes(authority)),
      tap((value) => {
          if (!value) {
            this.toast.error("You don't have the right authority");
            this.clearToken();
            this.router.navigate(["/"]);
          }
        }
      )
    );
  }

  logout() {
    this.http.post(this.url + 'logout', null).subscribe(
      () => {
        this.clearToken();
      }
    );
  }

  refreshToken(): Observable<AuthResponseInterface> {
    let refreshToken = localStorage.getItem("refresh-token");
    return this.http.post<AuthResponseInterface>(this.url + 'refresh-token', {refreshToken}).pipe(
      tap((response) => {
        localStorage.setItem("access-token", response["access-token"]);
        localStorage.setItem("token-expiration", response["token-expiration"]);
      }),
      catchError((error: HttpErrorResponse) => {
        this.clearToken();
        return throwError(() => new Error("No or Invalid refresh token"));
      })
    );
  }

  clearToken() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("token-expiration");
    localStorage.removeItem("refresh-token");

    this._user = null;
  }
}
