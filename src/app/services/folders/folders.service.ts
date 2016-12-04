import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ArxivumHttp } from '../../utils/http/arxivum-http.service';

const urljoin = require('url-join');

@Injectable()
export class FoldersService {
  private foldersUrl = urljoin(environment.api_url, 'folders');

  // Should cache data?

  constructor(private http: ArxivumHttp) { }

  /**
   * Function to get one folder. If id is NOT specified, then root folder will
   * be returned.
   */
  getOne (id?) {
    let url = id ? urljoin(this.foldersUrl, id) : this.foldersUrl;
    return this.http.get(url).map(res => res.json());
  }

  create (data) {
    return this.http.post(this.foldersUrl, data).map(res => res.json());
  }
}
