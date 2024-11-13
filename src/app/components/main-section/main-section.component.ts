import { Component,OnInit } from '@angular/core';
import { StrokaComponent } from '../stroka/stroka.component';
import { LastFmService } from '../../last-fm.service';
@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [StrokaComponent],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css'
})
export class MainSectionComponent {
constructor (private LastFm:LastFmService ){}
async ngOnInit(){
  console.log(this.LastFm.TopChart());
}
}
