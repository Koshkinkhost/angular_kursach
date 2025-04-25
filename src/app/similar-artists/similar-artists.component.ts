import { Component, Input } from '@angular/core';
import { LastFmService } from '../last-fm.service';
import { RegistrationService } from '../registration/RegistrationService';
import { Router } from '@angular/router';
import { TracksService } from '../components/top-tracks-main/tracks.service';
@Component({
  selector: 'app-similar-artists',
  standalone: true,
  imports: [],
  templateUrl: './similar-artists.component.html',
  styleUrl: './similar-artists.component.css'
})
export class SimilarArtistsComponent {
  
  name:string|null='';
  similar_artists: { name: string; match: string; url: string }[] = [];
  constructor(private lastfm:LastFmService,private registr:RegistrationService,private router:Router,private tracksService:TracksService ){}
  async ngOnInit(){
    this.tracksService.artistName$.subscribe((name:string|null)=>{
      this.name=name;
    })
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
 
 const artist_name=this.name;
 if(artist_name){
  const result=await this.lastfm.Get_Similar_Artists(artist_name);
  return result;
 }


}
}
