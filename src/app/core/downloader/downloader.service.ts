import { DownloaderActions } from './downloader.actions';
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

  totalProgress$: Observable<number>;

  constructor(
    public zone: NgZone,
    private store: Store<AppState>,
    private downloaderActions: DownloaderActions
  ) {
  }

  download (file): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.add(Buffer.from(file.torrent.data), (torrent) => {
        const downloadingFile: IDownloadingFile = {
          _id: file._id,
          name: file.name,
          torrent,
          torrent_info: file.torrent,
          progress: 0,
          download_speed: 0
        };

        torrent.on('done', () => {
          this.store.dispatch(
            this.downloaderActions.downloadFileCompleted(file._id)
          );
        });

        torrent.on('download', () => {
          this.store.dispatch(
            this.downloaderActions.downloadFileProgressItem(
              file._id,
              Math.round(torrent.progress * 100),
              torrent.downloadSpeed
            )
          );
        });

        resolve(downloadingFile);
      });
    });
  }

  remove (file: IDownloadingFile) {
    file.torrent.destroy();
  }
}
