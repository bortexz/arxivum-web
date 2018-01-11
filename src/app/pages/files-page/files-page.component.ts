import { BehaviorSubject } from 'rxjs/Rx';
import { FilesPageService } from './files-page.service';
import { FilesService } from '../../core/files/files.service';
import { DECRYPT_ALGO } from '../../utils/crypto';
import { DatagridActionBar } from 'clarity-angular';
import { AppState } from '../../app.reducers';
import * as FoldersActions from '../../core/folders/folders.actions';

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
  }

  ngAfterViewInit() {

  }

  public fileOverDragArea (e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
