import { Component,OnInit } from '@angular/core';
import { RadioStationsService } from './radio-stations.service';
import { RadioStation } from './RadioStation';
import { EditTracks } from '../all-tracks/EditTracks';
import { TracksService } from '../components/top-tracks-main/tracks.service';
import { Artist } from '../components/Artist';
import { FormsModule } from "@angular/forms";

import { Track } from '../components/top-tracks-main/TopTrack';
@Component({
  selector: 'app-radio-stations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio-stations.component.html',
  styleUrl: './radio-stations.component.css'
})
export class RadioStationsComponent {
  radioSt?:RadioStation[]=[];
  trackComments: { [key: string]: string } = {};
  selected_artist:Artist={id:'',name:''};
show_tracks:boolean=false;
button_text:string='Подать заявку на ротацию'
  tracks:EditTracks[]=[];
  constructor(private radio:RadioStationsService,private tracksService:TracksService){}
  mapToTrack(data: any): EditTracks {
    return {
      trackId:Number(data.trackId),
      title: data.title,
      trackArtist: data.track_Artist,
      genreTrack: data.genre_track,
      listenersCount: Number(data.listeners_count),
      AlbumId:0
    };
  }
async ngOnInit(){
  this.tracksService.tracks$.subscribe((tracks: EditTracks[]) => {
    this.tracks = tracks; // Обновляем локальное состояние
  });
  this.tracksService.selectedArtist$.subscribe((artist: Artist | null) => {
    if (artist) {
      this.selected_artist = artist;
    }
  });
  const data=await this.tracksService.GetArtistTracks(Number(this.selected_artist.id));
  this.tracks=data.tracks.map(this.mapToTrack);
    console.log('треки ',this.tracks);
  this.radio.radioStation$.subscribe((tracks: RadioStation[]|null) => {
    this.radioSt = tracks ?? []// Обновляем локальное состояние
  });
  console.log("Радиостанции",this.radioSt);
  const result=await this.radio.GetAllRadioStations();
  console.log(result);
}

  addRadioStation(): void {
   
}
showTracks(){
  this.show_tracks=!this.show_tracks;
  if(this.show_tracks){
    this.button_text='Скрыть'

  }
  else{
    this.button_text='Подать заявку на ротацию'

  }
}
isTracksVisible: { [key: number]: boolean } = {};

    // Хранение комментариев для каждого трека

    // Переключение видимости треков для конкретной радиостанции
    toggleTracks(radioStationId: number): void {
        this.isTracksVisible[radioStationId] = !this.isTracksVisible[radioStationId];
    }

    // Отправка заявки на ротацию
    async sendRotationRequest(trackId: number, radioStationId: number, comment: string): Promise<void> {
      const result=await this.radio.CreateRotation(trackId,radioStationId,comment);
        console.log(`Заявка на ротацию отправлена:
            Трек ID: ${trackId},
            Радиостанция ID: ${radioStationId},
            Комментарий: ${comment}`);
        // Здесь можно добавить логику отправки данных на сервер
    }
}
