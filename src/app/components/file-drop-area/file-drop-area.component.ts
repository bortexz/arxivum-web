import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'ax-file-drop-area',
  templateUrl: './file-drop-area.component.html',
  styleUrls: ['./file-drop-area.component.scss']
})
export class FileDropAreaComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  ngOnInit() {}

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
