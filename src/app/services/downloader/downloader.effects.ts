import { Action } from '@ngrx/store';
import { ExtractionResult } from '@angular/compiler/src/i18n/extractor_merger';
import { Observable } from 'rxjs/Observable';
import { DownloaderActions } from './downloader.actions';
import { DownloaderService } from './downloader.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class DownloaderEffects {

  // @Effect()
  // downloadFile$ = this.actions$
  //   .ofType(DownloaderActions.DOWNLOAD_FILE)
  //   .map(action => action.payload.file)
  //   .switchMap((file) => {
  //     return Observable
  //       .fromPromise(this.downloaderService.download(file));
  //   })
  //   .map() // Fire add file Action. Move next line to the other Action.
  //   .map(downloadingFile => {
  //     return Observable
  //       .interval(500)
  //       .map(() => ({
  //         _id: downloadingFile.id,
  //         progress: downloadingFile.torrent.progress,
  //         download_speed: downloadingFile.torrent.downloadSpeed
  //       }))
  //       .map(({ _id, progress, download_speed }) =>
  //         this.downloaderActions.downloadFileProgressItem(_id, progress, download_speed));
  //   });

  @Effect()
  downloadFileAdded$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_ADDED)



  constructor (
    private actions$: Actions,
    private downloaderService: DownloaderService,
    private downloaderActions: DownloaderActions
  ) {

  }
}
