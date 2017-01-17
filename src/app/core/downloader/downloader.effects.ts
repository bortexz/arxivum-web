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

  downloadItemComplete$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_COMPLETED);

  @Effect()
  downloadFile$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE)
    .map(action => action.payload.file)
    .switchMap((file) => {
      return Observable
        .fromPromise(this.downloaderService.download(file));
    })
    .map((file) => this.downloaderActions.downloadFileAdded(file));

  @Effect()
  totalProgress$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM)
    .sample(Observable.interval(100))
    .map(() => Math.round(this.downloaderService.client['progress'] * 100))
    .map(totalProgress =>
      this.downloaderActions.downloadFileProgressAll(totalProgress));

  @Effect({ dispatch: false })
  onItemRemoved$ = this.actions$
    .ofType(DownloaderActions.REMOVE_ITEM)
    .do((action) => {
      this.downloaderService.remove(action.payload.file);
    });

  constructor (
    private actions$: Actions,
    private downloaderService: DownloaderService,
    private downloaderActions: DownloaderActions,
    private store: Store<AppState>
  ) {

  }
}
