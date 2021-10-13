import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tree } from './tree/tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'treeview';
  constructor(private http: HttpClient) {}
  data: Array<Tree> = new Array<Tree>();
  ngOnInit() {
    this.GetData().subscribe((x: any) => {
      for (var i in x) {
        this.data.push(x[i]);
      }
    });
  }
  GetData() {
    return this.http.get('../assets/jsonfile/example.json', {});
  }
}
