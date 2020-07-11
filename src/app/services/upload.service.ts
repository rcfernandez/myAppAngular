import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient
  ) {   }


  //  uploadImage(data) {
  //   return this.http.post(environment.urlApi +'/upload', data);
  //}

}
