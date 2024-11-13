import { Component } from '@angular/core';
import { Users } from './Users';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TracksComponent } from '../tracks/tracks.component';
import { ArtistBioComponent } from '../../artist-bio/artist-bio.component';

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

  ngOnInit() {
    const savedUsers = localStorage.getItem('users');
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
    console.log(this.users);
  }

  async changeBlock(id: number) {
    this.content = id;
    console.log("переход");
  }

  Log() {
    const user = this.users.find(user => user.login === this.us_log && user.password === this.us_password);
    if (user) {
      alert("вы зашли");
      this.name = this.us_log;
      this.us_log = '';
      this.us_password = '';
      this.access = true;
      return;
    }
    alert("такого пользователя нет");
  }

  change() {
    this.us_log = '';
    this.us_password = '';
    this.confirm_password = '';
    this.isLogin = !this.isLogin;
  }

  Registration() {
    if (this.confirm_password === this.us_password) {
        let keys = Object.keys(localStorage);
        if (!keys.includes(this.us_log)) {
            this.users.push({ login: this.us_log, password: this.us_password });
            localStorage.setItem('users', JSON.stringify(this.users));
        }
        console.log(localStorage.getItem('users'));
        this.isLogin = true;
        this.us_log = '';
        this.us_password = '';
        this.confirm_password = ''; // Clear confirm_password after registration
    } else {
        alert("пароли не совпадают");
    }
}
}
