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

  ngOnInit() {
    const storedRole = localStorage.getItem('role');
    const isAuth = localStorage.getItem('auth') === 'true';

    if (isAuth && storedRole) {
      this.login.SetRole(storedRole);
      this.login.SetAuthState(true);

      switch (storedRole) {
        case 'Artist':
          this.router.navigate(['/system']);
          break;
        case 'Admin':
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
    const form_value = this.form_login.getRawValue();
    console.log(form_value.role, form_value.password, form_value.role);
    this.router.navigate(['/register']);
  }

  async Loginn() {
    this.errors = [];
    const form_value = this.form_login.getRawValue();
    console.log(form_value.login, form_value.password, form_value.role);

    const result = await this.login.Login(form_value.login, form_value.password, form_value.role);
    const data = await result.json();

    if (data.messages && data.messages.Errors) {
      this.errors.push(data.messages.Errors);
    }

    // Сохраняем текущего артиста
    this.trackService.selected_artist = {
      id: data.id,
      name: data.name
    };

    // Сохраняем в localStorage
    localStorage.setItem('username', form_value.login);
    localStorage.setItem('auth', 'true');
    this.lastfm.changeUserName(form_value.login);
    this.login.user_role = form_value.role;

    if (data.success) {
      if (form_value.role.toLowerCase() !== 'admin') {
        this.login.SetAuthState(true);
        this.login.SetRole('Artist');
        localStorage.setItem('role', 'Artist');
        this.router.navigate(['/system']);
      } else {
        this.login.SetAuthState(true);
        this.login.SetRole('Admin');
        localStorage.setItem('role', 'Admin');
        this.router.navigate(['/adminka']);
      }
    }
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    this.login.SetAuthState(false);
    this.router.navigate(['/login']);
  }
}
