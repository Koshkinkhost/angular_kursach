import { Component, ChangeDetectorRef } from '@angular/core';
import { CarouselService } from '../carousel.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  standalone: true,
  providers: [CarouselService],
  imports: [CarouselModule], // Импортируем CarouselModule
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
 

  public slides: string[] = [
    "analytic.png",
    "consult.png",
    "image1.jpg",
    "image1.jpg",
    "image1.jpg"
  ];

  public currentSlide: number = 0;

  constructor(private carouselService: CarouselService, private cdr: ChangeDetectorRef) {}

 
}