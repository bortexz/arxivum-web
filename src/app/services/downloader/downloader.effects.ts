import { AppState } from '../../app.reducers';
import { Action, Store } from '@ngrx/store';
import { ExtractionResult } from '@angular/compiler/src/i18n/extractor_merger';
import { Observable } from 'rxjs/Observable';
import { DownloaderActions } from './downloader.actions';
import { DownloaderService } from './downloader.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class DownloaderEffects {

  @Effect()
  downloadFile$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE)
    .map(action => action.payload.file)
    .switchMap((file) => {
      return Observable
        .fromPromise(this.downloaderService.download(file));
    })
    .map(this.downloaderActions.downloadFileAdded) // Fire add file Action. Move next line to the other Action.


  @Effect({ dispatch: false })
  downloadFileAdded$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_ADDED)
    .map(action => action.payload.file)
    .flatMap(downloadingFile => {
      return Observable
        .interval(500)
        .map(() => ({
          _id: downloadingFile._id,
          progress: downloadingFile.torrent.progress,
          download_speed: downloadingFile.torrent.downloadSpeed
        }))
        .takeWhile(({progress}) => progress < 100)
        .map(({ _id, progress, download_speed }) => {
          this.store.dispatch(
            this.downloaderActions.downloadFileProgressItem(_id, progress, download_speed)
          );
          return { _id, progress, download_speed };
        });
    })
    .last()
    .map(({_id}) => this.downloaderActions.downloadFileCompleted(_id));

  constructor (
    private actions$: Actions,
    private downloaderService: DownloaderService,
    private downloaderActions: DownloaderActions,
    private store: Store<AppState>
  ) {

  }
}
