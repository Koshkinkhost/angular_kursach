import { Component, Input } from '@angular/core';
import { Artist } from '../Artist';
import { LastFmService } from '../../last-fm.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() artist!: Artist;
  photo: string = "";
  images: { name: string, url: string }[] = []
  selected?: string = ""
  access_key: string = "gRZ2pWZY-MFYQ1tUVnG_Gb7u4ZnabITvRj6jPf7OVuI"
  url: string = `https://api.unsplash.com/search/photos?query=Noize MC`
  constructor(private fm: LastFmService) {

  }
  async ngOnInit() {
    const caucheImages = localStorage.getItem("artistImages");
    if (caucheImages) {
      this.images = JSON.parse(caucheImages)
      const d = this.images.find(u => u.name === this.artist.name)
      if (!d) {
        const data = await this.fm.find_photo(this.artist.name);
        this.photo = data.items[0].link;
        this.selected = this.photo;
        this.images.push({ name: this.artist.name, url: this.selected })
        localStorage.setItem("artistImages", JSON.stringify(this.images))


      }
      else {
        const caucheImages = localStorage.getItem("artistImages");
        const cachedImage = this.images.find(u => u.name === this.artist.name);
        this.selected = cachedImage?.url;
      }
      console.log(this.images.length + "артисты");







    }







  }
}
