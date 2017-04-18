import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ArxivumHttp } from '../../utils/http/arxivum-http.service';

const urljoin = require('url-join');

@Injectable()
export class FoldersService {
  public foldersUrl = urljoin(environment.api_url, 'folders');

  constructor(private http: ArxivumHttp) { }

  /**
   * Function to get one folder. If id is NOT specified, then root folder will
   * be returned.
   */
  getOne (id?) {
    const url = id ? urljoin(this.foldersUrl, id) : this.foldersUrl;
    return this.http.get(url).map(res => res.json());
  }

  create (data) {
    return this.http.post(this.foldersUrl, data).map(res => res.json());
  }

  getTree() {
    return this.http.get(urljoin(this.foldersUrl, 'tree')).map(res => res.json());
  }

  update (id, data) {
    return this.http.patch(urljoin(this.foldersUrl, id), data);
  }

  delete (id) {
    return this.http.delete(urljoin(this.foldersUrl, id));
  }
}
