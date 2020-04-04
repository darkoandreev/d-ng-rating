import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating.component';
import { RatingDemoComponent } from './rating-demo/rating-demo.component';
import { RatingApiComponent } from './rating-api/rating-api.component';
import { RatingRoutingModule } from './rating-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { NgRatingModule } from '@d-ng-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RatingComponent, RatingDemoComponent, RatingApiComponent],
  imports: [
    CommonModule,
    RatingRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    NgRatingModule,
    HttpClientModule,
    MarkdownModule,
  ],
})
export class RatingModule {}
