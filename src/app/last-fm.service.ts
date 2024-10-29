import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {
   baseUrl:string = 'http://ws.audioscrobbler.com/2.0/';
   private lastfm_api:string='49b7daeef42c58b20fdcc06b0cfacc86';
  constructor() { }
  async find_artist(name:string){
    const response=await fetch(`${this.baseUrl}?method=artist.getinfo&artist=${encodeURIComponent(name)}&api_key=${this.lastfm_api}&format=json`)
    console.log(response.json())
  }
}
