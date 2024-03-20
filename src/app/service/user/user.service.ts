import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInterface} from "../../user/models/user.interface";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "http://localhost:8080/api/user";

  constructor(private http: HttpClient) {
  }

  getUsers(onlyWantToBeAgent: boolean): Observable<UserInterface[]> {
    let observable = this.http.get<any>(this.url, {
      params: {
        onlyWantToBeAgent: onlyWantToBeAgent ? "true" : "false"
      }
    });

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  suspendUser(username: string): Observable<UserInterface> {
    let observable = this.http.post<any>(`${this.url}/suspend/${username}`, {});

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  unsuspendUser(username: string): Observable<UserInterface> {
    let observable = this.http.post<any>(`${this.url}/unsuspend/${username}`, {});

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${username}`);
  }

  acceptUserAsAgent(username: string): Observable<UserInterface> {
    let observable = this.http.post<any>(`${this.url}/accept/${username}`, {});

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }
}
