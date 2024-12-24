import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../Artist';
import { LastFmService } from '../../last-fm.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() artist!: Artist;
  photo: string = "";
  images: { name: string, url: string }[] = [];
  selected?: string = "";

  constructor(private fm: LastFmService) {}

  async ngOnInit() {
    const cachedImages = localStorage.getItem("artistImages");
    if (cachedImages) {
      this.images = JSON.parse(cachedImages);
     
    }

    const cachedImage = this.images.find(u => u.name === this.artist.name);
    if (cachedImage) {
      this.selected = cachedImage.url;
      console.log("Изображение загружено из кеша");
    } else {
      try {
        const data = await this.fm.find_photo(this.artist.name);
        this.photo = data.items[0].link;
        this.selected = this.photo;
        this.images.push({ name: this.artist.name, url: this.selected });
        localStorage.setItem("artistImages", JSON.stringify(this.images));
        console.log("Изображение загружено и сохранено в кеш");
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
      }
    }

    console.log(`Количество артистов в кеше: ${this.images.length}`);
  }
}