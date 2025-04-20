import { Component, input, Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';

import { Artist } from '../Artist';
import { EventDispatcher } from '@angular/core/primitives/event-dispatch';
import { ModalComponent } from '../modal/modal.component';
import { LastFmService } from '../../last-fm.service';
import { ArtistsService } from './artists.service';

@Component({
  selector: 'app-services',
  standalone: true,

  imports: [CommonModule,RouterOutlet,RouterLinkActive,RouterLink,CardComponent,ModalComponent],
templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
  
})
export class ServicesComponent {
  isModalOpen = true;
  artists: any[] = [];
  
  @Output() button_clicked=new EventEmitter<Artist>();
  
 
 key:string="gRZ2pWZY-MFYQ1tUVnG_Gb7u4ZnabITvRj6jPf7OVuI";

 constructor(private route:Router,private last:LastFmService,private artistsService:ArtistsService){
  this.artists=this.last.artists;
 }
 query:string="Noize MC фото"

 


 show_product(artist:Artist){
  console.log("АЙДИ АРТИСТА "+artist.id);
this.artistsService.artis_id=Number(artist.id);
  this.route.navigate(['/desc',artist.id])
 }
 ngOnInit() {
  this.artistsService.getAllArtists()
    .then((result: any[]) => {
      console.log("Артисты с бэка:", result);
      this.artists = result;
    })
}




}
