import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgRatingComponent } from './ng-rating.component';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgRatingModule } from './ng-rating.module';

describe('NgRatingComponent', () => {
  let component: NgRatingTestComponent;
  let fixture: ComponentFixture<NgRatingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgRatingModule],
      declarations: [NgRatingTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgRatingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic ng rating', () => {
    it('should set ratings size', () => {
      expect(component.size).toEqual(6);

      component.size = 4;
      fixture.detectChanges();

      expect(component.size).toEqual(4);
      const ratingElement = fixture.debugElement.query(By.css('.ng-star-rating')).nativeElement as Element;
      const ratingSizeAttr = ratingElement.getAttribute('ng-reflect-size');
      expect(ratingSizeAttr).toEqual('4');
    });

    it('should set ratings array', () => {
      expect(component.size).toEqual(6);

      component.size = 4;
      fixture.detectChanges();

      const ratings = component.ratingComponent.ratings;
      expect(ratings.length).toEqual(4);

      ratings.forEach((rating) => {
        expect(rating).toEqual({ clicked: false, hovered: false });
      });
    });

    it('should set rating by clicking on item', () => {
      let ratingItemElement = fixture.debugElement.queryAll(By.css('.ng-star-rating .rating-item'))[3];
      ratingItemElement.triggerEventHandler('click', null);

      expect(component.ratingLabel).toEqual(4);

      ratingItemElement = fixture.debugElement.queryAll(By.css('.ng-star-rating .rating-item'))[4];
      ratingItemElement.triggerEventHandler('click', null);

      expect(component.ratingLabel).toEqual(5);
    });

    it('should clear rating by clicking on cancel (clear) button', () => {
      spyOn(component.ratingComponent.rateCancel, 'emit');

      const ratingItemElement = fixture.debugElement.queryAll(By.css('.ng-star-rating .rating-item'))[3];
      ratingItemElement.triggerEventHandler('click', null);

      expect(component.ratingLabel).toEqual(4);

      const ratingCancelElement = fixture.debugElement.query(By.css('.ng-star-rating .rating-cancel'));
      ratingCancelElement.triggerEventHandler('click', null);

      expect(component.ratingComponent.rateCancel.emit).toHaveBeenCalledWith();

      const ratings = component.ratingComponent.ratings;
      ratings.forEach((rating) => {
        expect(rating).toEqual({ clicked: false, hovered: false });
      });
    });

    it('should throw error if ng rating size is less than zero', () => {
      expect(() => {
        component.size = -1;
        fixture.detectChanges();
      }).toThrowError(/Rating size must be greater than zero./);
    });
  });
});

@Component({
  template: ` <ng-rating (rateChange)="this.ratingLabel = $event" [size]="size"></ng-rating> `,
})
export class NgRatingTestComponent {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public ratingLabel: number;
  public size = 6;
}
