import { Component, OnInit } from '@angular/core';
import { NewsDetailsComponent } from '../news-details/news-details.component';
import { RegistrationService } from '../registration/RegistrationService';
import { NEWS_LIST,NewsItem } from './newsList';
import { FormsModule } from '@angular/forms'; // Добавляем FormsModule
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NewsDetailsComponent],
templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
constructor(public registr:RegistrationService){}
newsList: NewsItem[] = NEWS_LIST;
role:string='';
newNews: NewsItem = {
  title: '',
  description: '',
  imageUrl: '',
  link: '',
  date: new Date()
};
async ngOnInit(){
    
  const storedRole = localStorage.getItem('userRole');
  if (storedRole !== null) {
    this.role = storedRole;
  } 

    const news=await this.registr.GetNews();
    if(this.newsList.length<1){
      this.newsList.push(...news);
      console.log(news[0].imageUrl);
    }
    
    
}
addNews(){
  this.newsList.push(
    {
      title: 'Открыта предзаказная продажа винилов от Lana Del Rey.',
      description: 'Воспользуйся эксклюзивным предложением и закажи виниловые пластинки Lana Del Rey по специальной цене.',
      imageUrl: 'lana_del_rey.jpg',
      link: '/news/lana-del-rey-vinyl',
      date: new Date('2024-11-08')
    }
  )
}
}
