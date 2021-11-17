import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { TokenService } from '../token.service';
import { MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error = false;
  credentials = {username: '', password: ''};
  seePassword = false;

  constructor(
    private app: AppService,
    private http: HttpClient,
    private router: Router,
    private token: TokenService) 
    {

  }

  login() {
    this.app.login(this.credentials).subscribe(data => {
      this.token.saveToken(data.accessToken);
      this.token.saveUser(data);
      this.router.navigateByUrl('/app/home')
    },
    err =>{
      this.error = true;
    })
  }

  toggleSeePw(){
    this.seePassword = !this.seePassword;
  }
}
