import { Component } from '@angular/core';

@Component({
  selector: 'app-radio-stations',
  standalone: true,
  imports: [],
  templateUrl: './radio-stations.component.html',
  styleUrl: './radio-stations.component.css'
})
export class RadioStationsComponent {


  addRadioStation(): void {
    if (this.form.invalid) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }
}
}
