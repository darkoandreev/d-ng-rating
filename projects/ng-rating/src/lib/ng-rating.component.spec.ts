import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRatingComponent } from './ng-rating.component';

describe('NgRatingComponent', () => {
  let component: NgRatingComponent;
  let fixture: ComponentFixture<NgRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
