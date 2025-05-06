import { Component } from '@angular/core';
import { RegistrationService } from '../registration/RegistrationService';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  constructor(private registr:RegistrationService,private router:Router){}
  async logout() {
    console.log("нажал");
  
    await this.registr.LogOut(); // только очистка и запрос
  
    const result = await this.registr.CheckAuthentication(); // тут точно вызовется
    localStorage.clear();
    
    console.log("CheckAuthentication: ", result);
  
    if (!result) {
      console.log("Выход выполнен");
      this.router.navigate(['/login']);
    } else {
      console.log("Не удалось выйти, остаёмся в системе");
    }
  }
  toggleInput(artist: any) {
    artist.showInput = !artist.showInput;
    if (!artist.newRoyalty) {
      artist.newRoyalty = 0;
    }
  }
  

}
