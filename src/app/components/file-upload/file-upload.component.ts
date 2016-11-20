import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'ax-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  private zone: NgZone;
  private basicOptions: Object;
  private progress: number = 0;
  private response: any = {};

  constructor() { }

  ngOnInit() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.basicOptions = {
      url: 'http://localhost:3000/api/files'
    };
  }

  handleUpload(data: any): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = data.progress.percent / 100;
    });
  }

}
