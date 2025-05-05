import { Component,OnInit } from '@angular/core';
import { RadioStationsService } from './radio-stations.service';
import { RadioStation } from './RadioStation';

@Component({
  selector: 'app-radio-stations',
  standalone: true,
  imports: [],
  templateUrl: './radio-stations.component.html',
  styleUrl: './radio-stations.component.css'
})
export class RadioStationsComponent {
  radioSt?:RadioStation[]=[];
  constructor(private radio:RadioStationsService){}
async ngOnInit(){
  this.radio.radioStation$.subscribe((tracks: RadioStation[]|null) => {
    this.radioSt = tracks ?? []// Обновляем локальное состояние
  });
  console.log("Радиостанции",this.radioSt);
  const result=await this.radio.GetAllRadioStations();
  console.log(result);
}

  addRadioStation(): void {
    
}
}
