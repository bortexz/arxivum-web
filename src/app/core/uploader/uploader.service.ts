import * as FoldersActions from '../folders/folders.actions';
import * as UploaderActions from './uploader.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FilesService } from '../files/files.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploaderService {
  uploader: FileUploader;

  constructor(
    private store: Store<AppState>,
    private filesService: FilesService
  ) {

    this.uploader = new FileUploader({});

    this.uploader.onAfterAddingAll = (files) => {
      this.store.dispatch(
        new UploaderActions.UpdateQueue(this.uploader.queue)
      );
    };

    this.uploader.onSuccessItem = (item) => {
      // Not the best to put reload here
      this.store.dispatch(new FoldersActions.ReloadList())
    };

    this.uploader.onProgressItem = (item) => {
      this.store.dispatch(new UploaderActions.UpdateFileProgress(item));
    };

    this.uploader.onProgressAll = (progress) => {
      this.store.dispatch(new UploaderActions.UpdateTotalProgress(progress));
    };
  }

  clearQueue () {
    this.uploader.clearQueue();
  }
}
