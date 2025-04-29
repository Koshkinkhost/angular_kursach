import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule } from '@angular/forms';
import { TracksService } from '../top-tracks-main/tracks.service'; // Импортируем сервис
import { EditTracks } from '../../all-tracks/EditTracks'; // Импортируем интерфейс
import {ReactiveFormsModule} from '@angular/forms'; // Импортируем модуль для работы с формами
@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule], // Импортируем модуль для работы с формами
  providers: [],
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent {
  selectedContentType: 'track' | 'album' = 'track'; // Тип добавляемого контента
  trackForm: FormGroup;
  albumForm: FormGroup;
  genres: string[] = ['Pop', 'Rock', 'Hip-Hop', 'Blues', 'Classical', 'Electronic'];
  selectedFile: File | null = null; // Переменная для хранения выбранного файла

  constructor(private fb: FormBuilder, private tracksService: TracksService) {
    // Форма для добавления трека
    this.trackForm = this.fb.group({
      title: ['', Validators.required],
      genreTrack: ['', Validators.required], // Переименовано из genre_track
    });

    // Форма для добавления альбома
    this.albumForm = this.fb.group({
      Name: ['', Validators.required], // Название альбома
      releaseDate: ['', Validators.required], // Дата выпуска
      tracks: this.fb.array([]), // Массив для треков
    });
  }

  // Получаем массив треков из формы альбома
  get tracksFormArray() {
    return this.albumForm.get('tracks') as FormArray;
  }

  // Метод для обработки выбора файла
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Сохраняем выбранный файл
      console.log('Выбранный файл:', this.selectedFile);
    }
  }

  // Добавляем новое поле для трека
  addTrackField() {
    const trackGroup = this.fb.group({
      title: ['', Validators.required],
      genreTrack: ['', Validators.required], // Переименовано из genre_track
    });
    this.tracksFormArray.push(trackGroup);
  }

  // Метод для добавления трека
  async addTrack() {
    console.log(this.trackForm.value);
    if (this.trackForm.invalid || !this.selectedFile) {
      alert('Пожалуйста, заполните все поля и выберите аудиофайл.');
      return;
    }

    // Создаем объект, соответствующий интерфейсу EditTracks
    const newTrack: EditTracks = {
      ArtistId: Number(this.tracksService.selected_artist.id), // ID артиста
      trackId: null, // ID трека (неизвестен при создании)
      title: this.trackForm.value.title, // Название трека
      trackArtist: this.tracksService.selected_artist.name, // Имя артиста
      genreTrack: this.trackForm.value.genreTrack, // Жанр трека
      AlbumId: null, // ID альбома (неизвестен при создании)
      listenersCount: 0, // По умолчанию 0 прослушиваний
      isEditing: false, // Флаг редактирования (по умолчанию false)
    };

    try {
      // Вызываем метод сервиса для добавления трека с файлом
      const result = await this.tracksService.AddTrack(newTrack, this.selectedFile);
      console.log('Трек успешно добавлен:', result);
      alert('Трек успешно добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении трека:', error);
      alert('Произошла ошибка при добавлении трека.');
    }
  }

  // Метод для добавления альбома
  async addAlbum() {
    if (this.albumForm.invalid) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    // Создаем данные альбома
    const albumData = {
      ArtistId: Number(this.tracksService.selected_artist.id),
      Name: this.albumForm.value.Name, // Название альбома
      releaseDate: this.albumForm.value.releaseDate, // Дата выпуска
      tracks: this.albumForm.value.tracks.map((track: any) => ({
        ArtistId: Number(this.tracksService.selected_artist.id),
        title: track.title, // Название трека
        Genre_track: track.genreTrack, // Жанр трека
        Listeners_count: 0, // По умолчанию 0 прослушиваний
      })),
    };

    try {
      const result = await this.tracksService.AddAlbumWithTracks(albumData);
      console.log('Альбом успешно добавлен:', result);
      alert('Альбом успешно добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении альбома:', error);
      alert('Произошла ошибка при добавлении альбома.');
    }
  }
}