import { Component } from '@angular/core';
import { StrokaComponent } from '../../stroka/stroka.component';
import { MainSectionComponent } from '../main-section/main-section.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSectionComponent,StrokaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
