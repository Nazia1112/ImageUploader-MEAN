import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {HttpClient, HttpResponse, HttpEventType, HttpEvent} from "@angular/common/http";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],

})
export class FileUploadComponent implements OnInit {

  uploadForm: FormGroup;
  public filePreviewPath: SafeUrl;
  ppath: SafeUrl[] = [];
  public uploadPercentage = 0;



  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
    //url: 'http://localhost:3000/item',
    itemAlias: 'file'
  });

  title: string = ' File Uploader';
  constructor(private fb: FormBuilder, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
      this.ppath.push(this.filePreviewPath);
};
   }

  uploadSubmit() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 3000000) {
        alert("Each File should be less than 3 MB of size.");
        return;
      }
    }
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      console.log(fileItem.name);
      data.append('file', fileItem);
      data.append('fileSeq', 'seq' + j);
      data.append('dataType', this.uploadForm.controls.type.value);
      this.uploadFile(data).subscribe(event => {
        console.log(event);
        if (event.type == HttpEventType.UploadProgress) {
        console.log('uplaod progress');
        const percentage = Math.round(100 * event.loaded / event.total);
        this.uploadPercentage = percentage;
        console.log(percentage);
        console.log(`file is ${percentage}% uploaded`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded');
          setTimeout(() => {
            this.uploadPercentage = 0;
          }, 1000);
        }
});
      //this.uploadFile(data).subscribe(data => document.getElementById("demo").innerHTML = "Uploaded Successfully"));
    }
    this.uploader.clearQueue();
    this.ppath.splice(0, this.ppath.length);
    
  }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post('http://localhost:3000/item', data, {
      reportProgress: true, observe: 'events'});

  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type: [null, Validators.compose([Validators.required])]
    });
  }

  removeIndex(index: number) {
    console.log(index);
    console.log(this.ppath[index]);
    delete this.ppath[index];
}

}
