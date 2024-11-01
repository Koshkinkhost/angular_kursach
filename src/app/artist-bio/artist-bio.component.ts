import { Component,Input } from '@angular/core';
import { LastFmService } from '../last-fm.service';
import { Artist } from '../components/Artist';
import { listeners } from 'process';

@Component({
  selector: 'app-artist-bio',
  standalone: true,
  imports: [],
  templateUrl: './artist-bio.component.html',
  styleUrl: './artist-bio.component.css'
})
export class ArtistBioComponent {
  constructor(private last:LastFmService){}
@Input() name!:string;
artist:Artist={name:this.name,listeners:'',playCount:'',similar:[],registr_date:''}
async ngOnInit(){
const data=await this.last.find_artist(this.name);
if(data){
  console.log(data.artist);
  this.artist.listeners=data.artist.stats.listeners;
  this.artist.playCount=data.artist.stats.playcount;
  this.artist.similar=data.artist.similar.artist;
  this.artist.registr_date=data.artist.bio.published;
  console.log( this.artist.listeners);
  for(let i=0;i<this.artist.similar.length;i++){
    console.log(this,this.artist.similar[i]);
  }
}

}
}
