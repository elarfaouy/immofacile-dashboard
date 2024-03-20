import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = "";
  password: string = "";

  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (value) => {
        localStorage.setItem("access-token", value["access-token"]);
        localStorage.setItem("token-expiration", value["token-expiration"])
        localStorage.setItem("refresh-token", value["refresh-token"]);

        this.route.navigate(['/dashboard']);
      }
    );
  }
}
