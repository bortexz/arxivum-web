import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { PlayerState } from './player.reducer';
import { DownloaderActions } from '../downloader/downloader.actions';
import { assign } from '../../utils/functional';
import { DECRYPT_ALGO } from '../../utils/crypto';
import { PlayerActions } from './player.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { DownloaderService } from 'app/core/downloader/downloader.service';
import { FilesService } from 'app/core/files/files.service';

const R = require('ramda');
const crypto = require('crypto-browserify');

@Injectable()
export class PlayerEffects {
  player$: Observable<PlayerState> = this.store.select(state => state.player);

  @Effect()
  playFile$ = this.actions$
    .ofType(PlayerActions.PLAY_FILE)
    .map(({ payload }) => this.downloaderActions.downloadFile(payload.file));

  @Effect()
  onFileReady$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_ADDED)
    .withLatestFrom(this.player$,
      ({ payload }, player) => player.id === payload.file._id ? payload.file : null
    )
    .filter(Boolean)
    .map(file => this.playerActions.playFileReady(file));

  constructor(
     private actions$: Actions,
     private store: Store<AppState>,
     private playerActions: PlayerActions,
     private downloaderActions: DownloaderActions
  ) { }
}
