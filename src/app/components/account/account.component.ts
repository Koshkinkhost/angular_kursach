import { Component } from '@angular/core';
import { Users } from './Users';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TracksComponent } from '../tracks/tracks.component';
import { ArtistBioComponent } from '../../artist-bio/artist-bio.component';
import { RegistrationService } from './RegistrationService';
import { LoginComponent } from '../../login/login.component';
import { RegistrationComponent } from '../../registration/registration.component';
import { SwitchMenuComponent } from '../../switch-menu/switch-menu.component';
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
constructor(private registr:RegistrationService,private router:Router){

}
async ngOnInit() {
  const isAuthenticated = await this.registr.CheckAuthentication();
  if (isAuthenticated) {
    this.access = true;
    // Вы можете также получить данные пользователя, например:
    this.name = 'Имя пользователя'; // Подгрузите реальное имя с сервера, если требуется
  } else {
    this.access = false;
  }
}

  async changeBlock(component: string) {
    this.router.navigate([`/account/${component}`]);
    console.log(`/account/${component}`)
  }

 


logout() {
  this.access = false;
  this.router.navigate(['/login']);
}
}
