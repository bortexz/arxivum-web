import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urljoin = require('url-join');

export interface IFile {
  _id: string;
  name: string;
  size: number;
  folder: string; // folder id
  torrent: any;
  encryption_key?: string;
}

@Injectable()
export class FilesService {
  public filesUrl = urljoin(environment.api_url, 'files');

  constructor() { }

}
