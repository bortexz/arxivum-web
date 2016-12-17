import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthenticationService } from '../authentication/authentication.service';
import { FilesService } from '../files/files.service';

import * as querystring from 'querystring';

@Injectable()
export class FileUploaderService {

  constructor(
    private authService: AuthenticationService,
    private filesService: FilesService
  ) { }

  getNewFileUploader (opts: any = {}) {
    if (typeof opts.query === 'object' && opts.query !== null) {
      opts.query = querystring.stringify(opts.query);
    }

    return new FileUploader({
      authToken: this.authService.authToken,
      url: this.filesService.filesUrl + (opts.query ? `?${opts.query}` : ''),
      autoUpload: true
    });
  }

}
