import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


const urljoin = require('url-join');

@Injectable()
export class FilesService {
  public filesUrl = urljoin(environment.api_url, 'files');

  getOne(id) {
    return this.http.get(urljoin(this.filesUrl, id));
  }

  remove(id) {
    return this.http.delete(urljoin(this.filesUrl, id));
  }

  update(id, data) {
    return this.http.patch(urljoin(this.filesUrl, id), data);
  }

  constructor(
    private http: HttpClient
  ) { }

}
