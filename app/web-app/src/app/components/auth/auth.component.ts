import { Component } from '@angular/core';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class AuthComponent {

  errorMessage: string;
  displayModeString: string;
  isLoginMode: boolean = true;
  modeButtonString: string = "Login";
  wantToRegister = "Don't have an account? Click here to register"
  wantToLogin = "Already have an account? Click here to login "

  form: FormGroup;

  constructor(private router: Router) {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.displayModeString = this.wantToRegister;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
    if (this.isLoginMode) {
      this.displayModeString = this.wantToRegister
      this.modeButtonString = "Login"
    }
    else {
      this.displayModeString = this.wantToLogin
      this.modeButtonString = "Register"
    }
  }

  submit() {
    if (this.isLoginMode) {
      this.login()
    }
    else if (!this.isLoginMode) {
      this.signUp()
    }
  }

  login() {
    return
    // validate form
    // call the function from the service
    // navigate router if user exists
    // if not display the message from api error
  }

  signUp() {
    return
    // validate form
    // call the function from the service
    // navigate router to home page
    // if not display the message from api error
  }



}  
