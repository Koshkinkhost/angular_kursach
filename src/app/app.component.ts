import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ServicesComponent } from './components/services/services.component';
import { RouterModule,Routes } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { HomeComponent } from './components/home/home.component';
import {routes} from './app.routes'
import { CarouselComponent } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,MainSectionComponent,ServicesComponent, RouterLink, RouterLinkActive,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project_courses';
  
}
