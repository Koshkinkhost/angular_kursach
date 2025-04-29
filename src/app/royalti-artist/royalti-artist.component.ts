import { Component } from '@angular/core';
import { TracksService } from '../components/top-tracks-main/tracks.service';
@Component({
  selector: 'app-royalti-artist',
  standalone: true,
  imports: [],
  templateUrl: './royalti-artist.component.html',
  styleUrl: './royalti-artist.component.css'
})

export class RoyaltiArtistComponent {
  constructor(private tracksService:TracksService){}
  earningsByTrack: { [trackName: string]: number } = {};
  earningsArray: { title: string; total: number }[] = [];

  async ngOnInit() {
    const artistId = Number(this.tracksService.getSelectedArtist()?.id) // Заменить на реальный ID артиста (можно получить динамически)
      this.earningsByTrack = await this.tracksService.getTrackEarningsByArtistId(Number(artistId));
    console.log(this.earningsByTrack);
    this.earningsArray = Object.entries(this.earningsByTrack).map(
      ([title, total]: [string, number]) => ({ title, total })
    );
    
  }
}
