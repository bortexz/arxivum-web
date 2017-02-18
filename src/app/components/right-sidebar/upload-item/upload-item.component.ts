import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ax-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss']
})
export class UploadItemComponent implements OnInit {

  @Input('file') file;

  constructor() { }

  ngOnInit() {
  }

}
