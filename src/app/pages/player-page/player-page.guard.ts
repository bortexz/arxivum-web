import { PlayerState } from '../../core/player/player.reducer';
import { AppState } from '../../app.reducers';
import { AuthenticationState } from '../../core/authentication/authentication.reducer';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

/**
 * The logic is the following: If we ARE authenticated, then go to /home
 */
@Injectable()
export class PlayerPageGuard implements CanActivate {
  player: PlayerState;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.select(state => state.player)
      .subscribe(player => this.player = player);
  }

  canActivate() {
    if (!this.player) {
      this.router.navigate(['/files/list']);
      return false;
    }
    return true;
  }
}
