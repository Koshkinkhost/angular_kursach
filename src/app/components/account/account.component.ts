import { Component } from '@angular/core';
import { Users } from './Users';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TracksComponent } from '../tracks/tracks.component';
import { ArtistBioComponent } from '../../artist-bio/artist-bio.component';
import { LoginComponent } from '../../login/login.component';
import { RegistrationComponent } from '../../registration/registration.component';
import { SwitchMenuComponent } from '../../switch-menu/switch-menu.component';
import { RegistrationService } from '../../registration/RegistrationService';
import { ProviderService } from './provider.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, TracksComponent,RegistrationComponent,RouterModule,SwitchMenuComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  content: number = 1;
  name:string='';
  isLogin: boolean = true;
  access: boolean = false;
  yt_result: string[] = [];
  users: Users[] = [];
  currentComponent:string='';
constructor(public registr:RegistrationService,private router:Router,public provide:ProviderService){

}
async ngOnInit() {
  console.log("в аккаунте");
  this.checkAuthenticationAndRedirect();
}
private async checkAuthenticationAndRedirect() {
  try {
    const isAuthenticated =  this.registr.GetAuthState();
    if (isAuthenticated && this.registr.GetCurrentRole() === 'user') {
      this.router.navigate(['/system']);
    } else if (isAuthenticated && this.registr.GetCurrentRole() === 'admin') {
      this.router.navigate(['/adminka']);
    } else {
      this.router.navigate(['/login']);
    }
  } catch (error) {
    console.error('Ошибка при проверке аутентификации:', error);
  }
}

  async changeBlock(component: string) {
    this.router.navigate([`/${component}`]);
    console.log(`/${component}`)
  }

 



}
