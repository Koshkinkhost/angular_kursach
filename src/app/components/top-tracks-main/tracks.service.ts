import { Injectable } from '@angular/core';
import { API_URLS } from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor() { }
  async getTopTracks(n: number): Promise<any[]> {
    const response = await fetch(`${API_URLS.TOP_TRACKS}?n=${n}`, {
      method: 'GET',
      credentials: 'include' 
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении топ треков');
    }

    return await response.json();
  }
}
