import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from '../components/top-tracks-main/tracks.service';
import { Track } from '../components/top-tracks-main/TopTrack';
@Component({
  selector: 'app-album-tracks',
  standalone: true,
  imports: [],
  templateUrl: './album-tracks.component.html',
  styleUrl: './album-tracks.component.css'
})
export class AlbumTracksComponent {
  constructor(private route: ActivatedRoute,private tracks:TracksService) {}
tracks_album:Track[]=[];
  albumId!:number;
  async ngOnInit() {
    // Получаем параметр albumId из параметров маршрута
    this.route.paramMap.subscribe(params => {
      this.albumId = +params.get('albumId')!;  // Преобразуем в число
      console.log(this.albumId);  // Проверяем вывод
    });
    const result=await this.tracks.GetALbumTracks(this.albumId);
    const data=await result.json();
    this.tracks_album=data;
    console.log(data);
console.log(this.tracks_album);
  }
}
