import { Injectable,OnInit } from '@angular/core';
import { Artist } from '../Artist';
import { TracksService } from '../top-tracks-main/tracks.service';
import { API_URLS } from '../../../../constants';
import { ArtistsService } from '../services/artists.service';
@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
prod:Artist[]=[]
    constructor(tracks:TracksService,artistsService:ArtistsService) { }
    getinfo(data:Artist[],id:string):Artist|undefined{ 
  
  const product=data.find(d=>d.id===id)
  console.log(product);
    return product;
    } 
   
    
}
