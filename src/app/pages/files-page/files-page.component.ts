import { BehaviorSubject } from 'rxjs/Rx';
import { FilesPageService } from './files-page.service';
import { FilesService } from '../../core/files/files.service';
import { DECRYPT_ALGO } from '../../utils/crypto';
import { DatagridActionBar } from 'clarity-angular';
// import { PlayerActions } from '../../core/player/player.actions';
// import { ModalsActions } from '../../core/modals/modals.actions';
// import { NameFormModalComponent } from '../../components/modals/name-form-modal/name-form-modal.component';
// import { FolderTreeActions } from '../../core/folders/tree/tree.actions';
import { AppState } from '../../app.reducers';
// import { DownloaderActions } from '../../core/downloader/downloader.actions';
// import { IDownloadingFile } from '../../core/downloader/downloader.reducer';
// import { DownloaderService } from '../../core/downloader/downloader.service';
import * as FoldersActions from '../../core/folders/folders.actions';
// import { UploaderActions } from '../../core/uploader/uploader.actions';
// import { UploaderService } from '../../core/uploader/uploader.service';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';


const renderMedia = require('render-media');
const PartialDecryptStream = require('cbc-partial-decrypt');

@Component({
  selector: 'ax-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesPageComponent implements OnInit, AfterViewInit {

  private currentFolder$ = this.filesPageService.currentFolder$;
  private authenticated$ = this.filesPageService.authenticated$;
  // private downloadData$ = this.store.select(state => state.downloadData);
  // private nameFormModal$ = this.store.select(state => state.modals.nameForm);
  // private player$ = this.store.select(state => state.player);

  private hasBaseDropZoneOver = false;

  private selected = null;

  // @ViewChild('renderMedia') renderMedia;
  // @ViewChild('renderMediaTest') renderMediaTest;

  @ViewChild('sidenav') sidenav;

  /**
   * Styling properties.
   * @todo : Look for a pure CSS solution, if possible.
   * Keeps the size of the breadcrumb in sync with sidenav width
   */
  @ViewChild('subnavRightButtons') subnavRightButtons;

  // Values being pushed through events in html.
  sidenavWidth$: BehaviorSubject<number>;

  breadcrumbSize$: Observable<number>;
  /**
   * End styling properties
   */

  downloadsBadge$ = this.filesPageService.downloadingList$.map(state => state.files.length)
  uploadsBadge$ = this.filesPageService.uploadingList$.map(state => state.files.length)

  downloadsBadgeColor$ = this.filesPageService.downloadingList$
    .map(downloading => {
      return ((downloading.progress === 100) || (downloading.progress === 0)) &&
        downloading.files.length > 0 ?
        'badge-success' :
        'badge-orange';
    })
  uploadsBadgeColor$ = this.filesPageService.uploadingList$
    .map(uploading => uploading.progress)
    .map(progress => progress === 100 ? 'badge-success' : 'badge-orange');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // public uploaderService: UploaderService,
    // public downloaderService: DownloaderService,
    private store: Store<AppState>,
    // private filesApi: FilesService,
    private filesPageService: FilesPageService
  ) { };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filesPageService.goToFolder(params['id']);
    });

    // this.player$
    //   .map(player => player.file)
    //   .filter(Boolean)
    //   .subscribe((file: IDownloadingFile) => {
    //     const renderFile = {
    //       name: file.name,
    //       createReadStream (opts) {
    //         if (!opts) opts = {}
    //         const decryptOpts = {
    //           start: opts.start || 0,
    //           end: opts.end, // (or end of file when known)
    //           encrypted: options => file.torrent_file.createReadStream(options),
    //           password: (window as any).TEST_KEY,
    //           mode: 'aes-256-cbc',
    //           keyLength: 256
    //         };

    //         return new PartialDecryptStream(decryptOpts);

    //         // console.log(opts);
    //         // const Duplex = require('readable-stream').PassThrough;
    //         // const s = new Duplex();
    //         // Duplex.prototype.destroy = function () {
    //         //   // this._destroy();
    //         // };
    //         // const crypto = require('crypto-browserify');
    //         // const decipher = crypto.createDecipher(DECRYPT_ALGO, (window as any).TEST_KEY);
    //         // const stream = file.torrent_file.createReadStream(opts);
    //         // // s._read = function (data) {
    //         // //   console.log('s_read called', data);
    //         // // };
    //         // // s._write = function (data) {
    //         // //   console.log('s_write called', data);
    //         // // };
    //         // const stream2 = stream.pipe(decipher).pipe(s);

    //         // stream2.on('data', (data) => {
    //         //   console.log(data);
    //         // });

    //         // return stream2;
    //         // // return stream.pipe(decipher).pipe(s);
    //         // // console.log(opts);
    //         // // console.log(file.read_stream);
    //         // // return file.read_stream.pipe(s);
    //         // // return s;
    //         // // return file.read_stream;
    //       },
    //       // createReadStream: function (opts) {
    //       //   if (!opts) opts = {}
    //       //   return from([ img.slice(opts.start || 0, opts.end || (img.length - 1)) ])
    //       // }
    //     };

    //     renderMedia.append(renderFile, this.renderMedia.nativeElement, {autoplay: true}, function (err, elem) {
    //       if (err) return console.error(err.message);

    //       console.log(elem); // this is the newly created element with the media in it
    //     });
    //   });
  }

  /** TESTING of the streaming */
  // testOnDrop() {
  //   console.log(this.uploaderService.uploader);
  //   const reader = new FileReader();
  //   reader.readAsArrayBuffer(this.uploaderService.uploader.queue[0]._file);

  //   reader.onload = (evt) => {
  //     const webtorrent = require('webtorrent');
  //     const client = new webtorrent();
  //     client.add(new Buffer((<any>evt.target).result), torrent => {
  //       setInterval(() => console.log(torrent.progress * 100), 1000);

  //       const file = torrent.files.find((file) => {
  //         return file.name.endsWith('.mp4');
  //       });

  //       file.appendTo('#testplayer', (err, elem) => {
  //         if (err) throw err; // file failed to download or display in the DOM
  //         console.log('New DOM node with the content', elem);
  //       });

  //       // const renderFile = {
  //       //   name: 'random.mp4',
  //       //   createReadStream (opts) {
  //       //     return torrent.files[0].createReadStream();
  //       //     // return (<any>evt.target).result;
  //       //   },
  //       // };

  //       // renderMedia.append(renderFile, this.renderMediaTest.nativeElement, function (err, elem) {
  //       //   if (err) return console.error(err.message);

  //       //   console.log(elem); // this is the newly created element with the media in it
  //       // });
  //     });
  //   };
  // }

  // test () {
  //   // const magnetURI = "magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4";
  //   const webtorrent = require('webtorrent');
  //   const client = new webtorrent();
  //   client.add(magnetURI, torrent => {
  //     console.log(torrent.files);
  //   });
  // }

  ngAfterViewInit() {
    // this.sidenavWidth$.next(this.sidenav.nativeElement.offsetWidth);
    // this.sidenavWidth$ = new BehaviorSubject(this.sidenav.nativeElement.offsetWidth);

    // this.breadcrumbSize$ = this.sidenavWidth$.map(px => {
    //   let size = window.innerWidth - px;
    //   if (this.subnavRightButtons) {
    //     size -= this.subnavRightButtons.nativeElement.offsetWidth;
    //   }
    //   return size;
    // });
  }

  /**
   * File & Folders operations: create, edit, delete, download,...
   */

  public select (item, $event) {
    // this.selected = item;
    // if ($event) {
    //   $event.stopPropagation();
    // }
  }

  public fileOverDragArea (e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
