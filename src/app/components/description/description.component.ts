import { Component,Input } from '@angular/core';
import { DescriptionService } from './description.service';

import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LastFmService } from '../../last-fm.service';
import { Artist } from '../Artist';
import { TracksService } from '../top-tracks-main/tracks.service';
import { Track } from '../top-tracks-main/TopTrack';
@Component({
  selector: 'app-description',
  standalone: true,
  imports: [HeaderComponent],
  providers:[DescriptionService],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  tracks:Track[]=[];
  @Input() selectedArtist:Artist|undefined={id:'',
    name:'',
    };
    images: { name: string, url: string }[] = [];
    artist_photo:string='';
    description:string='';
  constructor(private route: ActivatedRoute,private last:LastFmService,private tracksService:TracksService) {}
  mapToTrack(data: any): Track {
    return {
      id:Number(data.trackId),
      title: data.title,
      trackArtist: data.track_Artist,
      genreTrack: data.genre_track,
      listenersCount: Number(data.listeners_count)
    };
  }
  async IncreasePlayCounts(id: Number) {
    await this.tracksService.IncrementPlays(id);
  
    // Находим индекс нужного трека
    const index = this.tracks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tracks[index].listenersCount += 1; // Локально увеличиваем число прослушиваний
    }
  }
  
  
  async ngOnInit() {
    // Получение id из URL
    const id = (this.route.snapshot.paramMap.get('id'));
    console.log("айди артиста"+id);
    // Поиск продукта по id
    this.selectedArtist = this.last.artists.find(p => p.id === id);
    const artists=localStorage.getItem('artistImages');
    const trackss=await this.tracksService.GetArtistTracks(Number(id));
    console.log("треки ",trackss);
    this.tracks=trackss.tracks.map(this.mapToTrack);
    
    if(artists){
       this.images = JSON.parse(artists);
    }
    const artist=this.images.find(u=>u.name==this.selectedArtist?.name);
    
    if(artist){
      const data=await this.last.find_artist(artist?.name)
      const text=data.artist.bio.summary
      this.description = text.replace(/<[^>]+>/g, '');
      console.log(data.artist.bio.summary);
      this.artist_photo=artist?.url;
    }
    
  }
}
