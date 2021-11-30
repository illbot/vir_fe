import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

export interface RegisterData {
  username:string,
  email:string,
  password:string
}

export interface PictureData{
  picture:string,
  uploader: string
}

export interface FileData{
  url: any,
  name: string,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  authenticated:boolean = false;

  constructor(private http: HttpClient) { }

  login(credentials:any):Observable<any> {
    return this.http.post(environment.AUTH_SIGNIN, credentials, httpOptions);
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(environment.AUTH_SIGNUP, data, httpOptions);
  }

  uploadImage(uploadDetails:any, fileData:FileData){
    let payload = {
      uploader: uploadDetails.uploader,
      visibility_list: uploadDetails.role,
      description: uploadDetails.description,
      dataURL: fileData.url,
      type: fileData.type,
      name: fileData.name
    };
    return this.http.post(environment.PIC_UPLOAD, payload, httpOptions);
  }

  getPictures(){
    return [
        {
          picture: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          uploader:"user2",
          title: "Cica1"
        },
        {
          picture: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=840&q=80",
          uploader:"userreg",
          title: "Cica2"
        },
        {
          picture: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1584&q=80",
          uploader:"user1337",
          title: "Cica3"
        }
      ];
  }
}
