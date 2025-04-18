import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimilarArtistsComponent } from '../similar-artists/similar-artists.component';
import { TracksComponent } from '../components/tracks/tracks.component';
import { AnalyticsComponent } from '../components/analytics/analytics.component';
import { RouterModule } from '@angular/router';
import { InSystemComponent } from '../in-system/in-system.component';

const routes = [
  {
    path: '', component: InSystemComponent, children: [
      { path: 'tracks', component: TracksComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'similar', component: SimilarArtistsComponent }
    ]
  }
];
@NgModule({
  
  imports: [
  CommonModule,SimilarArtistsComponent, RouterModule,    RouterModule.forChild(routes),  // Используем forChild для вложенных маршрутов

  ]
})
export class SystemModule { }
