import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileUploaderService } from '../../services/file-uploader/file-uploader.service';

@Component({
  selector: 'ax-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {
  shown: Boolean = false;
  badgeClass: any;

  constructor(private fileUploaderService: FileUploaderService, private changeDetector: ChangeDetectorRef) {
    const detectChanges = function () {
      this.badgeClass = {
        'badge-orange': this.fileUploaderService.uploader.progress < 100,
        'badge-success': this.fileUploaderService.uploader.progress === 100
      };
      this.changeDetector.detectChanges();
    };

    fileUploaderService.uploader.onProgressItem = detectChanges.bind(this);
    fileUploaderService.uploader.onProgressAll = detectChanges.bind(this);
  }

  ngOnInit() {
  }

}
