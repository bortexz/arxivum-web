import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../core/authentication/authentication.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ax-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  @Output() onSubmit = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit () {
    this.onSubmit.emit(this.loginForm.value);
  }
}
