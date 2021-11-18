import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface RegisterData{
  username:string,
  email:string,
  password:string
}

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


  constructor(private formBuilder: FormBuilder) { }

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

  register(){
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
    console.log(registerData);
  } 

  getRegisterData():RegisterData{
    let data: RegisterData;
    data = {
      username: this.form.get('username')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
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
