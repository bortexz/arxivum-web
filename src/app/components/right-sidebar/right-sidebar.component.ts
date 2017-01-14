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

  constructor(
    public uploaderService: UploaderService,
    private changeDetector: ChangeDetectorRef,
    public fileDownloaderService: FileDownloaderService) {
    const detectChanges = function () {
      this.reloadBadgeClass();
      this.changeDetector.detectChanges();
    }.bind(this);
    // fileUploaderService.uploader.onProgressItem = detectChanges;
  }

  ngOnInit() {
    this.reloadBadgeClass();
  }

  toggle(panel) {
    if (!this.shown) return this.shown = panel;

    if (this.shown === panel) {
      return this.shown = null;
    } else return this.shown = panel;
  }

  shouldDisplay () {
    // return this.fileUploaderService.uploader.queue.length > 0
    //   || this.fileDownloaderService.downloadingFilesArray.length > 0;
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
