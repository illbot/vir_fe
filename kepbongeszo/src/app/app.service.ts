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

}
