import { Injectable } from '@angular/core';
import { API_URLS } from '../../../constants';
import { RadioStation } from './RadioStation';
import { BehaviorSubject } from 'rxjs';
import { RotationApplication } from '../user-rotations/RotationApplication';
@Injectable({
  providedIn: 'root'
})
export class RadioStationsService {
  mapToRadio(data: any): RadioStation {
    return {
      radioStationId:Number(data.radioStationId),
      name: data.name,
      frequency: data.frequency,
      country: data.country,
      contactInfo: data.contactInfo
    };
  }
  private radioStations = new BehaviorSubject<RadioStation[] | null>(null);
public radioStation$ = this.radioStations.asObservable();

private applications = new BehaviorSubject<RotationApplication[] | null>(null);
public application$ = this.applications.asObservable();


constructor() { }
UpdateRotationStatus(payload: { applicationId: number; newStatus: string }): Promise<void> {
  return fetch(`${API_URLS.UPDATE_APPLICATION}`, {
    method: 'PUT', // или 'POST', если у тебя так настроено
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // если нужна авторизация через cookie
    body: JSON.stringify(payload)
  }).then(response => {
    if (!response.ok) {
      throw new Error('Ошибка при обновлении статуса');
    }
  });
}


async GetAllRotations(){
  try {
    const request = await fetch(`${API_URLS.ALL_ROTATIONS}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (request.ok) {
      const result = await request.json();
      // Обновляем значение сабджекта результатом запроса
      this.applications.next(result);
      return result;
    } else {
      // Если запрос не успешен, устанавливаем значение сабджекта в null
      this.applications.next(null);
      return null;
    }
  } catch (error) {
    console.error('Error fetching radio stations:', error);
    // В случае ошибки также устанавливаем значение сабджекта в null
    this.applications.next(null);
    return null;
  }
}
async GetAllRadioStations() {
  try {
    const request = await fetch(`${API_URLS.RADIOS}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (request.ok) {
      const result = await request.json();
      // Обновляем значение сабджекта результатом запроса
      this.radioStations.next(result);
      return result;
    } else {
      // Если запрос не успешен, устанавливаем значение сабджекта в null
      this.radioStations.next(null);
      return null;
    }
  } catch (error) {
    console.error('Error fetching radio stations:', error);
    // В случае ошибки также устанавливаем значение сабджекта в null
    this.radioStations.next(null);
    return null;
  }
}
// applicationId: number;
// trackTitle: string;
// artistName: string;
// radioStationName: string;
// radioStationId?:number,
// trackId?:number,
// status: string;
// applicationDate: string;
// reviewDate: string | null;
// notes: string | null;
// }
async CreateRotation(trackId:number,radioStationId:number,notes:string):Promise<void>{
  const data={
    TrackId:trackId,
    RadioStationId:radioStationId,
    Status:'Pending',
    Notes:notes

  }
  const request=await fetch(`${API_URLS.ADD_ROTATION}`,{
    method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // Пе
  })
  return request.json()

}

async GetAllRotationApplications(id:number) {
  try {
    const artist = {
      id:id
    }
    const request = await fetch(`${API_URLS.ROTATION_APPLICATIONS}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(artist) // Передаем id = 42
  });

    if (request.ok) {
      const result = await request.json();
      return result; // Возвращаем результат запроса
    } else {
      console.error('Failed to fetch rotation applications:', request.statusText);
      return null; // Возвращаем null в случае неудачи
    }
  } catch (error) {
    console.error('Error fetching rotation applications:', error);
    return null; // Возвращаем null в случае ошибки
  }
}
}
