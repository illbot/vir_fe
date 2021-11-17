import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error = false;
  credentials = {username: '', password: ''};

  constructor(
    private app: AppService,
    private http: HttpClient,
    private router: Router,
    private token: TokenService) 
    {

  }

  login() {
    this.app.login(this.credentials).subscribe(data => {
      console.log(data);
      this.token.saveToken(data.accessToken);
      this.token.saveUser(data);
      console.log(this.token.getToken());
      this.router.navigateByUrl('/app/home')
      return false;
    })
  }
}
