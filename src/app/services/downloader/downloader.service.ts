import { IDownloadingFile } from '../file-downloader/file-downloader.service';
import { IFile } from '../files/files.interfaces';
import { Injectable, NgZone } from '@angular/core';
import * as WTClient from 'webtorrent';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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

  downloadingFiles: any = {};

  // Convenience getter to iterate in ngFor
  // Wait for object.values in Typescript
  get downloadingFilesArray () {
    return values(this.downloadingFiles);
  }

  download (file): Promise<any> {
    return new Promise((resolve, reject) => {

      this.client.add(Buffer.from(file.torrent.data), (torrent) => {
        // this.zone.run(() => {
          const downloadingFile: IDownloadingFile = {
            _id: file._id,
            name: file.name,
            torrent,
            torrent_info: file.torrent,
            // progress: interval.map(() => {
            //   return torrent.progress;
            // }),
            // download_speed: interval.map(() => {
            //   return torrent.downloadSpeed;
            // })
            progress: 0,
            download_speed: 0
          };

          // this.downloadingFiles[file._id] = downloadingFile;


          resolve(downloadingFile);
        });
      // });

    })
  }


  // get totalProgress () {
  //   let total = Object.keys(this.downloadingFiles).reduce((acc, key) => {
  //     return acc +  (this.downloadingFiles[key].progress * 100);
  //   }, 0);

  //   total /= Object.keys(this.downloadingFiles).length;
  //   return total;
  // }

  constructor(public zone: NgZone) {}

  // download (file: IFile) {
  //   if (!file.torrent ||
  //      (this.downloadingFiles[file._id] && this.downloadingFiles[file._id].torrent)) {
  //     return;
  //   }

  //   this.client.add(Buffer.from(file.torrent.data), (torrent) => {
  //     this.zone.run(() => {
  //       const interval = Observable.interval(500);
  //       const downloadingFile: IDownloadingFile = {
  //         id: file._id,
  //         name: file.name,
  //         torrent,
  //         torrent_info: file.torrent,
  //         progress: interval.map(() => {
  //           return torrent.progress;
  //         }),
  //         download_speed: interval.map(() => {
  //           return torrent.downloadSpeed;
  //         })
  //       };

  //       this.downloadingFiles[file._id] = downloadingFile;
  //     });
  //   });
  // }

  // remove (file: IDownloadingFile) {
  //   file.torrent.destroy(() => {
  //     this.zone.run(() => {
  //       delete this.downloadingFiles[file.id];
  //     });
  //   });
  // }

  // pause (file: IDownloadingFile) {
  //   file.torrent.destroy(() => {
  //     this.zone.run(() => {
  //       delete this.downloadingFiles[file.id].torrent;
  //     });
  //   });
  // }

  // // Bit of duplication here with download, see how to abstract
  // resume (file: IDownloadingFile) {
  //   this.client.add(Buffer.from(file.torrent_info.data), (torrent) => {
  //     this.zone.run(() => {
  //       const interval = Observable.interval(500);
  //       file.torrent = torrent;
  //       file.progress =  interval.map(() => {
  //         return torrent.progress;
  //       });
  //       file.download_speed =  interval.map(() => {
  //         return torrent.downloadSpeed;
  //       });
  //     });
  //   });
  // }
}
