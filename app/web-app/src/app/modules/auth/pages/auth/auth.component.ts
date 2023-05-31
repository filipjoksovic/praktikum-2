import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit{
  errorMessage: string;
  displayModeString: string;
  isLoginMode = true;
  modeButtonString = 'Login';
  wantToRegister = "Don't have an account? Click here to register";
  wantToLogin = 'Already have an account? Click here to login ';

  form: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.displayModeString = this.wantToRegister;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.displayModeString = this.wantToRegister;
      this.modeButtonString = 'Login';
    } else {
      this.displayModeString = this.wantToLogin;
      this.modeButtonString = 'Register';
    }
  }

  submit() {
    if (this.isLoginMode) {
      this.login();
    } else if (!this.isLoginMode) {
      this.signUp();
    }
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value.email, this.form.value.password).subscribe({
      next: (data) => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

  signUp() {
    if (this.form.invalid) {
      return;
    }

    this.authService.register(this.form.value).subscribe({
      next: (data) => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
