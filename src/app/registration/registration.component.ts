import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private router:Router){
    
  }
  form_registr:FormGroup=new FormGroup(
    {
      login:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      password_confirm:new FormControl('',Validators.required),
    }
  )
  redirect(){
    this.router.navigate(["/account/login"])
  }
}
