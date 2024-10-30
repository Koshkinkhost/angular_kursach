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
artist:Artist={name:this.name,listeners:'',playCount:'',similar:[]}
async ngOnInit(){
const data=await this.last.find_artist(this.name);
console.log(data.artist.bio.name);
this.artist.listeners;
}
}
