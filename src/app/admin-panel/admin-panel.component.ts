import { Component } from '@angular/core';
import { RegistrationService } from '../registration/RegistrationService';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  constructor(private registr:RegistrationService){}
  async logout(){
    console.log("нажал админ")
    
    await this.registr.LogOut();
   
    
  }
  

}
