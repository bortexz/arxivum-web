import { Observable } from 'rxjs/Rx';
import { DECRYPT_ALGO } from '../../utils/crypto';
import { FinishedDecrypting, SaveFile, StartDecrypting } from './downloader.actions';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { FilesService } from '../files/files.service';
import { DownloaderService } from './downloader.service';
import { Actions, Effect } from '@ngrx/effects';
import * as DownloaderActions from './downloader.actions';
const crypto = require('crypto-browserify');
const streamToPromise = require('stream-to-promise');
const blobUtil = require('blob-util');

@Injectable()
export class DownloaderEffects {

  @Effect({ dispatch: false })
  onItemRemoved$ = this.actions$
    .ofType(DownloaderActions.REMOVE_FILE)
    .do((action: DownloaderActions.RemoveFile) => {
      this.downloaderService.remove(action.file);
    });

  @Effect()
  updateTotalProgress$ = this.actions$
    .ofType(DownloaderActions.FILE_PROGRESS)
    .sampleTime(250)
    .map((action: DownloaderActions.FileProgress)  => new DownloaderActions.TotalProgress(this.downloaderService.client.progress))

  @Effect()
  saveFile$ = this.actions$
    .ofType(DownloaderActions.SAVE_FILE)
    .do(action => this.store.dispatch(new StartDecrypting((<SaveFile>action).file._id)))
    .switchMap(action => {
      const file = (<SaveFile>action).file;
      return this.filesService.getOne(file._id)
        .pluck('encryption_key')
        .switchMap(key => {
          const decipher = crypto.createDecipher(DECRYPT_ALGO, key);
          const stream = file.torrent_file.createReadStream();
          return Observable.fromPromise(streamToPromise(stream.pipe(decipher)));
        })
        .switchMap(decrypted => {
          return Observable.fromPromise(blobUtil.arrayBufferToBlob(decrypted))
        })
        .do(blob => {
          const link = document.createElement('a');
          link.target = '_blank';
          link.download = file.name;
          link.href = blobUtil.createObjectURL(blob);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .map(() => new FinishedDecrypting(file._id))
        // .catch(err => Observable.of(new ))
    })

    constructor (
      private actions$: Actions,
      private downloaderService: DownloaderService,
      private filesService: FilesService,
      private store: Store<AppState>,
      private router: Router
    ) {};
}
