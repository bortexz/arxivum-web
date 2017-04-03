import { Observable } from 'rxjs/Rx';
import { ArxivumHttp } from '../../utils/http/arxivum-http.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urljoin = require('url-join');

@Injectable()
export class FilesService {
  public filesUrl = urljoin(environment.api_url, 'files');

  getOne(id) {
    return this.http.get(urljoin(this.filesUrl, id)).map(res => res.json());
  }

  remove(id) {
    return this.http.delete(urljoin(this.filesUrl, id)).map(res => res.json());
  }

  constructor(
    private http: ArxivumHttp
  ) { }

}
