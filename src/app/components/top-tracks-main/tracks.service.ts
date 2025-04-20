import { Injectable } from '@angular/core';
import { API_URLS } from '../../../../constants';
import { Track } from './TopTrack';
import { BehaviorSubject } from 'rxjs';
import { Artist } from '../Artist';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  

 
  constructor() { }
  selected_artist:Artist=
  {id:'',
    name:'',
    
  };

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
  async GetArtistTracks(id: number): Promise<any> {
    const response = await fetch(`${API_URLS.ARTIST_TRACKS}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }) // Передаём ID в теле запроса
    });
  
    if (!response.ok) {
      throw new Error('Ошибка при получении топ треков');
    }
  
    return await response.json();
  }
  async getAllTracks(): Promise<any[]> {
    const response = await fetch(`${API_URLS.ALL_TRACKS}`, {
      method: 'GET',
      credentials: 'include' 
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении топ треков');
    }

    return await response.json();
  }
  async IncrementPlays(trackId: Number): Promise<any> {
    const response = await fetch(`${API_URLS.INCREASE_PLAYS}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ trackId }) // Передаём ID в теле запроса
    });
  
    if (!response.ok) {
      throw new Error('Ошибка при получении топ треков');
    }
  
    return await response;
  }
  async TracksByTitle(Title: string): Promise<any> {
    console.log(Title," из сервиса");
    const response = await fetch(`${API_URLS.TRACKS_BY_TITLE}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Title }) // Передаём ID в теле запроса
    });
  
    if (!response.ok) {
      throw new Error('Ошибка при получении топ треков');
    }
  
    return await response.json();
  }
  
}
