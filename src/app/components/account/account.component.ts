import { Component } from '@angular/core';
import { Users } from './Users';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service';
import { TracksComponent } from '../../tracks/tracks.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule,TracksComponent],
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
    { login: 'boris', password: '11' }
  ];

  constructor(private yt: YoutubeService) {}

  async changeBlock(id: number) {
    this.content = id;
    console.log("переход");

  }

  Log() {
    const user = this.users.find(u => u.login === this.us_log && u.password === this.us_password);

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
      this.isLogin = true;
      this.us_log = '';
      this.us_password = '';
      this.confirm_password = ''; // Очищаем confirm_password после регистрации
    } else {
      alert("пароли не совпадают");
    }
  }
}
