import { Component,Input } from '@angular/core';
import { Product } from './../services/Product';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input() service!:Product;
}
