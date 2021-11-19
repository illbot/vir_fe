import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService, RegisterData } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  seePassword = false;
  submitted = false;
  errPasswordMsg ='';
  form!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private service: AppService,
    private snackbar: MatSnackBar,
    private routing: Router
    ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username : ['', 
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      email:['',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(7),
          Validators.maxLength(30)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required
        ]
      ]
    })
  }

  get f(): {[key:string]: AbstractControl}{
    return this.form.controls
  }

  async register(){
    this.submitted = true;
    this.errPasswordMsg = "";
    if(this.form.invalid){
      console.log("invalid");
      this.submitted = false;
      return;
    }
    if(this.form.get('password')?.value !== this.form.get('confirmPassword')?.value){
      console.log("pw doesnt't match");
      this.errPasswordMsg = "'Password' and 'Confirm password' doesn't match!"
      return;
    }

    let registerData = this.getRegisterData();

    const result = await this.service.register(registerData).toPromise();
    console.log(result);
    this.snackbar.open(result.message, "Close").onAction().subscribe(()=>{
      this.routing.navigateByUrl('/login')
    });
  } 

  getRegisterData():RegisterData{
    let data: RegisterData;
    data = {
      username: this.form.get('username')?.value.trim(),
      email: this.form.get('email')?.value.trim(),
      password: this.form.get('password')?.value.trim()
    }
    return data;
  }

  getUsernameErrorMsg(){
    if(this.form.get('username')?.hasError('required')){
      return "Username is required";
    }
    return this.form.get('username')?.hasError('minLength') ?  "" : "Username is short";
  }

  getEmailErrorMsg(){
    if(this.form.get('email')?.hasError('email')){
      return "Wrong format";
    }
    if(this.form.get('email')?.hasError('required')){
      return "Email is required";
    }
    if(!this.form.get('email')?.hasError('minLength')){
      return "Email is too short";
    }
    return this.form.get('email')?.hasError('maxLength') ? "Email is too long": "" ;
  }

  getPasswordErrorMsg(){
    if(this.form.get('password')?.hasError('required')){
      return "Password is required";
    }
    return this.form.get('password')?.hasError('minLength') ?  "" : "Password is short";
  }

  toggleSeePw(){
    this.seePassword = !this.seePassword;
  }
}
