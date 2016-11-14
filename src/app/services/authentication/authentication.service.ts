import { Injectable } from '@angular/core';

// AuthService uses normal Http service to avoid circular dependency,
// and because it doesn't need to check for 401 error
import {Http} from '@angular/http';
const urljoin = require('url-join');
import 'rxjs/add/operator/map'; // map for type Observable<Response>
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

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
  private user = null;

  private loginUrl = urljoin(environment.server_url, 'authenticate');

  constructor(private http: Http, private router: Router) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.user = user;
      }
    } catch (e) {
      // There is no user
    }
  }

  login(email, password) {
    return this.http
      .post(
        this.loginUrl,
        { email, password }
      )
      .map(res => res.json())
      .map((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('user', JSON.stringify(res));
          this.user = res;
        }
        return res;
      });
  }

  // Removes token and redirects to login page
  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']); // have another home with no login required?
  }

  get loggedIn() {
    return !!this.user;
  }

  get admin() {
    return this.user.admin;
  }
}
