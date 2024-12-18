import { Component } from '@angular/core';
import { Users } from './Users';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TracksComponent } from '../tracks/tracks.component';
import { ArtistBioComponent } from '../../artist-bio/artist-bio.component';
import { RegistrationService } from './RegistrationService';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, TracksComponent, ArtistBioComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  content: number = 0;
  isLogin: boolean = true;
  us_log: string = '';
  name: string = '';
  access: boolean = false;
  us_password: string = '';
  confirm_password: string = '';
  yt_result: string[] = [];
  users: Users[] = [];
constructor(private registr:RegistrationService){

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

  async changeBlock(id: number) {
    this.content = id;
    console.log("переход");
  }

  async Log() {
const r=await this.registr.Login(this.us_log,this.us_password);

    if(r.success){
      this.access=true
      
        this.users.push({login:this.us_log,password:this.us_password})
        this.name=this.us_log;
        
        console.log("добавил пользователя в список")
      
    }
    else{
      this.access=false;
    }
  }
  Logout(){
    
  }

  change() {
    this.us_log = '';
    this.us_password = '';
    this.confirm_password = '';
    this.isLogin = !this.isLogin;
  }

  async Registration() {
   const data=await this.registr.Registration(this.us_log,this.us_password,this.confirm_password)
    if(data){
      alert("вы зарегистрировались");
    }
    
    
}
}
