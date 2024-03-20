import {Component} from '@angular/core';
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  constructor(
    private route: Router,
    private authService: AuthenticationService
  ) {}

  logout() {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
