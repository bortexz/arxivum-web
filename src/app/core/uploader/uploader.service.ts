import { UploaderActions } from './uploader.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FilesService } from '../files/files.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploaderService {

  authToken: string;
  onSuccess: Observable<any>;

  uploader: FileUploader;

  constructor(
    private store: Store<AppState>,
    private filesService: FilesService,
    private uploaderActions: UploaderActions
  ) {

    this.uploader = new FileUploader({});

    this.uploader.onAfterAddingAll = (files) => {
      this.store.dispatch(
        this.uploaderActions.uploadFilesUpdateQueue(this.uploader.queue)
      );
    };

    this.uploader.onSuccessItem = (item) => {
      this.store.dispatch(
        this.uploaderActions.uploadFilesOnSuccessItem(item)
      );
    };

    this.uploader.onProgressItem = (item) => {
      this.store.dispatch(
        this.uploaderActions.uploadFilesOnProgressItem(item)
      );
    };

    this.uploader.onProgressAll = (progress) => {
      this.store.dispatch(
        this.uploaderActions.uploadFilesOnProgressAll(progress)
      );
    };
  }

  clearQueue () {
    this.uploader.clearQueue();
  }

}
