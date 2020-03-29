import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingComponent } from './rating.component';
import { RatingDemoComponent } from './rating-demo/rating-demo.component';
import { RatingApiComponent } from './rating-api/rating-api.component';

const routes: Routes = [
  {
    path: '',
    component: RatingComponent,
    children: [
      { path: '', redirectTo: 'examples', pathMatch: 'full' },
      { path: 'examples', component: RatingDemoComponent },
      { path: 'api', component: RatingApiComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingRoutingModule {}
