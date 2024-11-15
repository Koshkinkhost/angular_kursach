import { Component, Input } from '@angular/core';

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

  public visible: boolean = false;
  public info: string = 'На карте';

  async getLocation() {
    // Сбрасываем сообщения об ошибках
    this.errorMessage = '';
    this.loading = true;

    try {
      // Формируем запрос к геокодеру
      const response = await fetch(
        `${this.geocoderUrl}?apikey=${this.key}&geocode=${encodeURIComponent(this.street + ',' + this.build)}&format=json`
      );

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Геокодирование:', data);

      // Проверяем наличие геообъектов
      const geoObjects = data.response.GeoObjectCollection.featureMember;
      if (geoObjects.length === 0) {
        throw new Error('Адрес не найден');
      }

      // Извлекаем координаты
      const coordinates = geoObjects[0].GeoObject.Point.pos.split(' ').reverse();
      const [latitude, longitude] = coordinates;

      // Формируем URL статической карты
      const mapUrl = `${this.staticApiUrl}?ll=${longitude},${latitude}&size=450,450&z=16&l=map&pt=${longitude},${latitude},pm2rdm&apikey=${this.key}`;
      console.log('URL статической карты:', mapUrl);

      this.source = mapUrl;
      this.visible = true;
      this.info = 'Скрыть';
    } catch (error: any) {
      // Обработка ошибок
      console.error('Ошибка при получении данных:', error.message || error);
      this.errorMessage = error.message || 'Неизвестная ошибка';
    } finally {
      this.loading = false;
    }
  }

  toggleMap() {
    // Переключение видимости карты
    this.visible = !this.visible;
    this.info = this.visible ? 'Скрыть' : 'На карте';
  }
}
