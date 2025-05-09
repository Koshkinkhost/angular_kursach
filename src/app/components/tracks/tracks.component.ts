import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule } from '@angular/forms';
import { TracksService } from '../top-tracks-main/tracks.service'; // Импортируем сервис
import { EditTracks } from '../../all-tracks/EditTracks'; // Импортируем интерфейс
import {ReactiveFormsModule} from '@angular/forms'; // Импортируем модуль для работы с формами
import { Router } from '@angular/router';
import { Track } from '../top-tracks-main/TopTrack';
  import { RegistrationService } from '../../registration/RegistrationService';
import { Artist } from '../Artist';
@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule], // Импортируем модуль для работы с формами
  providers: [],
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent {
  albumTrackFiles: File[] = [];

  selectedContentType: 'track' | 'album' = 'track'; // Тип добавляемого контента
  trackForm: FormGroup;
  tracks:EditTracks[]=[];
  selected_artist:Artist={id:'',name:''};
  albumForm: FormGroup;
  genres: string[] = ['Pop', 'Rock', 'Hip-Hop', 'Blues', 'Classical', 'Electronic'];
  selectedFile: File | null = null; // Переменная для хранения выбранного файла
  mapToTrack(data: any): Track {
    return {
      id:Number(data.trackId),
      title: data.title,
      trackArtist: data.track_Artist,
      genreTrack: data.genre_track,
      listenersCount: Number(data.listeners_count)
    };
  }
  constructor(private fb: FormBuilder, private tracksService: TracksService,private router:Router,private registr:RegistrationService) {
    
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

  async ngOnInit(){
    this.tracksService.tracks$.subscribe((tracks: EditTracks[]) => {
      this.tracks = tracks; // Обновляем локальное состояние
    });
    this.tracksService.selectedArtist$.subscribe((artist: Artist | null) => {
      if (artist) {
        this.selected_artist = artist;
      }
    });
    console.log("айди артиста",Number(this.selected_artist.id));
    const isAuthenticated =  await this.registr.CheckAuthentication();
    // const role_check=await this.registr.Check_Roles();
    // console.log(role_check);//проверка РОЛИ
  
    const storage_name=localStorage.getItem('username');
    if (isAuthenticated && storage_name) {
     
      const data=await this.tracksService.GetArtistTracks(Number(this.selected_artist.id));
  this.tracks=data.tracks.map(this.mapToTrack);
    console.log(data);
    
  
  
      // Вы можете также получить данные пользователя, например:
       // Подгрузите реальное имя с сервера, если требуется
    } else {
        this.router.navigate(['/login']);
    }
  
   
    
   
  
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
      ArtistId: Number(this.selected_artist.id), // ID артиста
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
    console.log(this.albumTrackFiles);
console.log(this.albumForm.value.tracks.length);

    // Проверка формы и файлов
    if (this.albumForm.invalid ) {
      alert('Пожалуйста, заполните все поля и прикрепите аудиофайлы для всех треков.');
      return;
    }
  
    const formData = new FormData();
  
    // Добавляем данные альбома
    formData.append('Name', this.albumForm.value.Name);
    formData.append('releaseDate', this.albumForm.value.releaseDate);
    formData.append('ArtistId', this.selected_artist.id.toString());
  
    // Добавляем данные для каждого трека
    this.albumForm.value.tracks.forEach((track: any, index: number) => {
      formData.append(`tracks[${index}].title`, track.title);
      formData.append(`tracks[${index}].genreTrack`, track.genreTrack);
      formData.append(`tracks[${index}].file`, this.albumTrackFiles[index]); // Прикрепляем файлы
    });
  
    try {

      const result = await this.tracksService.AddAlbumWithTracks(formData); // Вызов метода для добавления альбома
      console.log('Альбом успешно добавлен:', result);
      alert('Альбом успешно добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении альбома:', error);
      alert('Произошла ошибка при добавлении альбома.');
    }
  }
  onTrackFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.albumTrackFiles[index] = input.files[0]; // Сохраняем файл для этого трека
      console.log('Выбранный файл для трека:', this.albumTrackFiles[index]);
    }
  }
  
  
}