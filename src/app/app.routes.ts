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
import {AnalyticsComponent} from './components/analytics/analytics.component'
import { InSystemComponent } from './in-system/in-system.component';
import { Component } from '@angular/core';
import { authGuard } from './auth.guard'; 
import { SimilarArtistsComponent } from './similar-artists/similar-artists.component';
import { SystemModule } from './system/system.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AllTracksComponent } from './all-tracks/all-tracks.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'filials', component: FilialsComponent },
  { path: 'desc/:id', component: DescriptionComponent },
  {
    path: 'system',
    loadChildren: () => import('./system/system.module').then(m => m.SystemModule)
  },
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ArtisTracks', component: TracksComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'artist-bio', component: ArtistBioComponent },
  { path: 'news', component: NewsComponent },
  {path:'adminka',component:AdminPanelComponent},
  {path:'Tracks',component:AllTracksComponent},
  {
    path: 'system',
    component: InSystemComponent,
    children: [
      { path: 'ArtisTracks', component: TracksComponent },
      { path: 'bio', component: ArtistBioComponent },
    ]
  }
];
