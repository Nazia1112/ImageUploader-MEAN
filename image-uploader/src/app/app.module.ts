import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FileSelectDirective, FileDropDirective} from "ng2-file-upload/ng2-file-upload";
import {HttpClientModule} from "@angular/common/http";
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatOptionModule, MatIconModule, MatButtonModule } from '@angular/material';
//import {CustomMaterialModule} from "./file-upload/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    FileSelectDirective,
    FileDropDirective,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatOptionModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    UploaderModule,
    MatIconModule,
    MatButtonModule,
    //CustomMaterialModule,
    RouterModule.forRoot([
      {path: '', component: FileUploadComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }