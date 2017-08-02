import { Observable } from 'rxjs/Rx';
import { CurrentFolderState } from '../../core/folders/folders.reducer';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { IFolderTreeNode } from '../../core/folders/folders.interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ax-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {
  @Input('node') node: IFolderTreeNode;

  currentFolder$: Observable<CurrentFolderState>;

  constructor (
    private store: Store<AppState>
  ) {}

  ngOnInit () {
    this.currentFolder$ = this.store.select(state => state.currentFolder);
  }
}
