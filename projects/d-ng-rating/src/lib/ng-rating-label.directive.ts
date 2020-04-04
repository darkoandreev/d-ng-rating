import { Directive, TemplateRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[ngRatingLabel], d-ng-rating-label',
})
export class NgRatingLabelDirective {
  @HostBinding('class.d-ng-rating-label') get ngRatingLabel(): boolean {
    return true;
  }
}
