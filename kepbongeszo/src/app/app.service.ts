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
    return this.http.post(environment.HOST+environment.AUTH_SIGNIN, credentials, httpOptions);
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(environment.HOST+environment.AUTH_SIGNUP, data, httpOptions);
  }

  uploadImg(img: File, fileName:string, fileExtension:string):any{
    let formData = new FormData();
    formData.append('file',img, fileName+'.'+fileExtension);

    return this.http.post(environment.HOST+environment.PIC_UPLOAD, formData);
  }

  uploadImageData(uploadDetails:any, fileData:FileData):any{
    let payload = {
      uploader: uploadDetails.uploader,
      visibility_list: uploadDetails.role,
      description: uploadDetails.description,
      type: fileData.type,
      name: fileData.name,
      displayName: uploadDetails.displayName
    };

    return this.http.post(environment.HOST+environment.PIC_UPLOAD_DATA, payload, httpOptions);
  }

  getPictures(){
    return this.http.get(environment.HOST+environment.GET_FILE);
  }

  getAllPictureData():any{
    return this.http.get(environment.HOST+environment.GET_ALL_PICTURE);
  }

  changePictureVisibility(id:number, visibility:boolean){
    let body = {
      userVisibility: visibility,
      pictureId: id
    }
    return this.http.post(environment.HOST+environment.CHANGE_VISIBILITY,body);
  }

  delete(id: any) {
    return this.http.delete(environment.HOST+environment.DELETE_PICTURE + id);
  }
}
