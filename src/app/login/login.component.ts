import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/RegistrationService';
import { ProviderService } from '../components/account/provider.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router,private login:RegistrationService,private provide:ProviderService){}
errors:string[]=[];
form_login:FormGroup=new FormGroup(
  {
    login:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    role:new FormControl('',Validators.required)
  }
);
redirect(){
  const form_value=this.form_login.getRawValue();
  console.log(form_value.role,form_value.password,form_value.role);
  this.router.navigate(["/register"])
}
async Loginn(){
  this.errors=[];
 
  const form_value=this.form_login.getRawValue();
  console.log(form_value.login,form_value.password,form_value.role);
const result=await this.login.Login(form_value.login,form_value.password,form_value.role);
const data=await result.json();
this.errors.push(data.messages.Errors);

localStorage.setItem('username',form_value.login);


console.log(data);
if(data.success){
  this.login.isAuth=true;
  this.login.SetRole(form_value.role);
  this.router.navigate(["/system"])
this.provide.artist_name=form_value.login;
  console.log(form_value.login);
}
const rights=await this.login.check_Rights(form_value.login)
console.log(rights);
}
}
