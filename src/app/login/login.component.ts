import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router){}

form_login:FormGroup=new FormGroup(
  {
    login:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  }
);
redirect(){
  this.router.navigate(["/account/register"])
}
}
