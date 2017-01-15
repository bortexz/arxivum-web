import { Observable } from 'rxjs/Rx';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { FileDownloaderService } from '../../services/file-downloader/file-downloader.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UploaderService } from '../../services/uploader/uploader.service';

@Component({
  selector: 'ax-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {
  shown: string = null;
  uploaderBadge: any;
  downloaderBadge: any;

  uploading$ = this.store.select(state => state.uploading);
  downloading$ = Observable.of(42);

  shouldDisplay$ = Observable
    .combineLatest(this.uploading$, this.downloading$)
    .map(([uploading, downloading]) => {
      if (uploading && uploading.files.length > 0) return true;
      return false;
    });

  uploaderBadge$ = this.uploading$
    .map(uploading => uploading.progress)
    .map(progress => progress === 100 ? 'badge-success' : 'badge-orange');

  constructor(
    private changeDetector: ChangeDetectorRef,
    private store: Store<AppState>,
    public fileDownloaderService: FileDownloaderService
  ) {

  }

  ngOnInit() {
    this.reloadBadgeClass();

    this.uploading$.subscribe(() => this.changeDetector.detectChanges());
  }

  toggle(panel) {
    if (!this.shown) return this.shown = panel;

    if (this.shown === panel) {
      return this.shown = null;
    } else return this.shown = panel;
  }

  reloadBadgeClass () {
    // this.uploaderBadge = {
    //   'badge-orange': this.fileUploaderService.uploader.progress < 100,
    //   'badge-success': this.fileUploaderService.uploader.progress === 100
    // };

    // this.downloaderBadge = {
    //   'badge-orange': this.fileDownloaderService.totalProgress < 100,
    //   'badge-success': this.fileDownloaderService.totalProgress >= 100
    // };
  }
}
