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
  
  constructor(private route: ActivatedRoute,private last:LastFmService) {}
  ngOnInit(): void {
    // Получение id из URL
    const id = (this.route.snapshot.paramMap.get('id'));
    // Поиск продукта по id
    this.selectedArtist = this.last.artists.find(p => p.id === id);
  }
}
