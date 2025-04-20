import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  private baseUrl = 'http://localhost:8082/api/v2/Artist/GetAllArtists';

  constructor() { }
  artis_id:Number=0;
  async getAllArtists(): Promise<any[]> {
    const response = await fetch(this.baseUrl, {
      credentials: 'include', // чтобы куки работали
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке артистов');
    }

    return await response.json();
  }
}
