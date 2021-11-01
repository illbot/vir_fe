import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { AppService } from './app.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent}
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
