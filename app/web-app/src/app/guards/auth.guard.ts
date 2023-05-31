import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return (): boolean => {
      if (!this.authService.currentUserValue) {
        this.router.navigate(['/auth']);
        return false;
      }
      return true;
    }
  }
}