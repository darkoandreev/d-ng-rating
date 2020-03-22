import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngRatingLabel]',
})
export class NgRatingLabelDirective {
  constructor(public template: TemplateRef<any>) {}
}
