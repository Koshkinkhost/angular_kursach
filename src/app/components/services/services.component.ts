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

@Component({
  selector: 'app-services',
  standalone: true,

  imports: [CommonModule,RouterOutlet,RouterLinkActive,RouterLink,CardComponent,ModalComponent],
templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
  
})
export class ServicesComponent {
  isModalOpen = true;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  @Output() button_clicked=new EventEmitter<Artist>();
  
 artists:Artist[]=[];
 constructor(private route:Router,private last:LastFmService){
  this.artists=this.last.artists;
 }
 


 show_product(artist:Artist){
  this.route.navigate(['/desc',artist.id])
 }



}
