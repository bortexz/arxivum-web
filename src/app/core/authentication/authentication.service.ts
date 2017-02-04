import { Store } from '@ngrx/store';
import 'rxjs/src/add/operator/map';
import { environment } from '../../../environments/environment';
import { AuthenticationState } from './authentication.reducer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const urljoin = require('url-join');

/**
 * AuthenticationService, contains login and logout function, as well as
 * a state with loggedIn and admin properties. Usually, when navigating to
 * different pages in the app, we will not check this state, but instead
 * will do HTTP requests to backend to verify we have access to that page.
 *
 * Instead, this can be used for different elements in the UI that are only
 * visible if a user is logged in or admin
 */

@Injectable()
export class AuthenticationService {
  private user: Observable<AuthenticationState>;
  private loginUrl = urljoin(environment.api_url, 'authenticate');

  constructor(
    private http: Http
  ) {
  }

  login(email, password) {
    return this.http
      .post(this.loginUrl, { email, password })
      .map(res => res.json());
  }

  /**
   * opts contains name, email, password, token
   */
  register (opts) {

  }
}
