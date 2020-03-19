import { NgModule } from '@angular/core';
import { NgRatingComponent } from './ng-rating.component';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [NgRatingComponent],
  imports: [
    CommonModule,
    FormsModule,
    HammerModule,
    FontAwesomeModule,
    A11yModule
  ],
  exports: [NgRatingComponent]
})
export class NgRatingModule { }
