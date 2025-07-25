import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Track } from '../components/top-tracks-main/TopTrack';
import { TracksService } from '../components/top-tracks-main/tracks.service';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RegistrationService } from '../registration/RegistrationService';
import { EditTracks } from './EditTracks';
import { API_URLS } from '../../../constants';
import { AlbumInfo } from './Albuminfo';
import { AlbumTracksComponent } from '../album-artists/album-tracks.component';
@Component({
  selector: 'app-all-tracks',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,RouterLink],
templateUrl: './all-tracks.component.html',
  styleUrls: ['./all-tracks.component.css']
})
export class AllTracksComponent implements OnInit {
  genres: string[] = ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic', 'Blues'];

  searchControl = new FormControl('');
  IsAdmin: boolean = false;
  mode:string='tracks';
  albums: AlbumInfo[] = [];
  lastPlayedTrackId: number | null = null;

  IsEditing: boolean = false;
  tracks: EditTracks[] = [];
  find_tracks: EditTracks[] = [];
base_url:string="http://localhost:8082/api/v2";
  constructor(private trackService: TracksService, private registr: RegistrationService) {}
  isBase64(str: string): boolean {
    return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(str);
  }
  async onPlay(t: any) {
    try {
      await this.trackService.IncrementPlays(t.trackId);
      t.listenersCount += 1; // Обновляем локально
    } catch (error) {
      console.error('Ошибка при увеличении прослушиваний', error);
    }
    setTimeout(() => {
      this.lastPlayedTrackId = null;
    }, 5000);
  }
  mapToTrack(data: any): EditTracks {
    return {
      trackId: Number(data.trackId),
      title: data.title,
      trackArtist: data.track_Artist,
      genreTrack: data.genre_track,
      listenersCount: Number(data.listeners_count),
      isEditing: false,
      AlbumId: data.albumId,
      audioUrl: data.url,
      FileBase64: data.fileBase64,
    };
  }



  async reset() {
    this.searchControl.setValue('');
    if (this.searchControl.value == '') {
      const data = await this.trackService.getAllTracks();
      this.tracks = data.map(this.mapToTrack);
      console.log(this.tracks);
    }
  }
  async  onModeChange(newMode: string) {
    this.mode = newMode;
    if (newMode === 'tracks') {
      this.reset();
      const result = await this.trackService.getAllTracks();
    this.tracks = result.map(this.mapToTrack);
    console.log(this.tracks);
    } else if (newMode === 'albums') {
      const result = await this.trackService.getAllAlbums();
    this.albums = result;
    console.log(this.albums); //
    }
  }
 

  async find_tracksByTitle() {
    console.log(this.searchControl.value);
    const data = await this.trackService.TracksByTitle(this.searchControl.value ?? '');
    this.tracks = data.map(this.mapToTrack);
    console.log(this.tracks);
  }

  async ngOnInit() {
    this.trackService.tracks$.subscribe((tracks: EditTracks[]) => {
      this.tracks = tracks; // Обновляем локальное состояние
    });

    if (this.registr.GetCurrentRole() == 'admin') {
      this.IsAdmin = true;
      console.log(this.IsAdmin);
    }

    const result = await this.trackService.getAllTracks();
    this.tracks = result.map(this.mapToTrack);
    console.log(this.tracks);
  }

  editTrack(track: EditTracks) {
    track.isEditing = true;
  }

  cancelEdit(track: EditTracks) {
    track.isEditing = false;
  }

  saveTrack(track: EditTracks) {
   this.trackService.editTrack(track).then(() => {
    track.isEditing = false;

    // Принудительно триггерим обновление: новая ссылка на массив
    this.tracks = [...this.tracks];
  });
  }
}
