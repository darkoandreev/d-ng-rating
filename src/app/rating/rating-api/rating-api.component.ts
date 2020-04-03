import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-rating-api',
  templateUrl: './rating-api.component.html',
  styleUrls: ['./rating-api.component.scss'],
})
export class RatingApiComponent {
  readonly docPath: string = '/docs/ng-rating.md';

  constructor(private sanitizer: DomSanitizer) {}
}
