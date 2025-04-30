import { Component, OnInit } from '@angular/core';
import { Track } from '../components/top-tracks-main/TopTrack';
import { TracksService } from '../components/top-tracks-main/tracks.service';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RegistrationService } from '../registration/RegistrationService';
import { EditTracks } from './EditTracks';
import { API_URLS } from '../../../constants';
@Component({
  selector: 'app-all-tracks',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './all-tracks.component.html',
  styleUrls: ['./all-tracks.component.css']
})
export class AllTracksComponent implements OnInit {
  genres: string[] = ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic', 'Blues'];

  searchControl = new FormControl('');
  IsAdmin: boolean = false;
  IsEditing: boolean = false;
  tracks: EditTracks[] = [];
  find_tracks: EditTracks[] = [];
base_url:string="http://localhost:8082/api/v2";
  constructor(private trackService: TracksService, private registr: RegistrationService) {}
  isBase64(str: string): boolean {
    return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(str);
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
    console.log(track.trackId);
    // Здесь можно вызывать service для сохранения в БД
    console.log("Сохраняем трек:", track);
    this.trackService.editTrack(track).then(updatedTracks => {
      this.tracks = updatedTracks; // Обновляем список треков в компоненте
      track.isEditing = false;
    });
  }
}
