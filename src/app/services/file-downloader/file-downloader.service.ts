import { Injectable, NgZone } from '@angular/core';
import * as WTClient from 'webtorrent';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const urljoin = require('url-join');

@Injectable()
export class FileDownloaderService {
  client = new WTClient({
    dht: false,
    tracker: {
      announce: [urljoin(environment.tracker_url, 'announce')]
    }
  });

  downloadingFiles: any = {};

  // Convenience getter to iterate in ngFor
  // Wait for object.values in Typescript, no map required
  get downloadingFilesArray () {
    return Object.keys(this.downloadingFiles).map(key => this.downloadingFiles[key]);
  }

  get totalProgress () {
    let total = Object.keys(this.downloadingFiles).reduce((acc, key) => {
      return acc +  (this.downloadingFiles[key].progress * 100);
    }, 0);

    total /= Object.keys(this.downloadingFiles).length;
    return total;
  }

  constructor(public zone: NgZone) {}

  download (file) {
    if (!file.torrent) return;
    if (file.downloading) return; // Already downloading

    this.client.add(Buffer.from(file.torrent.data), (torrent) => {
      this.zone.run(() => {
        const interval = Observable.interval(500);
        const downloadingFile = {
          _id: file._id,
          name: file.name,
          torrent,
          progress: interval.map(() => {
            return torrent.progress;
          }),
          download_speed: interval.map(() => {
            return torrent.downloadSpeed;
          })
        };

        this.downloadingFiles[file._id] = downloadingFile;
      });
    });
  }

  remove (file) {
    file.torrent.destroy(() => {
      this.zone.run(() => {
        delete this.downloadingFiles[file._id];
      });
    });
  }
}
