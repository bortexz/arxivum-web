import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthenticationService } from '../authentication/authentication.service';
import { FilesService } from '../files/files.service';

import * as querystring from 'querystring';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileUploaderService {

  uploader: FileUploader = new FileUploader({
    authToken: this.authService.authToken,
    url: this.filesService.filesUrl
  });

  onSuccess: Observable<any>;

  constructor(
    private authService: AuthenticationService,
    private filesService: FilesService
  ) {
    this.onSuccess = new Observable(subs => {
      this.uploader.onSuccessItem = (file) => subs.next(file);
    });
  }

  uploadAll (query?) {
    this.uploader.setOptions({
      url: this.filesService.filesUrl + (query ? `?${querystring.stringify(query)}` : ''),
      authToken: this.authService.authToken
    });

    this.uploader.uploadAll();
  }

}
