import { Injectable } from '@angular/core';
import { Product } from '../services/Product';
@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
prod:Product[]=[]
    constructor() { }
    getinfo(data:Product[],id:number):Product|undefined{ 
  
  const product=data.find(d=>d.id===id)
  console.log(product)
    return product;
    } 
    
}
