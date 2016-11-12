import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'ax-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;

  private onLoginSuccess = (result) => {
    if (result) {
      this.router.navigate(['/home']);
    }
  }

  private onLoginError = (err) => {
    console.log('Error from the login component');
  }

  constructor(private authentication: AuthenticationService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    this.authentication.login(this.user, this.password).subscribe(this.onLoginSuccess, this.onLoginError);
  }

}
