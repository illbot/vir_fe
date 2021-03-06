import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kepbongeszo';

  constructor(private app: AppService, private http: HttpClient, private router: Router){
    this.app.login(undefined)
  }

  logout(){
    this.http.post('logout', {}).pipe(
    finalize(()=>{
      this.app.authenticated = false;
      this.router.navigateByUrl('/login')
    })).subscribe();
  }
}
