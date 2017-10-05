import { Injectable } from '@angular/core';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { PlayerState } from './player.reducer';
import * as PlayerActions from './player.actions';
import * as DownloaderActions from '../downloader/downloader.actions';
import * as AuthActions from '../authentication/authentication.actions';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class PlayerEffects {
  player$: Observable<PlayerState> = this.store.select(state => state.player);

  @Effect()
  onDownloadingFileRemoved$ = this.actions$
    .ofType(DownloaderActions.REMOVE_FILE)
    .withLatestFrom(this.player$)
    .filter(([_, player]) => Boolean(player))
    .filter(([action, player]) => ((<DownloaderActions.RemoveFile>action).file._id === player.file._id))
    .map(() => new PlayerActions.ClearPlayer())

  @Effect()
  logout$ = this.actions$
    .ofType(AuthActions.LOGOUT)
    .map(() => new PlayerActions.ClearPlayer())

  constructor(
    public store: Store<AppState>,
    public actions$: Actions
  ) {}
}
