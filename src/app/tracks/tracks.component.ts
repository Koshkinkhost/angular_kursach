import { Component, Input } from '@angular/core';
import { LastFmService } from '../last-fm.service';
import { Track } from './Track';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.css'
})
export class TracksComponent {
  
  @Input() name!:string;
  yt_results:string[]=[];
  tracks:Track[]=[];
  constructor(private last:LastFmService){}
async ngOnInit(){
  const data=await this.last.TopTracks(this.name);
  console.log(data);
  console.log(data.toptracks.track);
  
  for(let i=0;i<9;i++){
    this.tracks.push(data.toptracks.track[i]);
  }

}

}

