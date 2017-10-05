import { HttpClient } from '@angular/common/http/';
import { Injectable } from '@angular/core';
const urljoin = require('url-join');

import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {
  private usersUrl = urljoin(environment.api_url, 'users');

  constructor(private http: HttpClient) { }

  getOne (id) {
    return this.http.get(urljoin(this.usersUrl, id));
  }

  getAll () {
    return this.http.get(this.usersUrl);
  }

  register ({name, email, password, token}) {
    return this.http.post(urljoin(this.usersUrl, 'register'), {name, email, password, token});
  }

  changePassword (current_password, new_password) {
    return this.http.put(urljoin(this.usersUrl, 'password'), {current_password, new_password})
  }
}
