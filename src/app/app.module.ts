import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TreeComponent } from './tree/tree.component';
import { CustomTreeComponent } from './custom-tree/custom-tree.component';
@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    CustomTreeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
