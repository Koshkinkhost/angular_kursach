import { Component, ChangeDetectorRef } from '@angular/core';
import { StudiosService } from './studios.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Studio } from './Studios';
import { RegistrationService } from './../../registration/RegistrationService';

import { FilialComponent } from '../filial/filial.component';

@Component({
  selector: 'app-filials',
  standalone: true,
  imports: [ReactiveFormsModule,FilialComponent],
templateUrl: './filials.component.html',
  styleUrls: ['./filials.component.css']
})
export class FilialsComponent {
  st: Studio[] = []; // Список студий
  form_studio: FormGroup = new FormGroup({
    name: new FormControl(''),
    phone_num: new FormControl(''),
    long: new FormControl(''),
    lat: new FormControl(''),
    email: new FormControl(''),
    street: new FormControl(''),
    build: new FormControl(''),
    city: new FormControl('')
  });

  constructor(
    public studios: StudiosService,
    public registr:RegistrationService,
    private cdr: ChangeDetectorRef // Для явного обновления компонента
  ) {}

  // Инициализация компонента
  async ngOnInit() {
    console.log(this.registr.user_role,"qoienfon");
    await this.Get_Studios();
    this.studios.studios$.subscribe(data=>{
      this.st=data;
    })
    console.log('перезагрузился');
  }

  // Функция получения студий с сервера
  async Get_Studios() {
    const result = await this.studios.Get_Studios();
    // Заменяем массив, чтобы Angular видел изменения
    this.st = [...result]; 
    console.log('массив ', this.st);
    this.cdr.detectChanges(); // Принудительно обновляем компонент
  }

  // Функция добавления студии
  async Add_Studio() {
    const form_value = this.form_studio.getRawValue();
    console.log('добавлена студия');

    // Отправка данных на сервер
    await this.studios.Add_Studio(
      form_value.name,
      form_value.phone_num,
      form_value.email,
      form_value.street,
      form_value.build,
      form_value.long,
      form_value.lat,
      form_value.city
    );

    // После добавления студии, получаем обновленный список
    await this.Get_Studios(); // Получаем студии с сервера и обновляем UI
    console.log('Обновленные студии: ', this.st);
  }
}
