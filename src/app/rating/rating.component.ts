import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnDestroy {
  private destroyed$ = new Subject<void>();
  public url: string;
  public links = [
    {
      name: 'Example',
      link: 'examples',
    },
    {
      name: 'API',
      link: 'api',
    },
  ];

  constructor(private route: Router) {
    this.route.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) =>
          event.url !== '/' ? event.url.split('/')[2] : event.urlAfterRedirects.split('/')[2]
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe((url: string) => (this.url = url));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
