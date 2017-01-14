import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urljoin = require('url-join');

@Injectable()
export class FilesService {
  public filesUrl = urljoin(environment.api_url, 'files');

  constructor() { }

}
