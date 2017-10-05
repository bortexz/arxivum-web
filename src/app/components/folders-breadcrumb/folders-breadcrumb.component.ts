import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ax-folders-breadcrumb',
  templateUrl: './folders-breadcrumb.component.html',
  styleUrls: ['./folders-breadcrumb.component.scss']
})
export class FoldersBreadcrumbComponent implements OnInit {
  @Input('path') path: Observable<Array<any>>;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  navigateTo (folder) {
    const args: any[] = ['/files/list'];
    if (folder._id) args.push({ id: folder._id});
    this.router.navigate(args);
  }
}
