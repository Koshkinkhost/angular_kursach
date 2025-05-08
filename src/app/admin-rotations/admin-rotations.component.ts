import { Component } from '@angular/core';
import { RadioStationsService } from '../radio-stations/radio-stations.service';
import { RotationApplication } from '../radio-stations/RotationApplication';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-rotations',
  standalone: true,
  imports: [FormsModule],
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
updateStatus(r: RotationApplication) {
  this.radios.UpdateRotationStatus({
    applicationId: r.applicationId,
    newStatus: r.status
  }).catch((err:any) => {
    console.error('Ошибка при обновлении статуса:', err);
  });
}
}

