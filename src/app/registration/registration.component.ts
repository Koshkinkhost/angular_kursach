import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from './RegistrationService';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  errors: { [key: string]: string[] } = {};
  constructor(private router:Router,private registr:RegistrationService){
    
  }
  form_registr:FormGroup=new FormGroup(
    {
      login:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      password_confirm:new FormControl('',Validators.required),
    }
  )
  redirect(){
    this.router.navigate(["/login"])
  }
  async Registration(){
   
    console.log("я в  методе");
    const form_value=this.form_registr.getRawValue();
    const result=await this.registr.Registration(form_value.login,form_value.password,form_value.password_confirm);

    if(result.success){
      this.router.navigate(["/login"])
    }
    this.errors={};
    this.errors['login'] = result.messages.Login;
    this.errors['password'] = result.messages.Password;
    this.errors['confirmPassword'] = result.messages.ConfirmPassword;
    


  
  }
}
