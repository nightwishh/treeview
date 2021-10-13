import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  constructor() {}
  @Input() data: Array<Tree> = new Array<Tree>();
  @Input() isChild: boolean = false;
  ngOnInit(): void {}
  expandCollapse(elem: any) {
    var element = elem as HTMLElement;

    var children = element.getElementsByClassName('children');
    if (children.length > 0) {
      element.classList.toggle('expanded');
      children[0].classList.toggle('show');
    }
  }
  getIcon(elem: any) {
    var element = elem as HTMLElement;
    return element.classList.contains('expanded') ? 'horizontal_rule' : 'add';
  }
}
export interface Tree {
  id: number;
  name: string;
  child: [];
}
