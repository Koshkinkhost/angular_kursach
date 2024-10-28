import { Component,Input } from '@angular/core';
import { DescriptionService } from './description.service';
import { Product } from '../services/Product';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [HeaderComponent],
  providers:[DescriptionService],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  @Input() selectedProduct:Product|undefined={id:0,desc:'',image:'',price:0,text:''};
  products:Product[]=[{id:1,desc:"Аналитика",image:'/analytic.jpg',price:40000,text:'Аналитика в IT — это процесс сбора, обработки и интерпретации данных, связанных с информационными технологиями, для получения ценных инсайтов и поддержки принятия решений. В современном мире, где данные генерируются в огромных объемах, аналитика становится неотъемлемой частью успешного функционирования IT-систем и проектов.'},
    {id:2,desc:"Сопровождение",image:'/follow.jpg',price:30000,text:'Сопровождение в IT — это комплекс мероприятий, направленных на обеспечение стабильной и эффективной работы информационных систем после их внедрения. Это включает в себя техническую поддержку, обновление программного обеспечения, устранение ошибок и оптимизацию производительности. Сопровождение является неотъемлемой частью жизненного цикла любой IT-системы и играет ключевую роль в обеспечении ее долгосрочного успеха.'},
    {id:3,desc:"Консультация",image:'/consult.png',price:50000,text:'Консультация в IT — это процесс предоставления профессиональных рекомендаций и советов по вопросам информационных технологий. Это может включать в себя анализ потребностей бизнеса, оценку существующих IT-систем, разработку стратегий внедрения новых технологий и многое другое. Консультация в IT играет ключевую роль в обеспечении того, чтобы IT-решения соответствовали бизнес-целям и эффективно решали поставленные задачи.'}
  ]
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    // Получение id из URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Поиск продукта по id
    this.selectedProduct = this.products.find(p => p.id === id);
  }
}
