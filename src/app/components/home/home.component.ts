import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { MainSectionComponent } from '../main-section/main-section.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent,MainSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
