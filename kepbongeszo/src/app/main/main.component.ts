import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AppService } from '../app.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  user;

  constructor(private app: AppService,
     private http: HttpClient,
      private router: Router,
      private tokenService: TokenService)
  {
    this.user = tokenService.getUser();
  }

  isLoggedIn(){
    return this.tokenService.isLoggedIn();
  }

  logout(){
    console.log("logout")
    this.tokenService.signOut();
    this.router.navigateByUrl('/login');
  }

}
