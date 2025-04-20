import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Artist } from './components/Artist';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {
  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();

  baseUrl: string = 'http://localhost:8082/api/v2'; // твой API

  artists: Artist[] = [
    
    // остальные...
  ];

  constructor() {}

  changeUserName(newUserName: string) {
    this.userNameSubject.next(newUserName);
  }

  GetUserName() {
    return this.userNameSubject.getValue();
  }

  // Получить информацию об артисте
  async find_artist(name: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/artists/name/${name}`);
    if (!response.ok) {
      throw new Error('Ошибка при получении данных артиста');
    }
    return await response.json();
  }

  // Получить топ треки артиста
  // Получить топ треки артиста по имени (с использованием POST)
async TopTracks(name: string): Promise<any> {
  const response = await fetch(`${this.baseUrl}/Artist/GetTracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ArtistName: name }),  // отправка имени артиста в теле запроса
  });

  if (!response.ok) {
    throw new Error('Ошибка при получении данных треков');
  }
  return await response.json();
}


  // Получить общий чарт
  async TopChart(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/chart/top-tracks`);
    if (!response.ok) {
      throw new Error('Ошибка при получении данных чарта');
    }
    return await response.json();
  }

  // Найти похожих артистов
  async Get_Similar_Artists(artist: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/artists/${artist}/similar`);
    if (!response.ok) {
      throw new Error('Ошибка при получении данных похожих артистов');
    }
    return await response.json();
  }

  // Поиск изображений через Google API
  async find_photo(query: string): Promise<any> {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${query}&searchType=image&key=AIzaSyCaEPuB0AaQXHcNhZizQ_f13EFsZWZHj90&cx=555f0391cc25c4c3b`
    );
    if (!response.ok) {
      throw new Error('Ошибка при поиске изображений');
    }
    return await response.json();
  }
}
