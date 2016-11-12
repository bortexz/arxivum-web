import { Injectable } from '@angular/core';

// AuthService uses normal Http service to avoid circular dependency,
// and because it doesn't need to check for 401 error
import {Http} from '@angular/http';
const urljoin = require('url-join');
import 'rxjs/add/operator/map'; // map for type Observable<Response>
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  private loggedIn = false;
  private loginUrl = urljoin(environment.server_url, 'authenticate');

  constructor(private http: Http, private router: Router) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email, password) {
    return this.http
      .post(
        this.loginUrl,
        { email, password }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.token) {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('user_id', res.user_id);
          this.loggedIn = true;
        }
        return res;
      });
  }

  // Removes token and redirects to login page
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    this.loggedIn = false;
    this.router.navigate(['/login']); // have another home with no login required?
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
