import { Component } from '@angular/core';
import { ProviderService } from '../components/account/provider.service';
import { RegistrationService } from '../registration/RegistrationService';
import { Router,RouterModule } from '@angular/router';
import { TracksService } from '../components/top-tracks-main/tracks.service';
@Component({
  selector: 'app-in-system',
  standalone: true,
  imports: [RouterModule],
templateUrl: './in-system.component.html',
  styleUrl: './in-system.component.css'
})
export class InSystemComponent {
  name:string|null=''
  royalty:Number=0;
constructor(public provide:ProviderService,private registr:RegistrationService,private router:Router,private tracksService:TracksService){}
async ngOnInit(){
  this.tracksService.artistName$.subscribe(name=>{
    this.name=name;
  })
  const money= await this.tracksService.GetMoney(Number(this.tracksService.selected_artist.id));
const data=await money.json();
  this.royalty=data;


 if(this.registr.GetAuthState()){
  this.router.navigate(['/ArtistTracks']);
 }
 
}
async logout() {
  console.log("нажал");

  await this.registr.LogOut(); // только очистка и запрос
console.log("РОЛЬ",this.registr.GetCurrentRole());
  const result = await this.registr.CheckAuthentication(); // тут точно вызовется

  console.log("CheckAuthentication: ", result);

  if (!result) {
    console.log("Выход выполнен");
    this.router.navigate(['/login']);
  } else {
    console.log("Не удалось выйти, остаёмся в системе");
  }
}




}
