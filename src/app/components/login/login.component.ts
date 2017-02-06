import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationActions } from '../../core/authentication/authentication.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ax-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authActions: AuthenticationActions
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit () {
    const {email, password} = this.loginForm.value;
    this.store.dispatch(this.authActions.login(email, password));
  }
}
