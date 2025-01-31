import { Component, Input,OnInit,OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/RegistrationService';

@Component({
  selector: 'app-switch-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './switch-menu.component.html',
  styleUrl: './switch-menu.component.css'
})
export class SwitchMenuComponent {
  constructor(private router:Router,private registr:RegistrationService){}
@Input() currentComponent:string='';
async ngOnChanges(changes:SimpleChanges){
  const isAuthenticated = await this.registr.CheckAuthentication();
  console.log(isAuthenticated+" аутентификация");
  if (this.registr.isAuth) {
    if(changes['currentComponent']){
      this.navigateTo(this.currentComponent)

   
  } 
 

  }
  else{
    this.router.navigate(['account/login'])
  }

}
navigateTo(currentComponent:string) {
  switch (currentComponent) {
    case 'login':
      console.log("логин")
      this.router.navigate(['/login']);
     
      break;
    case 'register':
      this.router.navigate(['/register']);
      console.log("регистрация")
      break;
    case 'tracks':
        this.router.navigate(['/tracks']);
        console.log("трэки")
      break;
    case 'analytics':
        this.router.navigate(['/analytics']);
      break;
    case 'promocodes':
        this.router.navigate(['/promocodes']);
      break;
    default:
      break;
  }
}
}
