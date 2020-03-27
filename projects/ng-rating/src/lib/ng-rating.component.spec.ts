import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgRatingComponent } from './ng-rating.component';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgRatingModule } from './ng-rating.module';
import { FormsModule, NgModel } from '@angular/forms';

const NG_STAR_RATING_CLASS = '.ng-star-rating';
const NG_STAR_RATING_ITEM_CLASS = '.ng-star-rating .rating-item';
const NG_STAR_RATING_CANCEL_CLASS = '.ng-star-rating .rating-cancel';
const NG_STAR_RATING_LABEL = '.ng-star-rating .rating-label';
const NG_STAR_RATING_ITEM_ICON_CLASS = '.ng-star-rating .rating-item .rating-item-icon';

describe('NgRatingComponent', () => {
  let component: NgRatingTestComponent;
  let fixture: ComponentFixture<NgRatingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgRatingModule, FormsModule],
      declarations: [
        NgRatingTestComponent,
        NgRatingPreDefinedTestComponent,
        NgRatingReadonlyTestComponent,
        NgRatingControlValueAccessorTestComponent,
      ],
    }).compileComponents();
  }));

  describe('Basic ng rating', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NgRatingTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set ratings size', () => {
      expect(component.size).toEqual(6);

      component.size = 4;
      fixture.detectChanges();

      expect(component.size).toEqual(4);
      const ratingElement = fixture.debugElement.query(By.css(NG_STAR_RATING_CLASS)).nativeElement as Element;
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
      spyOn(component.ratingComponent, 'itemClick').and.callThrough();

      let ratingItemElement = fixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS))[3];
      ratingItemElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      const labelElement = fixture.debugElement.query(By.css(NG_STAR_RATING_LABEL)).nativeElement;

      expect(component.ratingLabel).toEqual(4);
      expect(component.ratingComponent.itemClick).toHaveBeenCalledWith({ hovered: true, clicked: true }, 3);
      expect(labelElement.innerText).toEqual('4');

      ratingItemElement = fixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS))[4];
      ratingItemElement.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.ratingLabel).toEqual(5);
      expect(labelElement.innerText).toEqual('5');
    });

    it('should clear rating by clicking on cancel (clear) button', () => {
      spyOn(component.ratingComponent.rateCancel, 'emit');
      component.showCancelIcon = true;
      fixture.detectChanges();

      const ratingItemElement = fixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS))[3];
      ratingItemElement.triggerEventHandler('click', null);

      expect(component.ratingLabel).toEqual(4);

      const ratingCancelElement = fixture.debugElement.query(By.css(NG_STAR_RATING_CANCEL_CLASS));
      ratingCancelElement.triggerEventHandler('click', null);

      expect(component.ratingComponent.rateCancel.emit).toHaveBeenCalledWith();

      const ratings = component.ratingComponent.ratings;
      ratings.forEach((rating) => {
        expect(rating).toEqual({ clicked: false, hovered: false });
      });
    });

    it('should show/hide cancel icon', () => {
      component.showCancelIcon = true;
      fixture.detectChanges();
      let ratingCancelElement = fixture.debugElement.query(By.css(NG_STAR_RATING_CANCEL_CLASS));

      expect(ratingCancelElement.nativeElement).toBeTruthy();
      expect(component.ratingComponent.showCancelIcon).toBeTruthy();

      component.showCancelIcon = false;
      fixture.detectChanges();

      ratingCancelElement = fixture.debugElement.query(By.css(NG_STAR_RATING_CANCEL_CLASS));

      expect(ratingCancelElement).toBeFalsy();
      expect(component.ratingComponent.showCancelIcon).toBeFalsy();
    });

    // TODO mouseenter/mouseleave
    it('should dispatch mouseleave event', () => {
      const ratingItemElement = fixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS))[3];
      ratingItemElement.triggerEventHandler('mouseenter', null);

      ratingItemElement.triggerEventHandler('mouseleave', null);
    });

    it('should throw error if ng rating size is less than zero', () => {
      expect(() => {
        component.size = -1;
        fixture.detectChanges();
      }).toThrowError(/Rating size must be greater than zero./);
    });
  });

  describe('Rating with pre-defined rate', () => {
    let preDefinedfixture: ComponentFixture<NgRatingPreDefinedTestComponent>;
    let preDefinedComponent: NgRatingPreDefinedTestComponent;

    beforeEach(() => {
      preDefinedfixture = TestBed.createComponent(NgRatingPreDefinedTestComponent);
      preDefinedComponent = preDefinedfixture.componentInstance;
      preDefinedfixture.detectChanges();
    });

    it('should create component', () => {
      expect(preDefinedComponent).toBeTruthy();
    });

    it('should pre-define rating for ng-rating component', () => {
      expect(preDefinedComponent.rating).toBe(3);
      const rating = spyOnProperty(preDefinedComponent.ratingComponent, 'rating', 'set').and.callThrough();
      preDefinedComponent.rating = 5;

      preDefinedfixture.detectChanges();

      expect(rating).toHaveBeenCalledWith(5);
      expect(preDefinedComponent.rating).toBe(5);
      expect(preDefinedComponent.ratingComponent.rating).toBe(5);
    });

    it('should throw error if ng rating size is less than zero', () => {
      expect(() => {
        preDefinedComponent.rating = -1;
        preDefinedfixture.detectChanges();
      }).toThrowError(/Rate definition must be greather than zero./);
    });
  });

  describe('Rating states', () => {
    let readonlyFixture: ComponentFixture<NgRatingReadonlyTestComponent>;
    let readonlyComponent: NgRatingReadonlyTestComponent;

    beforeEach(() => {
      readonlyFixture = TestBed.createComponent(NgRatingReadonlyTestComponent);
      readonlyComponent = readonlyFixture.componentInstance;
      readonlyFixture.detectChanges();
    });

    it('should set readonly property', () => {
      let ratingItemElement = readonlyFixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS))[3];
      ratingItemElement.triggerEventHandler('click', null);
      readonlyFixture.detectChanges();

      expect(ratingItemElement.nativeElement.getAttribute('aria-selected')).toBeTruthy();
      expect(ratingItemElement.nativeElement.getAttribute('aria-selected')).toEqual('true');

      readonlyComponent.readonly = true;

      readonlyFixture.detectChanges();
      ratingItemElement = readonlyFixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS))[4];
      ratingItemElement.triggerEventHandler('click', null);

      expect(readonlyComponent.ratingComponent.readonly).toBeTruthy();
      expect(ratingItemElement.nativeElement.getAttribute('aria-selected')).toEqual('false');
    });

    it('should set disabled property', () => {
      readonlyComponent.disabled = true;
      readonlyFixture.detectChanges();

      expect(readonlyComponent.ratingComponent.disabled).toBeTruthy();

      const ratingItemElements = readonlyFixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS));
      ratingItemElements.forEach((debugElement) => {
        const element: Element = debugElement.nativeElement;

        expect(element.classList).toContain('rating-item-disabled');
        expect(element.getAttribute('aria-disabled')).toEqual('true');
      });
    });
  });

  describe('Ng Rating control value accessor', () => {
    let cvaFixture: ComponentFixture<NgRatingControlValueAccessorTestComponent>;
    let cvaComponent: NgRatingControlValueAccessorTestComponent;

    beforeEach(() => {
      cvaFixture = TestBed.createComponent(NgRatingControlValueAccessorTestComponent);
      cvaComponent = cvaFixture.componentInstance;
      cvaFixture.detectChanges();
    });

    it('should create component', () => {
      expect(cvaComponent).toBeTruthy();
    });

    it('should set rating with ngModel', fakeAsync(() => {
      const writeValueSpy = spyOn(cvaComponent.ratingComponent, 'writeValue').and.callThrough();
      cvaComponent.rating = 4;
      cvaFixture.detectChanges();
      tick();

      expect(cvaComponent.ratingComponent.rating).toEqual(4);
      expect(writeValueSpy).toHaveBeenCalledWith(4);
    }));
  });
});

@Component({
  template: `
    <ng-rating [showCancelIcon]="showCancelIcon" (rateChange)="this.ratingLabel = $event" [size]="size">
      <ng-template ngRatingLabel>{{ this.ratingLabel }}</ng-template>
    </ng-rating>
  `,
})
export class NgRatingTestComponent {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public ratingLabel: number;
  public size = 6;
  public showCancelIcon: boolean;
}

@Component({
  template: ` <ng-rating [size]="size" [rating]="rating"> </ng-rating> `,
})
export class NgRatingPreDefinedTestComponent {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public size = 6;
  public rating = 3;
}

@Component({
  template: ` <ng-rating [size]="size" [readonly]="readonly" [disabled]="disabled" [rating]="rating"> </ng-rating> `,
})
export class NgRatingReadonlyTestComponent {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public size = 6;
  public rating = 3;
  public readonly = false;
  public disabled = false;
}

@Component({
  template: ` <ng-rating [size]="size" [(ngModel)]="rating"> </ng-rating> `,
})
export class NgRatingControlValueAccessorTestComponent {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public size = 6;
  public rating: number;
}
