import * as DownloaderActions from './downloader.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { IDownloadingFile } from '../downloader/downloader.reducer';
import { IFile } from '../files/files.interfaces';
import { Injectable, NgZone } from '@angular/core';
import * as WTClient from 'webtorrent';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';

const values = require('ramda/src/values');

const urljoin = require('url-join');

@Injectable()
export class DownloaderService {
  client = new WTClient({
    dht: false,
    tracker: {
      announce: [urljoin(environment.tracker_url, 'announce')]
    }
  });

  constructor(
    public zone: NgZone,
    private store: Store<AppState>
  ) {
  }

  download (file): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.add(Buffer.from(file.torrent.data), (torrent) => {
        const downloadingFile: IDownloadingFile = {
          _id: file._id,
          name: file.name,
          torrent,
          torrent_file: torrent.files[0],
          torrent_info: file.torrent
        };

        torrent.on('done', () => {
          this.zone.run(() =>
            this.store.dispatch(new DownloaderActions.FileComplete(file._id))
          )
        });

        torrent.on('download', () => {
          this.zone.run(() =>
            this.store.dispatch(
              new DownloaderActions.FileProgress(
                file._id,
                Math.round(torrent.progress * 100),
                torrent.downloadSpeed
              )
            )
          );
        });

        torrent.on('wire', function(wire, addr) {
          console.log('OnWire!!', wire, addr)
        })

        torrent.on('noPeers', function (announceType) {
          torrent.addWebSeed((torrent as any).urlList[0])
        })

        resolve(downloadingFile);
      });
    });
  }

  remove (file: IDownloadingFile) {
    file.torrent.destroy();
  }
}
