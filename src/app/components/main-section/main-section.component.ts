import { Component } from '@angular/core';
import { StrokaComponent } from '../../stroka/stroka.component';
@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [StrokaComponent],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css'
})
export class MainSectionComponent {

}
