import { IFile } from '../files/files.interfaces';
import { assign, findById } from '../../utils/functional';
import { IDownloadingFile } from './downloader.reducer';
import { FilesService } from '../files/files.service';
import { AppState } from '../../app.reducers';
import { Action, Store } from '@ngrx/store';
import { ExtractionResult } from '@angular/compiler/src/i18n/extractor_merger';
import { Observable } from 'rxjs/Observable';
import { DownloaderActions } from './downloader.actions';
import { DownloaderService } from './downloader.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable, Inject } from '@angular/core';
import { DECRYPT_ALGO } from '../../utils/crypto';

// const from = require('from2');
const streamToPromise = require('stream-to-promise');
const R = require('ramda');
// const crypto = require('crypto-browserify');
const blobUtil = require('blob-util');
const debug = require('debug')('arxivum:downloading:effects');

@Injectable()
export class DownloaderEffects {

  // @Effect()
  // downloadItemComplete$ = this.actions$
  //   .ofType(DownloaderActions.DOWNLOAD_FILE_COMPLETED)
  //   .map((action) => this.downloaderActions.decrypt(action.payload._id));

  // @Effect()
  // decrypt$ = this.actions$
  //   .ofType(DownloaderActions.DOWNLOAD_FILE_DECRYPTING)
  //   .withLatestFrom(this.store.select(state => state.downloading))
  //   .switchMap(([action, downloading]) => {
  //     const file = findById(action.payload._id)(downloading.files);
  //     return this.filesService.getOne(file._id)
  //       .pluck('encryption_key')
  //       .switchMap(key => {
  //         const decipher = crypto.createDecipher(DECRYPT_ALGO, key);
  //         const stream = file.torrent_file.createReadStream();
  //         return Observable.fromPromise(streamToPromise(stream.pipe(decipher)));
  //       })
  //       .map(decryptedStream => this.downloaderActions.decryptSuccess(file._id, decryptedStream))
  //       .catch(err => Observable.of(this.downloaderActions.decryptError(file._id, err)));
  //   });

  @Effect()
  downloadFile$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE)
    .map(action => action.payload.file)
    .switchMap((file: IFile) => {
      return Observable
        .fromPromise(this.downloaderService.download(file))
        .switchMap((downloadingFile: IDownloadingFile) => this.filesService.getOne(downloadingFile._id)
          .pluck('encryption_key')
          .map(key => {
            (window as any).TEST_KEY = key;
            // const decipher = crypto.createDecipher(DECRYPT_ALGO, key);
            // const stream = downloadingFile.torrent_file.createReadStream();
            // return assign({ read_stream: stream.pipe(decipher) }, downloadingFile);
            return downloadingFile;
          })
          .map((fileToAdd: IDownloadingFile) => this.downloaderActions.downloadFileAdded(fileToAdd))
          .catch(err => Observable.throw(err))
        )
        .catch(err => debug(err));
    });
    //

  @Effect()
  totalProgress$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM)
    .sample(Observable.interval(100))
    .map(() => Math.round(this.downloaderService.client['progress'] * 100))
    .map(totalProgress =>
      this.downloaderActions.downloadFileProgressAll(totalProgress));

  @Effect({ dispatch: false })
  onItemRemoved$ = this.actions$
    .ofType(DownloaderActions.REMOVE_FILE)
    .do((action) => {
      this.downloaderService.remove(action.payload.file);
    });

  @Effect({ dispatch: false })
  saveFile$ = this.actions$
    .ofType(DownloaderActions.SAVE_FILE)
    .withLatestFrom(this.store.select(state => state.downloading))
    .switchMap(([action, downloading]) => {
      const file = findById(action.payload._id)(downloading.files);
      return Observable.fromPromise(streamToPromise(file.read_stream))
        .switchMap(buff => Observable.fromPromise(blobUtil.arrayBufferToBlob(buff))
          .do(blob => {
            const link = document.createElement('a');
            link.target = '_blank';
            link.download = file.name;
            link.href = blobUtil.createObjectURL(blob);
            link.click();
          })
        )
        .catch(err => debug(err));
    });

  constructor (
    private actions$: Actions,
    private downloaderService: DownloaderService,
    private filesService: FilesService,
    private downloaderActions: DownloaderActions,
    private store: Store<AppState>
  ) {

  }
}
