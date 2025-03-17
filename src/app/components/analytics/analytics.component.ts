import { Component, Input } from '@angular/core';
import { RegistrationService } from '../../registration/RegistrationService';
import { Router } from '@angular/router';
import { LastFmService } from '../../last-fm.service';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  standalone:true,
})
export class AnalyticsComponent {
    constructor(private registr:RegistrationService,private router:Router,private lastFm:LastFmService){}
    async ngOnInit(){
        const isAuthenticated =  this.registr.GetAuthState();
        if (isAuthenticated) {
      console.log("в системе")
      this.TopFans();
        }
        else{
          this.router.navigate(['/login'])
        }
    }
  // Логика компонента
 async TopFans(){
  const result=await this.lastFm.Get_Similar_Artists(this.registr.artist_name);
  console.log("имя артиста ",this.registr.artist_name);
  console.log("аналитика ",result);
 }
}