import { Component } from '@angular/core';

@Component({
  selector: 'app-stroka',
  standalone: true,
  imports: [],
  templateUrl: './stroka.component.html',
  styleUrl: './stroka.component.css'
})
export class StrokaComponent {
  speed:number=20;
    items:string[]=[
      'Новый альбом от Arctic Monkeys уже в продаже!',
      'Слушай хиты дня на нашем сайте!',
      'Подпишись на нашу рассылку и получи эксклюзивный доступ к трекам.',
      'Готовься к музыкальному фестивалю года! Билеты уже в продаже.',
      'Открыта предзаказная продажа винилов от Lana Del Rey.',
      'Следи за обновлениями — новые треки каждый день!',
      'Поддержи своего любимого исполнителя: покупай мерч прямо сейчас!',
      'Новые хиты от Imagine Dragons и Coldplay на главной странице!',
      'Мы в TikTok: свежие музыкальные тренды ждут тебя!',
      'Эти выходные будут громкими! Концерты в твоем городе.'
    ];
}
