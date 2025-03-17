import { Component } from '@angular/core';
import { LastFmService } from '../last-fm.service';
import { RegistrationService } from '../registration/RegistrationService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-similar-artists',
  standalone: true,
  imports: [],
  templateUrl: './similar-artists.component.html',
  styleUrl: './similar-artists.component.css'
})
export class SimilarArtistsComponent {
  similar_artists: { name: string; match: string; url: string }[] = [];
  constructor(private lastfm:LastFmService,private registr:RegistrationService,private router:Router){}
  async ngOnInit(){
    const isAuthenticated =  this.registr.GetAuthState();
    if (isAuthenticated) {
  console.log("в системе")
  const data=await this.Similar();
  console.log(data)
  for(let i=0;i<10;i++){
    this.similar_artists.push({name:data.similarartists.artist[i].name,match:data.similarartists.artist[i].match,url:data.similarartists.artist[i].url})
    console.log(data.similarartists.artist[i].name)
  }
  console.log(this.similar_artists)
  
    }
    else{
      this.router.navigate(['/login'])
    }
}
// Логика компонента
async Similar(){
 const artist_name=this.lastfm.GetUserName();
 if(artist_name){
  const result=await this.lastfm.Get_Similar_Artists(artist_name);
  return result;
 }


}
}
