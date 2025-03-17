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
 
 
}
async logout() {
  console.log("нажал");
  localStorage.removeItem('username');
  this.registr.SetAuthState(false);
  await this.registr.LogOut();
 
  this.registr.SetRole('');
 
  const result =   this.registr.GetAuthState();
  console.log("Результат CheckAuthentication: ", result);

  if (!result) {
    console.log("Выход выполнен");
    this.router.navigate(['/login']);

  } else {
    console.log("Не удалось выйти, остаёмся в системе");
  }
}



}
