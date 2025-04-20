import { Component, Input } from '@angular/core';
import { LastFmService } from '../../last-fm.service';

import { ProviderService } from '../account/provider.service';
import { RegistrationService } from '../../registration/RegistrationService';
import { Router } from '@angular/router';
import { TracksService } from '../top-tracks-main/tracks.service';
import { Track } from '../top-tracks-main/TopTrack';
@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [],
providers:[LastFmService],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.css'
})
export class TracksComponent {
  mapToTrack(data: any): Track {
    return {
      id:Number(data.trackId),
      title: data.title,
      trackArtist: data.track_Artist,
      genreTrack: data.genre_track,
      listenersCount: Number(data.listeners_count)
    };
  }
  
  yt_results:string[]=[];
  tracks:Track[]=[];
  constructor(private last:LastFmService,private registr:RegistrationService,private router:Router,private tracksService:TracksService){}
async ngOnInit(){
  
  const isAuthenticated =  this.registr.GetAuthState();
  // const role_check=await this.registr.Check_Roles();
  // console.log(role_check);//проверка РОЛИ

  const storage_name=localStorage.getItem('username');
  if (isAuthenticated && storage_name) {
   
    const data=await this.tracksService.GetArtistTracks(Number(this.tracksService.selected_artist.id));
this.tracks=data.tracks.map(this.mapToTrack);
  console.log(data);
  


    // Вы можете также получить данные пользователя, например:
     // Подгрузите реальное имя с сервера, если требуется
  } else {
      this.router.navigate(['/login']);
  }

 
  
 

}

}

