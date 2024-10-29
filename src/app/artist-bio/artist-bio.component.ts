import { Component,Input } from '@angular/core';
import { LastFmService } from '../last-fm.service';

@Component({
  selector: 'app-artist-bio',
  standalone: true,
  imports: [],
  templateUrl: './artist-bio.component.html',
  styleUrl: './artist-bio.component.css'
})
export class ArtistBioComponent {
  constructor(private last:LastFmService){}
@Input() name!:string;
ngOnInit(){
this.last.find_artist(this.name);
}
}
