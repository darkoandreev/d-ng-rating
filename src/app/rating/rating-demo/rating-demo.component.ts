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
<ng-rating [size]="6"></ng-rating>
`;

  secondSnippet = `
<form [formGroup]="form">
  <ng-rating formControlName="ratingControl" [size]="6"></ng-rating>
</form>
  `;
  thirdSnippet = `
<ng-rating disabled [size]="6"></ng-rating>
  `;

  fourthSnippet = `
<ng-rating (rateChange)="this.ratingLabel = $event" [size]="6">
  <ng-rating-label>{{ this.ratingLabel }}</ng-rating-label>
</ng-rating> 
  `;
  fifthSnippet = `
<ng-rating readonly [rating]="rating" [size]="6"></ng-rating>
  `;

  sixthSnippet = `
<ng-rating (rateChange)="this.ratingLabel = $event" [size]="6">
  <ng-template let-hovered="hovered">
    <span class="star" [class.filled]="hovered">&#9733;</span>
  </ng-template>
</ng-rating> 
  `;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ratingControl: [3, Validators.required],
    });
  }
}
