import { NgModule } from '@angular/core';
import { NgRatingComponent } from './ng-rating.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgRatingLabelDirective } from './ng-rating-label.directive';

@NgModule({
  declarations: [NgRatingComponent, NgRatingLabelDirective],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  exports: [NgRatingComponent, NgRatingLabelDirective],
})
export class NgRatingModule {}
