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
  imports: [FormsModule, TracksComponent, ArtistBioComponent,LoginComponent,RegistrationComponent,RouterModule,SwitchMenuComponent],
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
  this.checkAuthenticationAndRedirect();
}
private async checkAuthenticationAndRedirect() {
  try {
    const isAuthenticated = await this.registr.CheckAuthentication();
    if (this.registr.isAuth && this.registr.GetCurrentRole() === 'user') {
      this.router.navigate(['/system']);
    } else if (this.registr.isAuth && this.registr.GetCurrentRole() === 'admin') {
      this.router.navigate(['/adminka']);
    } else {
      this.router.navigate(['/login']);
    }
  } catch (error) {
    console.error('Ошибка при проверке аутентификации:', error);
  }
}

  async changeBlock(component: string) {
    this.router.navigate([`/account/${component}`]);
    console.log(`/account/${component}`)
  }

 


async logout() {
  this.access = false;
  this.registr.LogOut();
  const isAuthenticated = await this.registr.CheckAuthentication();
  this.provide.artist_name='';
  this.router.navigate(['account/login']);

}
}
