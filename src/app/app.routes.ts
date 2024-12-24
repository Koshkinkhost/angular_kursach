import { Routes } from '@angular/router';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';

import { DescriptionComponent } from './components/description/description.component';
import { FilialsComponent } from './components/filials/filials.component';
import { AccountComponent } from './components/account/account.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ArtistBioComponent } from './artist-bio/artist-bio.component';
import { TracksComponent } from './components/tracks/tracks.component';
export const routes: Routes = [
  {path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'filials', component: FilialsComponent },
  { path: 'desc/:id', component: DescriptionComponent },
  {
    path:"account",
    component:AccountComponent,
    children:[
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'artist-bio', component: ArtistBioComponent },
      { path: 'tracks', component: TracksComponent },
    ]
  },
  {
    path:"news",component:NewsComponent
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' }
  // Для обработки неизвестных маршрутов
];
