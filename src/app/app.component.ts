import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  // dataObservable: Observable<any> = new Observable<any>();
  ngOnInit() {
    // this.dataObservable = this.GetData();
    // this.GetData().subscribe((x: any) => {
    //   console.log(x);
    //   for (var i in x) {
    //     this.data.push(x[i]);
    //   }
    // });
  }
  // GetData() {
  //   return this.http.get('../assets/jsonfile/example.json', {});
  // }
  fileArr: Array<any> = new Array();

  scenarios: Array<any> = new Array();
  fileChanged(e: any) {
    var files = e.target.files as Array<File>;
    for (var i = 0; i < files.length; i++) {
      this.fileArr.push(files[i]);
    }
  }
}
