import { AuthenticationActions } from '../../core/authentication/authentication.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  selector: 'ax-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private authActions: AuthenticationActions
  ) {}

  ngOnInit() {
  }

}
