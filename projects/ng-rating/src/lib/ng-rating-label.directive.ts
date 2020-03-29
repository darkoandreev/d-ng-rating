import { Directive, TemplateRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[ngRatingLabel], ng-rating-label',
})
export class NgRatingLabelDirective {
  @HostBinding('class.ng-rating-label') get ngRatingLabel(): boolean {
    return true;
  }
}
