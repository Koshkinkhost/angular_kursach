import { Component } from '@angular/core';
import { Users } from './Users';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { TracksComponent } from '../../tracks/tracks.component';
import { ArtistBioComponent } from '../../artist-bio/artist-bio.component';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule,TracksComponent,ArtistBioComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'] // Исправлено на 'styleUrls'
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
  users: Users[] = [
   
  ];
   ngOnInit(){
    const users_str=localStorage.getItem('users');
    if(users_str)
    this.users=JSON.parse(users_str)
  console.log(this.users)
   }



  async changeBlock(id: number) {
    this.content = id;
    console.log("переход");

  }

  Log() {
    
 const user=0;
    if (user != null) {
      alert("вы зашли");
      this.name = this.us_log;
      this.us_log = '';
      this.us_password = '';
      this.access = true;
      return;
    }
    alert("такого пользователя нет");
  }
change(){
  this.us_log = '';
  this.us_password = '';
  this.confirm_password = ''
  this.isLogin = !this.isLogin;
}
  Registration() {
    if (this.confirm_password === this.us_password) {
      this.users.push({ login: this.us_log, password: this.us_password });
      localStorage.setItem('users',JSON.stringify(this.users))
      console.log(localStorage.getItem('users'))
      this.isLogin = true;
      this.us_log = '';
      this.us_password = '';
      this.confirm_password = ''; // Очищаем confirm_password после регистрации
    } else {
      alert("пароли не совпадают");
    }
  }
}
