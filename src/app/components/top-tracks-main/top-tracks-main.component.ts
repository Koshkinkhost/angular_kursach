import { Component,OnInit } from '@angular/core';
import { LastFmService } from '../../last-fm.service';
import { Track } from './TopTrack';
@Component({
  selector: 'app-top-tracks-main',
  standalone: true,
  imports: [],
  templateUrl: './top-tracks-main.component.html',
  styleUrl: './top-tracks-main.component.css'
})
export class TopTracksMainComponent {
constructor(private lastFm:LastFmService){}
tracks:Track[]=[]
mapToTrack(data:any):Track | any{
  return {
    artistName:data.artist.name,
    trackName:data.name,
    playcount:Number(data.playCount),
    listeners:Number(data.listeners)
  }

}
async ngOnInit(){
  const data=await this.lastFm.TopChart()
  
 this.tracks=data.tracks.track.map((trackdata:any)=>this.mapToTrack(trackdata));
 console.log(this.tracks)
}

}
