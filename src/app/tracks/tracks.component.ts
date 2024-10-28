import { Component, Input } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.css'
})
export class TracksComponent {
  constructor(private youtube:YoutubeService){

  }
  @Input() name!:string;
  yt_results:string[]=[];
async ngOnInit(){
  try {
    const data = await this.youtube.getName(this.name);
    if (data.items) {
      data.items.forEach((element: { id: any }) => { // Исправлено указание типа
        console.log(element.id.videoId);
        this.yt_results.push(element.id.videoId)
      });
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
  this.yt_results.forEach(element => {
    console.log(this.youtube.getStatistics(element));

  });
 
}

}

