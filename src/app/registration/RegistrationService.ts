import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  url: string = "http://localhost:8080/api/v2/Account/Registration";
  url_log: string = "http://localhost:8080/api/v2/Account/Login";
  url_logOut: string = "http://localhost:8080/api/v2/Account/LogOut";
  url_check_admin: string = "http://localhost:8080/api/v2/Account/CheckRights";
  url_check_role: string = "http://localhost:8080/api/v2/Account/GetUserRole";
  url_news: string = "http://localhost:8080/api/v2/News/GetNews";
  artist_name:string='';
  private userRoleSubject=new BehaviorSubject<string>('');
  public userRole$=this.userRoleSubject.asObservable();
  public isAuth=false;
  private tokenKey = "authToken";
  async GetNews(){
    const request = await fetch(this.url_news, {
      method: 'GET',
    });
    return request.json();
  }
  SetRole(role:string){
    this.userRoleSubject.next(role);
    localStorage.setItem('userRole',role);
  }
  GetCurrentRole(){
    return this.userRoleSubject.getValue();
  }
async Login(login:string,password:string,role:string):Promise<any>{
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const data = {
    login: login,
    password: password,
    role:role
   
    
  };
  const request = await fetch(this.url_log, {
    method: 'POST',
    headers: headers,
     credentials:'include',
    body: JSON.stringify(data)
  });
  
 return request;
}

async Registration(login:string,password:string,confirmPassword:string):Promise<any> {
  try {

      const headers = new Headers({
          'Content-Type': 'application/json'
          
      });
const data={
  Login:login,
  Password:password,
  Confirmpassword:confirmPassword
}
      const request = await fetch('http://localhost:8080/api/v2/Account/Registration', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data) // Если тело запроса пустое, передаем пустой объект
      });

      if (!request.ok) {
          // Если сервер вернул ошибку
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
  try {
    const request = await fetch('http://localhost:8080/api/v2/Account/CheckAuth', {
      method: 'GET',
      credentials: 'include' // Указываем, что нужно отправлять cookie
    });

    if (request.ok) {
      const result = await request.json();
      this.isAuth= result.isAuthenticated
      
    }
  } catch (error) {
    console.error('Ошибка проверки аутентификации:', error);
  }

}
async LogOut(){
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const data = {

    
   
    
  };
  const request = await fetch(this.url_logOut, {
    method: 'POST',
    headers: headers,
     credentials:'include',
    body: JSON.stringify(data)
  });
}
  
  async check_Rights(login:string){
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const data = {
      login: login,
      
     
      
    };
    const request = await fetch(this.url_check_admin, {
      method: 'POST',
      headers: headers,
       credentials:'include',
      body: JSON.stringify(data)
    });
    
   return request;
  }
  async Check_Roles(){
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const req=await fetch(this.url_check_role,{
      method:'GET',
      headers:headers,
      credentials:'include'
    })
    const result=await req.json();
    return result;
  }
}

 

  
