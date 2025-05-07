import { Component } from '@angular/core';
import { RadioStationsService } from '../radio-stations/radio-stations.service';
import { RotationApplication } from '../radio-stations/RotationApplication';

@Component({
  selector: 'app-admin-rotations',
  standalone: true,
  imports: [],
  templateUrl: './admin-rotations.component.html',
  styleUrl: './admin-rotations.component.css'
})
export class AdminRotationsComponent {
  rotations:RotationApplication[]=[];
  constructor(private radios:RadioStationsService){}
async ngOnInit(){
const result=await this.radios.GetAllRotations();
console.log(result);
this.rotations = result;
console.log('массив ',this.rotations);
}
}

