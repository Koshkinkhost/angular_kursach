import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  url: string = "http://localhost:8080/api/v2/Account/Registration";
  url_log: string = "http://localhost:8080/api/v2/Account/Login";
  private tokenKey = "authToken";
async Login(login:string,password:string):Promise<any>{
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const data = {
    login: login,
    password: password
   
    
  };
  const request = await fetch(this.url_log, {
    method: 'POST',
    headers: headers,
     credentials:'include',
    body: JSON.stringify(data)
  });
  const result = await request.json();
 return result;
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

async CheckAuthentication(): Promise<boolean> {
  try {
    const request = await fetch('http://localhost:8080/api/v2/Account/CheckAuth', {
      method: 'GET',
      credentials: 'include' // Указываем, что нужно отправлять cookie
    });

    if (request.ok) {
      const result = await request.json();
      return result.isAuthenticated;
    }
  } catch (error) {
    console.error('Ошибка проверки аутентификации:', error);
  }
  return false;
}
 

  
}