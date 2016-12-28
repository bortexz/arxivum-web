import { Injectable } from '@angular/core';
import * as WTClient from 'webtorrent';
import { environment } from '../../../environments/environment';

const urljoin = require('url-join');

@Injectable()
export class FileDownloaderService {
  client = new WTClient({
    dht: false,
    tracker: {
      announce: [urljoin(environment.tracker_url, 'announce')]
    }
  });

  constructor() {

  }

  download (file) {
    if (file.torrent) {
      this.client.add(Buffer.from(file.torrent.data));
    }
  }

}
