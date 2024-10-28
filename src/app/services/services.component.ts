import { Component, input, Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../components/card/card.component';
import { DescriptionService } from '../components/description/description.service';
import { Product } from '../components/services/Product';
import { EventDispatcher } from '@angular/core/primitives/event-dispatch';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLinkActive,RouterLink,CardComponent,ModalComponent],
templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
  
})
export class ServicesComponent {
  isModalOpen = true;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  @Output() button_clicked=new EventEmitter<Product>();
  products:Product[]=[{id:1,desc:"Аналитика",image:'/analytic.jpg',price:40000,text:'Аналитика в IT — это процесс сбора, обработки и интерпретации данных, связанных с информационными технологиями, для получения ценных инсайтов и поддержки принятия решений. В современном мире, где данные генерируются в огромных объемах, аналитика становится неотъемлемой частью успешного функционирования IT-систем и проектов.'},
    {id:2,desc:"Сопровождение",image:'/follow.jpg',price:30000,text:'Сопровождение в IT — это комплекс мероприятий, направленных на обеспечение стабильной и эффективной работы информационных систем после их внедрения. Это включает в себя техническую поддержку, обновление программного обеспечения, устранение ошибок и оптимизацию производительности. Сопровождение является неотъемлемой частью жизненного цикла любой IT-системы и играет ключевую роль в обеспечении ее долгосрочного успеха.'},
    {id:3,desc:"Консультация",image:'/consult.png',price:50000,text:'Консультация в IT — это процесс предоставления профессиональных рекомендаций и советов по вопросам информационных технологий. Это может включать в себя анализ потребностей бизнеса, оценку существующих IT-систем, разработку стратегий внедрения новых технологий и многое другое. Консультация в IT играет ключевую роль в обеспечении того, чтобы IT-решения соответствовали бизнес-целям и эффективно решали поставленные задачи.'}
  ]
 
 constructor(private route:Router){}


 show_product(product:Product){
  this.route.navigate(['/desc',product.id])
 }



}
