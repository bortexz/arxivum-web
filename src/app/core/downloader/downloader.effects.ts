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
// import { IFile } from '../files/files.interfaces';
// import { assign, findById } from '../../utils/functional';
// import { IDownloadingFile } from './downloader.reducer';
// import { FilesService } from '../files/files.service';
// import { AppState } from '../../app.reducers';
// import { Action, Store } from '@ngrx/store';
// import { ExtractionResult } from '@angular/compiler/src/i18n/extractor_merger';
// import { Observable } from 'rxjs/Observable';
// import { DownloaderActions } from './downloader.actions';
// import { DownloaderService } from './downloader.service';
// import { Actions, Effect } from '@ngrx/effects';
// import { Injectable, Inject } from '@angular/core';
// import { DECRYPT_ALGO } from '../../utils/crypto';

// // const from = require('from2');
// const streamToPromise = require('stream-to-promise');
// const R = require('ramda');
// // const crypto = require('crypto-browserify');

// const debug = require('debug')('arxivum:downloading:effects');
// @Injectable()
// export class DownloaderEffects {

//   // @Effect()
//   // downloadItemComplete$ = this.actions$
//   //   .ofType(DownloaderActions.DOWNLOAD_FILE_COMPLETED)
//   //   .map((action) => this.downloaderActions.decrypt(action.payload._id));

//   // @Effect()
//   // decrypt$ = this.actions$
//   //   .ofType(DownloaderActions.DOWNLOAD_FILE_DECRYPTING)
//   //   .withLatestFrom(this.store.select(state => state.downloading))
//   //   .switchMap(([action, downloading]) => {
//   //     const file = findById(action.payload._id)(downloading.files);
//   //     return this.filesService.getOne(file._id)
//   //       .pluck('encryption_key')
//   //       .switchMap(key => {
//   //         const decipher = crypto.createDecipher(DECRYPT_ALGO, key);
//   //         const stream = file.torrent_file.createReadStream();
//   //         return Observable.fromPromise(streamToPromise(stream.pipe(decipher)));
//   //       })
//   //       .map(decryptedStream => this.downloaderActions.decryptSuccess(file._id, decryptedStream))
//   //       .catch(err => Observable.of(this.downloaderActions.decryptError(file._id, err)));
//   //   });

//   @Effect()
//   downloadFile$ = this.actions$
//     .ofType(DownloaderActions.DOWNLOAD_FILE)
//     .map(action => action.payload.file)
//     .switchMap((file: IFile) => {
//       return Observable
//         .fromPromise(this.downloaderService.download(file))
//         .switchMap((downloadingFile: IDownloadingFile) => this.filesService.getOne(downloadingFile._id)
//           .pluck('encryption_key')
//           .map(key => {
//             (window as any).TEST_KEY = key;
//             // const decipher = crypto.createDecipher(DECRYPT_ALGO, key);
//             // const stream = downloadingFile.torrent_file.createReadStream();
//             // return assign({ read_stream: stream.pipe(decipher) }, downloadingFile);
//             return downloadingFile;
//           })
//           .map((fileToAdd: IDownloadingFile) => this.downloaderActions.downloadFileAdded(fileToAdd))
//           .catch(err => Observable.throw(err))
//         )
//         .catch(err => debug(err));
//     });
//     //

//   @Effect()
//   totalProgress$ = this.actions$
//     .ofType(DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM)
//     .sample(Observable.interval(100))
//     .map(() => Math.round(this.downloaderService.client['progress'] * 100))
//     .map(totalProgress =>
//       this.downloaderActions.downloadFileProgressAll(totalProgress));

//   @Effect({ dispatch: false })
//   saveFile$ = this.actions$
//     .ofType(DownloaderActions.SAVE_FILE)
//     .withLatestFrom(this.store.select(state => state.downloading))
//     .switchMap(([action, downloading]) => {
//       const file = findById(action.payload._id)(downloading.files);
//       return Observable.fromPromise(streamToPromise(file.read_stream))
//         .switchMap(buff => Observable.fromPromise(blobUtil.arrayBufferToBlob(buff))
//           .do(blob => {
//             const link = document.createElement('a');
//             link.target = '_blank';
//             link.download = file.name;
//             link.href = blobUtil.createObjectURL(blob);
//             link.click();
//           })
//         )
//         .catch(err => debug(err));
//     });

//   constructor (
//     private actions$: Actions,
//     private downloaderService: DownloaderService,
//     private filesService: FilesService,
//     private downloaderActions: DownloaderActions,
//     private store: Store<AppState>
//   ) {

//   }
// }

// One effect to get the key when save, or when decrypting?
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
          link.click();
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
