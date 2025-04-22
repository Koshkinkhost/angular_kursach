import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/RegistrationService';
import { LastFmService } from '../last-fm.service';
import { TracksService } from '../components/top-tracks-main/tracks.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private login: RegistrationService,
    private lastfm: LastFmService,
    private trackService: TracksService
  ) {}

  errors: string[] = [];

  form_login: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  async ngOnInit() {
    const storedRole = localStorage.getItem('role');
    const isAuth = localStorage.getItem('auth') === 'true';
    const result = await this.login.CheckAuthentication();
    if (result && storedRole) {
      this.login.SetRole(storedRole);
      this.login.SetAuthState(true);

      switch (storedRole) {
        case 'Artist':
          this.router.navigate(['/system']);
          break;
        case 'admin':
          this.router.navigate(['/adminka']);
          break;
        default:
          console.log('UNKNOWN ROLE');
          break;
      }
    } else {
      console.log('NOT AUTHENTICATED');
    }
  }

  redirect() {
    this.router.navigate(['/register']);
  }

  async Loginn() {
    this.errors = [];
    const form_value = this.form_login.getRawValue();
    console.log("TRY LOGIN:", form_value.login, form_value.password, form_value.role);
  console.log(localStorage.getItem('username'));
    let result: Response;
  
    try {
      // Вызываем нужный эндпоинт
      if (form_value.role.toLowerCase() === 'admin') {
        result = await this.login.LoginAdmin(form_value.login, form_value.password, form_value.role);
      } else {
        result = await this.login.Login(form_value.login, form_value.password, form_value.role);
        localStorage.setItem('username', form_value.login);
        this.trackService.setArtistName(form_value.login);
        console.log(this.trackService.selected_artist.name,"ЗАПИСАЛ В СЕРВИС");
      }
  
      const data = await result.json();
  
      if (!data.success) {
        if (data.messages?.Errors) {
          this.errors.push(...data.messages.Errors);
        } else {
          this.errors.push('Неверный логин или пароль.');
        }
        return; // не продолжаем
      }
  
      // Если всё ок — продолжаем
      localStorage.setItem('username', form_value.login);
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', form_value.role);
      console.log("с формы" ,form_value.role);
      this.lastfm.changeUserName(form_value.login);
      this.login.SetAuthState(true);
      this.login.SetRole(form_value.role);
  
      if (form_value.role.toLowerCase() !== 'admin') {
        this.trackService.selected_artist = {
          id: data.id,
          name: data.name
        };
        this.router.navigate(['/system']);
      } else {
        this.router.navigate(['/adminka']);
      }
    } catch (err) {
      this.errors.push('Ошибка входа. Проверьте данные.');
      console.error(err);
    }
  }
  
}
