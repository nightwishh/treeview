import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  constructor() {}
  data: Array<Tree> = new Array<Tree>();
  rawData: Array<Tree> = new Array<Tree>();
  // @Input() dataObservable: Observable<any> = new Observable<any>();
  @Input() file: File = new File([], '', {});
  ngOnInit(): void {
    // this.dataObservable.subscribe((x) => {
    //   this.rawData = x;
    //   for (var i in x) {
    //     x[i]['elementID'] = i;
    //     this.data.push(x[i]);
    //   }
    //   console.log(this.data);
    // });
    this.readFile();
  }

  readFile() {
    let fileReader = new FileReader();
    var $rawData = [{}];
    fileReader.onload = (e) => {
      var bs = fileReader.result as string;
      var x = JSON.parse(bs);
      console.log(x);
      for (var i in x) {
        x[i]['elementID'] = i;
        this.data.push(x[i]);
      }
      console.log(this.data);
    };
    fileReader.readAsText(this.file);
  }
  parseJsonData() {}
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
    return element.classList.contains('expanded')
      ? 'keyboard_arrow_up'
      : 'keyboard_arrow_down';
  }
  findElementByID(elementID: string) {
    return [this.data.find((x) => x.elementID == elementID)];
  }
}
export interface Tree {
  id: number;
  elementID: string;
  name: string;
  child: [];
}
