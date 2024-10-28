import { Component,Input } from '@angular/core';
import { DescriptionService } from './description.service';
import { Product } from '../services/Product';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
@Component({
  selector: 'app-description',
  standalone: true,
  imports: [HeaderComponent],
  providers:[DescriptionService],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  @Input() selectedProduct:Product|undefined={id:0,desc:'',image:'',price:0};
  products:Product[]=[{id:1,desc:"Аналитика",image:'/analytic.jpg',price:40000},
    {id:2,desc:"Сопровождение",image:'/follow.jpg',price:30000},
    {id:3,desc:"Консультация",image:'/consult.png',price:50000}
  ]
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    // Получение id из URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Поиск продукта по id
    this.selectedProduct = this.products.find(p => p.id === id);
  }
}
