import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.css'
})
export class TracksComponent {
  
  @Input() name!:string;
  yt_results:string[]=[];
async ngOnInit(){
  
}

}

