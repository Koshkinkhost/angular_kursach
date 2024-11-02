import { Injectable } from '@angular/core';
import { Artist } from '../Artist';
@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
prod:Artist[]=[]
    constructor() { }
    getinfo(data:Artist[],id:string):Artist|undefined{ 
  
  const product=data.find(d=>d.id===id)
  console.log(product)
    return product;
    } 
    
}
