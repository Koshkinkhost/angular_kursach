import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-filial',
  standalone: true,
  imports: [],
  templateUrl: './filial.component.html',
  styleUrl: './filial.component.css'
})
export class FilialComponent {
  private geocoderUrl = 'https://geocode-maps.yandex.ru/1.x/';
  private staticApiUrl = 'https://static-maps.yandex.ru/1.x/';
  private key: string = '1ad87012-0d6f-4c6a-b023-1f5159b8fc5b';
  public source:string='';
  @Input() title!:string;
  @Input() phone_num!:string;
  @Input() email!:string;
  @Input() street!:string;
  @Input() build!:string;

  public visible:boolean=false;
  public info:string='На карте'
  async getLocation() {
    try {
      const response = await fetch(
        `${this.geocoderUrl}?apikey=${this.key}&geocode=${encodeURIComponent(this.street + ',' + this.build)}&format=json`
      );
  
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
  
      // Извлекаем координаты из ответа
      const geoObjects = data.response.GeoObjectCollection.featureMember;
      if (geoObjects.length > 0) {
        const coordinates = geoObjects[0].GeoObject.Point.pos.split(' ').reverse(); // "долгота, широта"
        const [latitude, longitude] = coordinates;
  
        // Создаем URL для статической карты
        const mapUrl = `${this.staticApiUrl}?ll=${longitude},${latitude}&size=450,450&z=16&l=map&pt=${longitude},${latitude},pm2rdm`;
        console.log('URL статической карты:', mapUrl);
  
        this.source = mapUrl;
        this.visible = !this.visible;
        this.info = this.visible ? 'Скрыть' : 'На карте';
      } else {
        console.error('Адрес не найден');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
  
}
