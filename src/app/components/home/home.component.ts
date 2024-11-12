import { Component } from '@angular/core';

import { MainSectionComponent } from '../main-section/main-section.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
