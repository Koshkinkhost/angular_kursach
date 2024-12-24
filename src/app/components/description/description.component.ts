import { Component,Input } from '@angular/core';
import { DescriptionService } from './description.service';

import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LastFmService } from '../../last-fm.service';
import { Artist } from '../Artist';
@Component({
  selector: 'app-description',
  standalone: true,
  imports: [HeaderComponent],
  providers:[DescriptionService],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  @Input() selectedArtist:Artist|undefined={id:'',
    name:'',
    listeners:'',
    playCount:'',
    similar:[],
    registr_date:''};
    images: { name: string, url: string }[] = [];
    artist_photo:string='';
    description:string='';
  constructor(private route: ActivatedRoute,private last:LastFmService) {}
  async ngOnInit() {
    // Получение id из URL
    const id = (this.route.snapshot.paramMap.get('id'));
    // Поиск продукта по id
    this.selectedArtist = this.last.artists.find(p => p.id === id);
    const artists=localStorage.getItem('artistImages');
    if(artists){
       this.images = JSON.parse(artists);
    }
    const artist=this.images.find(u=>u.name==this.selectedArtist?.name);
    
    if(artist){
      const data=await this.last.find_artist(artist?.name)
      const text=data.artist.bio.summary
      this.description = text.replace(/<[^>]+>/g, '');
      console.log(data.artist.bio.summary);
      this.artist_photo=artist?.url;
    }
    
  }
}
