import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ArxivumHttp } from '../../utils/http/arxivum-http.service';

const urljoin = require('url-join');

@Injectable()
export class FoldersService {
  private foldersUrl = urljoin(environment.api_url, 'folders');

  // Should cache data?

  constructor(private http: ArxivumHttp) { }

  getOne (id) {
    return this.http.get(urljoin(this.foldersUrl, id)).map(res => res.json());
  }

  getAll () {
    return this.http.get(this.foldersUrl).map(res => res.json());
  }

  create (data) {
    console.log(data);
    return this.http.post(this.foldersUrl, data).map(res => res.json());
  }
}
