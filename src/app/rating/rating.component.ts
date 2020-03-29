import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  url: string;

  constructor(private route: Router) {
    this.route.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url.split('/')[2])
      )
      .subscribe((url) => (this.url = url));
  }

  links = [
    {
      name: 'Example',
      link: 'examples',
    },
    {
      name: 'API',
      link: 'api',
    },
  ];
}
