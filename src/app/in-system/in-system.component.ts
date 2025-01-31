import { Component } from '@angular/core';
import { ProviderService } from '../components/account/provider.service';
import { RegistrationService } from '../registration/RegistrationService';
import { Router,RouterModule } from '@angular/router';
@Component({
  selector: 'app-in-system',
  standalone: true,
  imports: [RouterModule],
templateUrl: './in-system.component.html',
  styleUrl: './in-system.component.css'
})
export class InSystemComponent {
  name:string=''
constructor(public provide:ProviderService,private registr:RegistrationService,private router:Router){}
async ngOnInit(){
 
  this.checkauth()
}
 async logout(){
  console.log("нажал")
  await this.registr.LogOut();
  this.checkauth();
}
async checkauth(){
  const isAuthenticated = await this.registr.CheckAuthentication();
  if (this.registr.isAuth) {
    
   const storage_name=localStorage.getItem('username');
   if(storage_name){
    this.name=storage_name;
    this.registr.artist_name=this.name;
   }
    // Вы можете также получить данные пользователя, например:
     // Подгрузите реальное имя с сервера, если требуется
  } else {
    this.router.navigate(['/login'])
    
  }
}
}
