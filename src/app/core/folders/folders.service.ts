import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urljoin = require('url-join');

@Injectable()
export class FoldersService {
  public foldersUrl = urljoin(environment.api_url, 'folders');

  constructor(private http: HttpClient) { }

  /**
   * Function to get one folder. If id is NOT specified, then root folder will
   * be returned.
   */
  getOne (id?) {
    const url = id ? urljoin(this.foldersUrl, id) : this.foldersUrl;
    return this.http.get(url);
  }

  create (data) {
    return this.http.post(this.foldersUrl, data);
  }

  getTree() {
    return this.http.get(urljoin(this.foldersUrl, 'tree'))
  }

  update (id, data) {
    return this.http.patch(urljoin(this.foldersUrl, id), data);
  }

  delete (id) {
    return this.http.delete(urljoin(this.foldersUrl, id));
  }
}
