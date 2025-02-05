import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RegistrationService } from '../../registration/RegistrationService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive]
})
export class HeaderComponent {
  constructor(public registr:RegistrationService){
    
  }
  public visible:boolean=false;
  change(){
    this.visible=!this.visible
  }
}
