import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog, faHouse, faListCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [FontAwesomeModule, RouterLink],
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  protected readonly faHouse = faHouse;
  protected readonly faUsers = faUsers;
  protected readonly faListCheck = faListCheck;
  protected readonly faCog = faCog;

  constructor(private router: Router, private authService:AuthService) {}

  logout() {
    this.authService.logout();
  }
}
