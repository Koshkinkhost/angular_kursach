import { Injectable } from '@angular/core';
import { API_URLS } from '../../../../constants';
import { Track } from './TopTrack';
import { BehaviorSubject } from 'rxjs';
import { Artist } from '../Artist';
import { EditTracks } from '../../all-tracks/EditTracks';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private artistNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('artistName'));
  public artistName$ = this.artistNameSubject.asObservable();

  setArtistName(name: string) {
    this.artistNameSubject.next(name);
    localStorage.setItem('artistName', name);
  }

  clearArtistName() {
    this.artistNameSubject.next(null);
    localStorage.removeItem('artistName');
  }
  private tracksSubject = new BehaviorSubject<EditTracks[]>([]); // Согласуем типы
  tracks$ = this.tracksSubject.asObservable();  // Публикуем это как Observable для подписки

  constructor() {}

  selected_artist: Artist = { id: '', name: '' };

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
  async getTrackEarningsByArtistId(id: number): Promise<{ [title: string]: number }> {
    const response = await fetch(`${API_URLS.MONEY_BY_TRACK}`, {
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
  async GetMoney(id: Number): Promise<any> {
    const response = await fetch(`${API_URLS.GET_ALL_ROYALTY}`, {
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
  
    return await response;
  }

  async TracksByTitle(Title: string): Promise<any> {
    console.log(Title, " из сервиса");
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

  async editTrack(track: EditTracks): Promise<EditTracks[]> {
    const updatedTrack = {
      trackId: track.trackId,
      title: track.title,
      trackArtist: track.trackArtist,
      GenreName: track.genreTrack,
      listenersCount: track.listenersCount,
      AlbumId:track.AlbumId
    };

    const response = await fetch(`${API_URLS.UPDATE_TRACK}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTrack),
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении трека');
    }

    const updatedTracks = await response.json();
    this.tracksSubject.next(updatedTracks); // Обновляем данные в BehaviorSubject
    return updatedTracks;
  }
  async AddTrack(track: EditTracks): Promise<EditTracks[]> {
    const updatedTrack = {
      ArtistId:track.ArtistId,
      trackId: track.trackId,
      title: track.title,
      trackArtist: track.trackArtist,
      Genre_track: track.genreTrack,
      listenersCount: track.listenersCount,
      AlbumId:track.AlbumId
    };

    const response = await fetch(`${API_URLS.ADD_TRACK}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTrack),
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении трека');
    }

    const updatedTracks = await response.json();
    this.tracksSubject.next(updatedTracks); // Обновляем данные в BehaviorSubject
    return updatedTracks;
  }
}
