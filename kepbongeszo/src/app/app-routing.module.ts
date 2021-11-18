import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { AppService } from './app.service';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'app/home'},
  { path: 'app', component: MainComponent, children:[
    { path: 'home', component: HomeComponent},
  ]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'app/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserModule
  ],
  exports: [RouterModule],
  providers: [AppService]
})
export class AppRoutingModule { }
