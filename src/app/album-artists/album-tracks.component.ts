import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-album-tracks',
  standalone: true,
  imports: [],
  templateUrl: './album-tracks.component.html',
  styleUrl: './album-tracks.component.css'
})
export class AlbumTracksComponent {
  constructor(private route: ActivatedRoute) {}

  albumId!:number;
  ngOnInit() {
    // Получаем параметр albumId из параметров маршрута
    this.route.paramMap.subscribe(params => {
      this.albumId = +params.get('albumId')!;  // Преобразуем в число
      console.log(this.albumId);  // Проверяем вывод
    });
  }
}
