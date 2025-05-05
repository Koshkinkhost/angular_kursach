import { Injectable } from '@angular/core';
import { API_URLS } from '../../../constants';
import { RadioStation } from './RadioStation';
import { BehaviorSubject } from 'rxjs';
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

constructor() { }

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
