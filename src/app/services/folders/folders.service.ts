import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ArxivumHttp } from '../../utils/http/arxivum-http.service';

const urljoin = require('url-join');

@Injectable()
export class FoldersService {
  private foldersUrl = urljoin(environment.api_url, 'folders');

  constructor(private http: ArxivumHttp) { }

  getOne (id) {
    return this.http.get(urljoin(this.foldersUrl, id)).map(res => res.json());
  }

  getAll () {
    return this.http.get(this.foldersUrl).map(res => res.json());
  }

}
