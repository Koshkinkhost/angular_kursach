import { Component, OnInit } from '@angular/core';
import { Track } from './TopTrack';
import { TracksService } from './tracks.service';

@Component({
  selector: 'app-top-tracks-main',
  standalone: true,
  imports: [],
  templateUrl: './top-tracks-main.component.html',
  styleUrl: './top-tracks-main.component.css'
})
export class TopTracksMainComponent implements OnInit {
  trackList: Track[] = [];

  constructor(private tracksService: TracksService) {}

  mapToTrack(data: any): Track {
    return {
      title: data.title,
      trackArtist: data.track_Artist,
      genreTrack: data.genre_track,
      listenersCount: Number(data.listeners_count)
    };
  }

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.tracksService.getTopTracks(10);
      console.log("Топ треки:", data);
      this.trackList = data.map(this.mapToTrack);
    } catch (error) {
      console.error("Ошибка загрузки треков:", error);
    }
  }
}
