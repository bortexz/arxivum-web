import { Component, OnInit, NgZone } from '@angular/core';
import * as parseTorrent from 'parse-torrent';
// import * as wtClient from 'webtorrent';
const wtClient = require('webtorrent');

@Component({
  selector: 'ax-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  private zone: NgZone;
  private basicOptions: Object;
  private progress: number = 0;
  // private response: any = {};

  constructor() { }

  ngOnInit() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.basicOptions = {
      url: 'http://localhost:3000/api/files'
    };
  }

  handleUpload(data: any): void {
    this.zone.run(() => {
      this.progress = data.progress.percent / 100;
      if (data.done) {
        let torrentBuffer = JSON.parse(data.response)[0].torrent.data;
        torrentBuffer = Buffer.from(torrentBuffer);

        // download using webtorrent
        const client = new wtClient();

        client.on('error', function (err) { console.log('an error ocurredd', err); });
        console.log(parseTorrent(torrentBuffer));
        client.add(torrentBuffer, function (torrent) {
          // Got torrent metadata!
          console.log('Client is downloading:', torrent.infoHash);

          torrent.on('noPeers', () => console.log('no peers'));
          torrent.on('done', () => console.log('done'));

        });

      }
    });
  }

}
