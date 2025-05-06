import { Injectable } from '@angular/core';
import { API_URLS } from '../../../constants';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  // Получить общее количество денег по артистам
  async getArtistsWithRoyalties(): Promise<any[]> {
    const response = await fetch(API_URLS.GET_ALL_ROYALTY_ARTIST);
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные по роялти');
    }
    return await response.json();
  }

 
  
  // Получить роялти по трекам артиста
  async getTracksRoyalties(artistId: number): Promise<any[]> {
    const response = await fetch(`${API_URLS.MONEY_BY_TRACK}?artistId=${artistId}`);
    if (!response.ok) {
      throw new Error('Не удалось загрузить роялти по трекам');
    }
    return await response.json();
  }

  // Получить заявки на ротацию
  async getRotationApplications(): Promise<any[]> {
    const response = await fetch(API_URLS.ROTATION_APPLICATIONS);
    if (!response.ok) {
      throw new Error('Не удалось загрузить заявки на ротацию');
    }
    return await response.json();
  }

  // Обработать заявку на ротацию
  async handleRotation(applicationId: number, approved: boolean): Promise<boolean> {
    const response = await fetch(API_URLS.ROTATION_APPLICATIONS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId, approved })
    });
    return response.ok;
  }

  // Удалить артиста
  async deleteArtist(artistId: number): Promise<boolean> {
    const response = await fetch(`http://localhost:8082/api/v2/Artist/DeleteArtist?artistId=${artistId}`, {
      method: 'DELETE'
    });
    return response.ok;
  }

  // Уменьшить роялти
  async reduceRoyalty(artistId: number, percentage: number): Promise<boolean> {
    const response = await fetch('http://localhost:8082/api/v2/Royalti/ReduceRoyalty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artistId, percentage })
    });
    return response.ok;
  }
}
