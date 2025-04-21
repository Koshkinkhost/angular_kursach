import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { API_URLS } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private router: Router) {}

  url: string = `${API_URLS.BASE_URL}${API_URLS.REGISTRATION}`;
  url_log: string = `${API_URLS.BASE_URL}${API_URLS.LOGIN}`;
  url_logOut: string = `${API_URLS.LOG_OUT}`;
  url_check_admin: string = `${API_URLS.BASE_URL}${API_URLS.CHECK_ADMIN}`;
  url_check_role: string = `${API_URLS.BASE_URL}${API_URLS.CHECK_ROLE}`;
  url_news: string = API_URLS.NEWS;
  url_registration: string = `${API_URLS.BASE_URL}${API_URLS.REGISTRATION}`;
  url_check_auth: string = "http://localhost:8082/api/v2/Account/CheckAuth";

  artist_name: string = '';
  user_role: string = '';

  private isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$ = this.isAuthSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string>('');
  public userRole$ = this.userRoleSubject.asObservable();

  private tokenKey = "authToken";

  async GetNews() {
    const request = await fetch(this.url_news, {
      method: 'GET',
    });
    return request.json();
  }

  SetRole(role: string) {
    this.userRoleSubject.next(role);
    localStorage.setItem('userRole', role);
  }

  GetCurrentRole() {
    return this.userRoleSubject.getValue();
  }

  SetAuthState(isAuthenticated: boolean): void {
    this.isAuthSubject.next(isAuthenticated);
  }

  GetAuthState(): boolean {
    return this.isAuthSubject.getValue();
  }

  async Login(login: string, password: string, role: string): Promise<any> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const data = {
      login: login,
      password: password,
      role: role
    };

    const request = await fetch(this.url_log, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (request.ok) {
      this.isAuthSubject.next(true);
    }

    return request;
  }
 
  
  LoginAdmin(login: string, password: string, role: string) {
    return fetch(API_URLS.LOGIN_ADMIN, {
      method: 'POST',
      body: JSON.stringify({ login, password, role }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
  }
  

  async Registration(login: string, password: string, confirmPassword: string): Promise<any> {
    try {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      const data = {
        Login: login,
        Password: password,
        Confirmpassword: confirmPassword
      };

      const request = await fetch(this.url_registration, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });

      if (!request.ok) {
        throw new Error(`Ошибка: ${request.status} - ${request.statusText}`);
      }

      const result = await request.json();
      console.log('Результат:', result);
      return result;
    } catch (error) {
      console.error('Ошибка запроса:', error);
      return null;
    }
  }

  async CheckAuthentication() {
    const request = await fetch(this.url_check_auth, {
      method: 'GET',
      credentials: 'include'
    });

    if (request.ok) {
      const result = await request.json();
      this.SetAuthState(result.isAuthenticated);

      const state = this.GetAuthState();
      console.log("CheckAuth " + state);
      return state;
    }

    return null;
  }

  async LogOut() {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
  
    const request = await fetch(this.url_logOut, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify({})
    });
  
    if (request.ok) {
      this.SetAuthState(false);
      console.log("состояние аутентификации " + this.GetAuthState());
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('auth');
      this.SetRole('None');
      console.log("РОЛЬ В СЕРВИСЕ ", this.GetCurrentRole());
      console.log("User logged out.");
    } else {
      console.error("Logout failed.");
    }
  }
  

  async check_Rights(login: string) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const data = {
      login: login
    };

    const request = await fetch(this.url_check_admin, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(data)
    });

    return request;
  }

  async Check_Roles() {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const req = await fetch(this.url_check_role, {
      method: 'GET',
      headers: headers,
      credentials: 'include'
    });

    const result = await req.json();
    return result;
  }
}
