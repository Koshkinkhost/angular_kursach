import { Component,Input } from '@angular/core';
import { LastFmService } from '../last-fm.service';
import { Artist } from '../components/Artist';
import { listeners } from 'process';
import { TracksService } from '../components/top-tracks-main/tracks.service';

@Component({
  selector: 'app-artist-bio',
  standalone: true,
  imports: [],
  templateUrl: './artist-bio.component.html',
  styleUrl: './artist-bio.component.css'
})
export class ArtistBioComponent {
  constructor(private tracksService:TracksService){}
  @Input() name!:string;
  selected_artist:Artist={id:'',name:''};
async ngOnInit(){

  this.tracksService.selectedArtist$.subscribe((artist: Artist | null) => {
    if (artist) {
      console.log("артист ",artist);
      this.selected_artist = artist;
    }
  });
}

}
