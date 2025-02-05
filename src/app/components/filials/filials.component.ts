import { Component,Renderer2,Input } from '@angular/core';
import { FilialComponent } from '../filial/filial.component';
import { RegistrationService } from '../../registration/RegistrationService';
@Component({
  selector: 'app-filials',
  standalone: true,
  imports: [FilialComponent],
  templateUrl: './filials.component.html',
  styleUrl: './filials.component.css'
})
export class FilialsComponent {
  constructor(public registr:RegistrationService){

  }
ngOnInit(){
  const storedRole = localStorage.getItem('userRole');
  if (storedRole !== null) {
    this.registr.user_role = storedRole;
  } 
}
 
 
}