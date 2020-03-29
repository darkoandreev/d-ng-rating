import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'rating',
    loadChildren: () => import('./rating/rating.module').then((m) => m.RatingModule),
  },
  {
    path: '',
    redirectTo: 'rating',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
