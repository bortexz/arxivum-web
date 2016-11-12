import { Injectable } from '@angular/core';
import { ArxivumHttp } from '../../utils/http/arxivum-http.service';
import * as url from 'url';

import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {
  private usersUrl = url.resolve(environment.server_url, 'users');

  constructor(private http: ArxivumHttp) { }

  getOne (id) {
    return this.http.get(url.resolve(this.usersUrl, id)).map(res => res.json());
  }

  getAll () {
    return this.http.get(this.usersUrl).map(res => res.json());
  }

}
