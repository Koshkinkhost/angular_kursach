import { Injectable } from '@angular/core';
import { Artist } from './components/Artist';
@Injectable({
  providedIn: 'root'
})
export class LastFmService {
   baseUrl:string = 'http://ws.audioscrobbler.com/2.0/';
   private lastfm_api:string='49b7daeef42c58b20fdcc06b0cfacc86';
   artists:Artist[]=[{
    id: "1",
    name: "Radiohead",
    listeners: "12345678",
    playCount: "87654321",
    similar: ["Thom Yorke", "Muse", "Arcade Fire"],
    registr_date: "2022-01-15"
},
{
    id: "2",
    name: "Beyoncé",
    listeners: "98765432",
    playCount: "123456789",
    similar: ["Rihanna", "Alicia Keys", "Adele"],
    registr_date: "2021-09-20"
},
{
    id: "3",
    name: "Kendrick Lamar",
    listeners: "54321098",
    playCount: "987654321",
    similar: ["J. Cole", "Drake", "Jay-Z"],
    registr_date: "2023-03-10"
},
{
    id: "4",
    name: "Tame Impala",
    listeners: "65432109",
    playCount: "123456789",
    similar: ["Kevin Parker", "MGMT", "Unknown Mortal Orchestra"],
    registr_date: "2022-11-05"
},
{
    id: "5",
    name: "Taylor Swift",
    listeners: "87654321",
    playCount: "987654321",
    similar: ["Lorde", "Lana Del Rey", "Shawn Mendes"],
    registr_date: "2020-07-12"
}]
  constructor() { }
  async find_artist(name:string){
    const response=await fetch(`${this.baseUrl}?method=artist.getinfo&artist=${name}&api_key=${this.lastfm_api}&format=json`)
   return response.json()
  }
  async TopTracks(name:string){
    const response=await fetch(`${this.baseUrl}?method=artist.gettoptracks&artist=${name}&api_key=${this.lastfm_api}&format=json`)
    return response.json()
  }
}
