import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http : HttpClient) { }

  getFile() {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'image/jpeg',
      })
    };
    return this.http.get('http://localhost:3000/item', httpOptions );
  }

}
