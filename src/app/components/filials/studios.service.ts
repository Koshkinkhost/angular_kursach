import { Injectable } from '@angular/core';
import { Studio } from './Studios';
import { API_URLS } from '../../../../constants';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class StudiosService {

  constructor() { }
  private studiosSubject = new BehaviorSubject<Studio[]>([]); // Начальное состояние
  public studios$ = this.studiosSubject.asObservable(); 
  async Get_Studios(){

    const result = await fetch(`${API_URLS.STUDIOS}`);
    const data = await result.json()
    this.studiosSubject.next(data);
    return data; 
  }
  async Add_Studio(name:string,phone_num:string,email:string,street:string,build:string,longt:string,lat:string,city:string){
    const studio={
      name:name,
      phone_num:phone_num,
      email:email,
      street:street,
      build:build,
      longt:longt,
      lat:lat,
      city:city,
    }
    console.log("отправляемые данные: ",studio);
    try{
      const result = await fetch(`${API_URLS.ADD_STUDIOS}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studio), 
  
      })
      const data=await result.json();
      await this.Get_Studios();
    
      return data;
    }
    catch{
      console.log('error')
    }
    
   

  }
}
