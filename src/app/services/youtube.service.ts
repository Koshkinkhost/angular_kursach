import { Injectable } from '@angular/core';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private google_api: string = 'AIzaSyCaEPuB0AaQXHcNhZizQ_f13EFsZWZHj90';
  private lastfm_api:string='49b7daeef42c58b20fdcc06b0cfacc86';

  constructor() { }

  async getStatistics(videoId: string): Promise<any> {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=statistics&key=${this.google_api}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении статистики видео:', error);
      throw error; // пробрасываем ошибку дальше
    }
  }

  async getName(query: string): Promise<any> {
    console.log(query)
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${this.google_api}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Ошибка при поиске видео:', error);
      throw error; // пробрасываем ошибку дальше
    }
  }
}
