import { TreeNode } from 'clarity-angular/tree-view';
import { IFolderTreeNode } from '../../core/folders/folders.interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ax-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {
  @Input('node') node: IFolderTreeNode;

  constructor () {}

  ngOnInit () {}
}
