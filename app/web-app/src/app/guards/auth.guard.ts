import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    console.log(this.authService.currentUserValue);

    if (!this.authService.currentUserValue) {
      // this.router.navigate(['/auth']);
      console.log('Should redirect');
      this.router.navigateByUrl('/auth');

      return false;
    }
    return true;
  }
}
