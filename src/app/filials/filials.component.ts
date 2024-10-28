import { Component } from '@angular/core';

@Component({
  selector: 'app-filials',
  standalone: true,
  imports: [],
  templateUrl: './filials.component.html',
  styleUrl: './filials.component.css'
})
export class FilialsComponent {
  private geocoderUrl = 'https://geocode-maps.yandex.ru/1.x/';
  private staticApiUrl = 'https://static-maps.yandex.ru/1.x/';
  private key: string = '74ff6712-3c2f-4384-8eaa-89e9b194ac6e';
  public source:string='';
  
  async getLocation() {
    try {
      const response = await fetch(`${this.geocoderUrl}?apikey=${this.key}&geocode=Рашпилевская,+256&format=json`);
      const data = await response.json();

      // Извлекаем координаты из ответа
      const geoObjects = data.response.GeoObjectCollection.featureMember;
      if (geoObjects.length > 0) {
        const coordinates = geoObjects[0].GeoObject.Point.pos.split(' ').reverse(); // Координаты в формате "долгота, широта"
        const [latitude, longitude] = coordinates;

        // Создаем URL для статической карты
        const mapUrl = `${this.staticApiUrl}?ll=${longitude},${latitude}&size=450,450&z=16&l=map&pt=${longitude},${latitude},pm2rdm`;
        console.log('URL статической карты:', mapUrl);

        // Отображаем карту на странице
        const mapImage = document.createElement('img');
        this.source = mapUrl;
       
      } else {
        console.error('Адрес не найден');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
}