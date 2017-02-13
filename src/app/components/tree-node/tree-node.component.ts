import { TreeNode } from 'clarity-angular/tree-view';
import { IFolderTreeNode } from '../../core/folders/folders.interfaces';
import {
  Component, Input, OnInit, trigger, animate, state, style, transition, ContentChildren, QueryList
} from '@angular/core';

@Component({
  selector: 'ax-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  animations: [trigger("collapse", [
      state("true", style({
          "height": 0,
          "overflow-y": "hidden"
      })),
      transition("true => false", [
          animate("0.2s ease-in-out", style({
              "height": "*",
              "overflow-y": "hidden"
          }))
      ]),
      transition("false => true", [
          style({
              "height": "*",
              "overflow-y": "hidden"
          }),
          animate("0.2s ease-in-out")
      ])
  ])]
})
export class TreeNodeComponent extends TreeNode {
  @Input('node') node: IFolderTreeNode;
  @ContentChildren(TreeNodeComponent) _children: QueryList<TreeNodeComponent>;
}
