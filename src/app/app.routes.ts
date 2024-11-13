import { Routes } from '@angular/router';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';

import { DescriptionComponent } from './components/description/description.component';
import { FilialsComponent } from './components/filials/filials.component';
import { AccountComponent } from './components/account/account.component';
import { NewsComponent } from './news/news.component';
export const routes: Routes = [
  {path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'filials', component: FilialsComponent },
  { path: 'desc/:id', component: DescriptionComponent },
  {path:"account",component:AccountComponent},
  {
    path:"news",component:NewsComponent
  }
  // Для обработки неизвестных маршрутов
];
