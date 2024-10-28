import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css'
})
export class MainSectionComponent {

}
