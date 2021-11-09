import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private app: AppService, private http: HttpClient, private router: Router){
    
  }


  logout(){
    this.http.post('logout', {}).pipe(
    finalize(()=>{
      this.app.authenticated = false;
      this.router.navigateByUrl('/login')
    })).subscribe();
  }

}
