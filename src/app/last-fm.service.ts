import { Injectable } from '@angular/core';
import { Artist } from './components/Artist';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {
  private userNameSubject=new BehaviorSubject<string>('');
  userName$=this.userNameSubject.asObservable();

   baseUrl:string = 'http://ws.audioscrobbler.com/2.0/';
   ident_catalog:string='aje77vap5p80l9dh3saf';
   private key: string = 'AQVNxz_VkuUAqlsR8U95eGIq_TcIpcWYn0oAS6zv'; // Замените на ваш API-ключ
   private lastfm_api:string='49b7daeef42c58b20fdcc06b0cfacc86';
    google_api:string="AIzaSyCaEPuB0AaQXHcNhZizQ_f13EFsZWZHj90"
 search_id:string="555f0391cc25c4c3b"
   artists:Artist[]=[
    {
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
    name: "Noize MC",
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
  changeUserName(newUserName:string){
    this.userNameSubject.next(newUserName);
  }
  GetUserName(){
    return this.userNameSubject.getValue();
  }
  async find_artist(name:string){
    const response=await fetch(`${this.baseUrl}?method=artist.getinfo&artist=${name}&api_key=${this.lastfm_api}&format=json`)
   return response.json()
  }
  async TopTracks(name:string){
    const response=await fetch(`${this.baseUrl}?method=artist.gettoptracks&artist=${name}&api_key=${this.lastfm_api}&format=json`)
    return response.json()
  }
  async TopChart(){
    const response=await fetch(`${this.baseUrl}?method=chart.gettoptracks&api_key=${this.lastfm_api}&format=json`)
    
    return response.json();
  }
  async getPhoto(a:string){
    

  
  }
  async find_photo(query:string):Promise<any>{
  
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${query}&searchType=image&key=${this.google_api}&cx=${this.search_id}`
    );
   
    return response.json()
   }
   async Get_Similar_Artists(artist: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}?method=artist.getSimilar&artist=${artist}&api_key=${this.lastfm_api}&format=json`);
    console.log("подобные артисты ");
    const data=await response.json()
    
    return data;
  }
 }
