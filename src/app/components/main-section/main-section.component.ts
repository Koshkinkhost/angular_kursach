import { Component,OnInit } from '@angular/core';
import { StrokaComponent } from '../stroka/stroka.component';
import { LastFmService } from '../../last-fm.service';
import { TopTracksMainComponent } from '../top-tracks-main/top-tracks-main.component';
@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [StrokaComponent,TopTracksMainComponent],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css'
})
export class MainSectionComponent {

}
