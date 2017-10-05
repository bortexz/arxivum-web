import { createReadStream } from 'fs';
import { OnDestroy, ViewChild } from '@angular/core';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';
import { PlayerState } from '../../core/player/player.reducer';
import { Component, OnInit } from '@angular/core';

const PartialDecryptStream = require('cbc-partial-decrypt');
const renderMedia = require('render-media');

@Component({
  selector: 'ax-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit, OnDestroy {

  player$: Observable<PlayerState> = this.store.select(state => state.player);
  playerSub: Subscription;

  @ViewChild('playerContainer') playerContainer;

  constructor(
    public store: Store<AppState>
  ) { }

  ngOnInit () {
    this.playerSub = this.player$.subscribe(
      ({file, key, size}) => {
        const renderFile = {
          name: file.name,
          createReadStream (opts) {
            if (!opts) opts = {}
            const decryptOpts = {
              start: opts.start || 0,
              end: opts.end || size,
              encrypted: options => file.torrent_file.createReadStream(options),
              password: key,
              mode: 'aes-256-cbc',
              keyLength: 256
            }

            return new PartialDecryptStream(decryptOpts);
          }
        }

        renderMedia.append(
          renderFile,
          this.playerContainer.nativeElement,
          {autoplay: true},
          function (err, elem) {
            if (err) return console.error(err.message);
          }
        );
      }
    )
  }

  ngOnDestroy () {
    if (!this.playerSub.closed) this.playerSub.unsubscribe();
  }
}
