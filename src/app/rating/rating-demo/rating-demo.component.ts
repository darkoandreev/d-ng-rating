import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating-demo',
  templateUrl: './rating-demo.component.html',
  styleUrls: ['./rating-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingDemoComponent implements OnInit {
  form: FormGroup;
  rating = 5;
  ratingLabel: string;

  firstSnippet = `
<d-ng-rating [size]="6"></d-ng-rating>
`;

  secondSnippet = `
<form [formGroup]="form">
  <d-ng-rating formControlName="ratingControl" [size]="6"></d-ng-rating>
</form>
  `;
  thirdSnippet = `
<d-ng-rating disabled [size]="6"></d-ng-rating>
  `;

  fourthSnippet = `
<d-ng-rating 
  showCancelIcon 
  (rateChange)="this.ratingLabel = $event" 
  (rateCancel)="this.ratingLabel = null" 
  [size]="6"
>
  <d-ng-rating-label>{{ this.ratingLabel }}</d-ng-rating-label>
</d-ng-rating>
  `;
  fifthSnippet = `
<d-ng-rating readonly [rating]="rating" [size]="6"></d-ng-rating>
  `;

  sixthSnippet = `
<d-ng-rating (rateChange)="this.ratingLabel = $event" [size]="6">
  <ng-template let-hovered="hovered">
    <span class="star" [class.filled]="hovered">&#9733;</span>
  </ng-template>
</d-ng-rating> 
  `;

  customTeplateCssSnippet = `
.star {
  font-size: 1.5rem;
  color: #b0c4de;
}

.filled {
  cursor: pointer;
  color: #1e90ff;
}
  `;

  basicRatingTypescript = `
import {Component} from '@angular/core';

/**
 * @title Basic rating overview
 */
@Component({
  selector: 'rating-overview-example',
  templateUrl: 'rating-overview-example.html',
  styleUrls: ['rating-overview-example.css'],
})
export class NgRatingOverviewExample {}
  `;

  basicRatingLabelTypescript = `
  import {Component} from '@angular/core';
  
  /**
   * @title Basic rating with label
   */
  @Component({
    selector: 'rating-label-overview-example',
    templateUrl: 'rating-label-overview-example.html',
    styleUrls: ['rating-label-overview-example.css'],
  })
  export class NgRatingLabelOverviewExample {
    public ratingLabel: string;
  }
    `;
  ratingFormTypescript = `
import {Component} from '@angular/core';

/**
 * @title Basic rating within form
 */
@Component({
  selector: 'rating-form-overview-example',
  templateUrl: 'rating-form-overview-example.html',
  styleUrls: ['rating-form-overview-example.css'],
})
export class NgRatingFormOverviewExample {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ratingControl: [3, Validators.required],
    });
  }
}`;

  disabledRatingTypescript = `
import {Component} from '@angular/core';

/**
 * @title Disabled rating
 */
@Component({
  selector: 'rating-disabled-overview-example',
  templateUrl: 'rating-disabled-overview-example.html',
  styleUrls: ['rating-disabled-overview-example.css'],
})
export class NgRatingDisabledOverviewExample {
}  
  `;
  readonlyRatingTypescript = `
import {Component} from '@angular/core';

/**
 * @title Readonly rating
 */
@Component({
  selector: 'rating-readonly-overview-example',
  templateUrl: 'rating-readonly-overview-example.html',
  styleUrls: ['rating-readonly-overview-example.css'],
})
export class NgRatingReadonlyOverviewExample {
  public rating: number = 5;
}`;

  customTemplateRatingTypescript = `
import {Component} from '@angular/core';

/**
 * @title Custom template rating
 */
@Component({
  selector: 'rating-template-overview-example',
  templateUrl: 'rating-template-overview-example.html',
  styleUrls: ['rating-template-overview-example.css'],
})
export class NgRatingTemplateOverviewExample {
  public ratingLabel: string;
}`;

  cancelableRatingHtml = `
<d-ng-rating showCancelIcon [size]="6"></d-ng-rating>
`;
  cancelableRatingTypescript = `
import {Component} from '@angular/core';

/**
 * @title Cancelable rating
 */
@Component({
  selector: 'rating-cancel-overview-example',
  templateUrl: 'rating-cancel-overview-example.html',
  styleUrls: ['rating-cancel-overview-example.css'],
})
export class NgRatingCancelOverviewExample {
}
`;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ratingControl: [3, Validators.required],
    });
  }
}
