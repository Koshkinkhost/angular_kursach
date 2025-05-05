import { Component } from '@angular/core';
import { RadioStationsService } from '../radio-stations/radio-stations.service';
import { TracksService } from '../components/top-tracks-main/tracks.service';

@Component({
  selector: 'app-user-rotations',
  standalone: true,
  imports: [],
  templateUrl: './user-rotations.component.html',
  styleUrl: './user-rotations.component.css'
})
export class UserRotationsComponent {
  rotations: any[] = []; // Массив для хранения данных о ротациях

  constructor(
    private radio: RadioStationsService,
    private tracks: TracksService
  ) {}

  async ngOnInit() {
    try {
      // Получаем ID выбранного артиста и запрашиваем данные о ротациях
      const artistId = Number(this.tracks.getSelectedArtist()?.id);
      const result = await this.radio.GetAllRotationApplications(artistId);

      // Сохраняем результат в массив rotations
      if (result && Array.isArray(result)) {
        this.rotations = result;
      } else {
        console.error('Invalid data received from the server:', result);
      }
    } catch (error) {
      console.error('Error fetching rotation applications:', error);
    }
  }
}