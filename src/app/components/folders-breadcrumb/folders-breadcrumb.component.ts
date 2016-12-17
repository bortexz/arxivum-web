import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ax-folders-breadcrumb',
  templateUrl: './folders-breadcrumb.component.html',
  styleUrls: ['./folders-breadcrumb.component.scss']
})
export class FoldersBreadcrumbComponent implements OnInit {
  @Input('path') path: Observable<Array<any>>;

  constructor() { }

  ngOnInit() {}

}
