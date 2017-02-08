import { environment } from '../../../environments/environment';
import { ArxivumHttp } from '../../utils/http/arxivum-http.service';
import { Injectable } from '@angular/core';

const urljoin = require('url-join');

@Injectable()
export class InvitationsService {
  private invitationsUrl = urljoin(environment.api_url, 'invitations');

  constructor (private http: ArxivumHttp) {}

  getAll () {
    return this.http.get(this.invitationsUrl).map(res => res.json());
  }

  create (email) {
    return this.http.post(this.invitationsUrl, { email }).map(res => res.json());
  }

  // resend (id) {

  // }

}
