import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

interface IGreeting {
  id: Number,
  content: String
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  title = 'Demo';
  greeting : any

  constructor(private app: AppService, private http: HttpClient) {
    http.get<any>(environment.API_PATH+"resource").subscribe(data => {
      console.log(data);
      this.greeting = data['text']
    });
  }

  authenticated() { return this.app.authenticated; }


}
