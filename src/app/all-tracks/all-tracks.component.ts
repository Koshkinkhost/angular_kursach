import { Component,OnInit } from '@angular/core';
import { Track } from '../components/top-tracks-main/TopTrack';
import { TracksService } from '../components/top-tracks-main/tracks.service';
import { ReactiveFormsModule, FormControl,FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-all-tracks',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
templateUrl: './all-tracks.component.html',
  styleUrl: './all-tracks.component.css'
})
export class AllTracksComponent {
  searchControl = new FormControl('');

  tracks:Track[]=[];
  find_tracks:Track[]=[];
  constructor(private trackService:TracksService){}
  mapToTrack(data: any): Track {
    return {
      id:data.TrackId,
      title: data.title,
      trackArtist: data.track_Artist,
      genreTrack: data.genre_track,
      listenersCount: Number(data.listeners_count)
    };
    

}
async find_tracksByTitle(){
  console.log(this.searchControl.value);

  const data=await this.trackService.TracksByTitle(this.searchControl.value?? '')
  
  this.tracks=data.map(this.mapToTrack);
  console.log(this.tracks);
}
async ngOnInit(){

  
  
const result=await this.trackService.getAllTracks();
this.tracks=result.map(this.mapToTrack);


}
}
