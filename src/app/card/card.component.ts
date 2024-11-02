import { Component,Input } from '@angular/core';
import { Artist } from '../components/Artist';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input() artist!:Artist;
}
