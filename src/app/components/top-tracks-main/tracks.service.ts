import { Injectable } from '@angular/core';
import { API_URLS } from '../../../../constants';
import { Track } from './TopTrack';
import { BehaviorSubject } from 'rxjs';
import { Artist } from '../Artist';
import { EditTracks } from '../../all-tracks/EditTracks';
import { FormGroup } from '@angular/forms';
import { AlbumInfo } from '../../all-tracks/Albuminfo';
@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private artistNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('artistName'));
  public artistName$ = this.artistNameSubject.asObservable();


  // BehaviorSubject для хранения выбранного артиста
  private selectedArtistSubject = new BehaviorSubject<Artist | null>(
    JSON.parse(localStorage.getItem('selectedArtist') || 'null')
  );
  public selectedArtist$ = this.selectedArtistSubject.asObservable();

  // Установка выбранного артиста
  setSelectedArtist(artist: Artist) {
    this.selectedArtistSubject.next(artist);
    localStorage.setItem('selectedArtist', JSON.stringify(artist)); // сохраняем в localStorage
  }
  // Получение текущего значения выбранного артиста
  getSelectedArtist(): Artist | null {
    return this.selectedArtistSubject.getValue();
  }

  // Очистка выбранного артиста
  clearSelectedArtist() {
    this.selectedArtistSubject.next(null);
  }

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
  async GetALbumTracks(Id: Number): Promise<any> {
   
    const response = await fetch(`${API_URLS.GET_ALBUM_TRACKS}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Id }) // Передаём ID в теле запроса
    });
  
    if (!response.ok) {
      throw new Error('Ошибка при получении треков альбома');
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
      Genre_track: track.genreTrack,
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
  
  // Метод для добавления трека с файлом
  async AddTrack(trackData: EditTracks, file: File): Promise<any> {
    // Создаем объект FormData
    const formData = new FormData();
    formData.append('trackData', JSON.stringify(trackData)); // Добавляем метаданные трека
    formData.append('audioFile', file); // Добавляем файл

    try {
      // Отправляем запрос на сервер через fetch
      const response = await fetch(`${API_URLS.ADD_TRACK}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка при загрузке трека: ${response.statusText}`);
      }

      const result = await response.json();
      return result; // Возвращаем результат от сервера
    } catch (error) {
      console.error('Ошибка при загрузке трека:', error);
      throw error; // Передаем ошибку выше
    }
  }

  async AddAlbumWithTracks(albumData: any): Promise<any> {
    const response = await fetch(`${API_URLS.ADD_ALBUM_WITH_TRACKS}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(albumData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении альбома');
    }

    return await response.json();
  }
  async getAllAlbums(): Promise<AlbumInfo[]> {
    const response = await fetch(`${API_URLS.ALL_ALBUMS}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении альбомов');
    }

    const albums = await response.json();
console.log(albums);
    // Преобразуем данные в нужный формат
    return albums.map((album: any) => ({
      albumId: album.albumId,
      artistId: album.ArtistId,
      artistName: album.artistName,  // Проверка на наличие объекта Artist
      genre: album.genre_name,  // Предполагаем, что жанр есть в объекте альбома
      title: album.album_title,      // Заголовок альбома
      totalPlays:album.totalPlays
    }));
    
}


}
