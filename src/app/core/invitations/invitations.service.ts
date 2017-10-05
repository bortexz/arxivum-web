import { HttpParams } from '@angular/common/http/';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

const urljoin = require('url-join');

@Injectable()
export class InvitationsService {
  private invitationsUrl = urljoin(environment.api_url, 'invitations');

  constructor (private http: HttpClient) {}

  getAll () {
    // const params = new HttpParams().set('fulfilled', 'false');
    return this.http.get(this.invitationsUrl);
  }

  create (email) {
    return this.http.post(this.invitationsUrl, { email });
  }

  resend (id) {
    return this.http.get(urljoin(this.invitationsUrl, id, 'resend'))
  }

  remove (id) {
    return this.http.delete(urljoin(this.invitationsUrl, id))
  }

}
