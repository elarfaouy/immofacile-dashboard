import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {UserActions} from "../../user/actions/user.actions";
import {selectUserError, selectUserKeys} from "../../user/selectors/user.selectors";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  hide = true;
  username: string = "";
  password: string = "";
  keys = this.store.pipe(select(selectUserKeys));
  error = this.store.pipe(select(selectUserError));

  constructor(
    private store: Store,
    private route: Router,
    private toast: ToastrService
  ) {
  }

  login() {
    this.store.dispatch(UserActions.login({username: this.username, password: this.password}));
    this.keys.subscribe(
      (value) => {
        if (value.accessToken !== "" && value.tokenExpiration !== "" && value.refreshToken !== ""){
          localStorage.setItem("access-token", value.accessToken);
          localStorage.setItem("token-expiration", value.tokenExpiration)
          localStorage.setItem("refresh-token", value.refreshToken);

          this.route.navigate(['/dashboard']);
        }
      }
    );

    this.error.subscribe(
      (value) => {
        if (value !== null){
          this.toast.error(value);
        }
      }
    );
  }
}
