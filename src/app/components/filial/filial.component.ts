import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-filial',
  standalone: true,
  imports: [],
  templateUrl: './filial.component.html',
  styleUrls: ['./filial.component.css']
})
export class FilialComponent {
  private geocoderUrl = 'https://geocode-maps.yandex.ru/1.x/';
  private staticApiUrl = 'https://static-maps.yandex.ru/1.x/';
  private key: string = '9908684a-05be-4481-95a6-ef734e869561'; // Замените на ваш API-ключ
  public source: string = '';
  public errorMessage: string = '';
  public loading: boolean = false;

  @Input() title!: string;
  @Input() phone_num!: string;
  @Input() email!: string;
  @Input() street!: string;
  @Input() build!: string;
  @Input() lat!:string;
  @Input() long!:string;
  @Input() city!:string;

  public visible: boolean = false;
  public info: string = 'На карте';

  getStaticMapUrl(): void {
    console.log("зашел!!!!");
  
    // Координаты для Арбат, 13
    
  
    const baseUrl = 'https://static-maps.yandex.ru/1.x/';
    const data = `${baseUrl}?ll=${this.long},${this.lat}&z=17&size=600,400&l=map&pt=${this.long},${this.lat},pm2rdm&apikey=${this.key}`;
  
    this.source = data;
    this.visible = !this.visible;
    this.info = this.visible ? 'Скрыть' : 'На карте';
    console.log(this.source);
  }
  
  

  toggleMap() {
    // Переключение видимости карты
  
  }
}
