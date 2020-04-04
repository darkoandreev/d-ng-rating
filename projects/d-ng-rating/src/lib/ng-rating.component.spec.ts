import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgRatingComponent } from './ng-rating.component';
import { Component, ViewChild, DebugElement, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgRatingModule } from './ng-rating.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Key } from '../util/key';

const NG_STAR_RATING_CLASS = '.ng-star-rating';
const NG_STAR_RATING_ITEM_CLASS = '.ng-star-rating .d-ng-rating-item';
const NG_STAR_RATING_CANCEL_CLASS = '.ng-star-rating .d-ng-rating-cancel';
const NG_STAR_RATING_LABEL = '.ng-star-rating .d-ng-rating-label';
const NG_STAR_RATING_ITEM_ICON_CLASS = '.ng-star-rating .d-ng-rating-item .d-ng-rating-item-icon';

describe('NgRatingComponent', () => {
  let component: NgRatingTestComponent;
  let fixture: ComponentFixture<NgRatingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgRatingModule, FormsModule, ReactiveFormsModule],
      declarations: [
        NgRatingTestComponent,
        NgRatingPreDefinedTestComponent,
        NgRatingReadonlyTestComponent,
        NgRatingControlValueAccessorTestComponent,
        NgRatingFormControlTestComponent,
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
        expect(rating).toEqual({ hovered: false });
      });
    });

    it('should set rating by clicking on item', () => {
      spyOn(component.ratingComponent, 'handleClick').and.callThrough();

      let ratingItemElement = fixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS))[3];
      ratingItemElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      const labelElement = fixture.debugElement.query(By.css(NG_STAR_RATING_LABEL)).nativeElement;

      expect(component.ratingLabel).toEqual(4);
      expect(component.ratingComponent.handleClick).toHaveBeenCalledWith(3);
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
        expect(rating).toEqual({ hovered: false });
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

    it('should dispatch mouseleave event', () => {
      const ratingItemDebugElement = fixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS))[3];
      const ratingComponentDebugElement = fixture.debugElement.query(By.directive(NgRatingComponent));
      const ratingItemIconDebugElements = fixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_ICON_CLASS));

      ratingItemDebugElement.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();

      expect(ratingComponentDebugElement.nativeElement).toBeTruthy();

      ratingItemIconDebugElements.forEach((icon, index) => {
        const element: Element = icon.nativeElement;
        if (index <= 3) {
          expect(element.classList).toContain('d-ng-rating-item-icon-hover');
        }
      });

      ratingComponentDebugElement.triggerEventHandler('mouseleave', null);
      fixture.detectChanges();

      ratingItemIconDebugElements.forEach((icon, index) => {
        const element: Element = icon.nativeElement;
        if (index <= 3) {
          expect(element.classList).not.toContain('d-ng-rating-item-icon-hover');
        }
      });
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

    it('should pre-define rating for d-ng-rating component', () => {
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
      const ratingElement = readonlyFixture.debugElement.query(By.directive(NgRatingComponent));

      expect(ratingElement.nativeElement.getAttribute('aria-disabled')).toEqual('true');
      ratingItemElements.forEach((debugElement) => {
        const element: Element = debugElement.nativeElement;
        expect(element.classList).toContain('d-ng-rating-item-disabled');
      });
    });
  });

  describe('Ng rating using ngModel', () => {
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

  describe('Ng rating using form group', () => {
    let formFixture: ComponentFixture<NgRatingFormControlTestComponent>;
    let formComponent: NgRatingFormControlTestComponent;

    beforeEach(() => {
      formFixture = TestBed.createComponent(NgRatingFormControlTestComponent);
      formComponent = formFixture.componentInstance;
      formFixture.detectChanges();
    });

    it('should mark control as touched on blur', () => {
      const element: DebugElement = formFixture.debugElement.query(By.directive(NgRatingComponent));
      expect(element.nativeElement.classList).toContain('ng-untouched');

      element.triggerEventHandler('blur', null);
      formFixture.detectChanges();
      expect(element.nativeElement.classList).toContain('ng-touched');
    });

    it('should disabled rating when a control is disabled', () => {
      const ratingItemDebugElement = formFixture.debugElement.queryAll(By.css(NG_STAR_RATING_ITEM_CLASS))[4];

      expect(formComponent.form.get('ratingControl').disabled).toBeFalsy();

      formComponent.form.disable();
      formFixture.detectChanges();

      expect(formComponent.form.get('ratingControl').disabled).toBeTruthy();
      ratingItemDebugElement.triggerEventHandler('click', null);
      formFixture.detectChanges();

      expect(formComponent.ratingComponent._selectedIndex).toBe(4);
    });
  });

  describe('ng rating keyboard support', () => {
    let keyboardfixture: ComponentFixture<NgRatingTestComponent>;
    let keyboardComponent: NgRatingTestComponent;

    beforeEach(() => {
      keyboardfixture = TestBed.createComponent(NgRatingTestComponent);
      keyboardComponent = keyboardfixture.componentInstance;
      keyboardfixture.detectChanges();
    });

    it('should handle arrow keys', () => {
      const element = keyboardfixture.debugElement.query(By.directive(NgRatingComponent));
      let event = createKeyDownEvent(Key.ArrowRight);
      keyboardComponent.ratingComponent.handleKeyDown(event);
      keyboardfixture.detectChanges();

      expect(keyboardComponent.ratingLabel).toEqual(1);
      expect(keyboardComponent.ratingComponent._selectedIndex).toBe(0);
      expect(element.nativeElement.getAttribute('aria-valuenow')).toEqual('1');
      expect(event.preventDefault).toHaveBeenCalled();

      event = createKeyDownEvent(Key.ArrowUp);
      keyboardComponent.ratingComponent.handleKeyDown(event);
      keyboardfixture.detectChanges();

      expect(keyboardComponent.ratingLabel).toEqual(2);
      expect(keyboardComponent.ratingComponent._selectedIndex).toBe(1);
      expect(element.nativeElement.getAttribute('aria-valuenow')).toEqual('2');
      expect(event.preventDefault).toHaveBeenCalled();

      event = createKeyDownEvent(Key.ArrowLeft);
      keyboardComponent.ratingComponent.handleKeyDown(event);
      keyboardfixture.detectChanges();

      expect(keyboardComponent.ratingLabel).toEqual(1);
      expect(keyboardComponent.ratingComponent._selectedIndex).toBe(0);
      expect(element.nativeElement.getAttribute('aria-valuenow')).toEqual('1');
      expect(event.preventDefault).toHaveBeenCalled();

      event = createKeyDownEvent(Key.ArrowDown);
      keyboardComponent.ratingComponent.handleKeyDown(event);
      keyboardfixture.detectChanges();

      expect(keyboardComponent.ratingLabel).toEqual(0);
      expect(keyboardComponent.ratingComponent._selectedIndex).toBe(-1);
      expect(element.nativeElement.getAttribute('aria-valuenow')).toEqual('0');
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should handle home/end keys', () => {
      const element = keyboardfixture.debugElement.query(By.directive(NgRatingComponent));
      let event = createKeyDownEvent(Key.Home);
      keyboardComponent.ratingComponent.handleKeyDown(event);
      keyboardfixture.detectChanges();

      expect(keyboardComponent.ratingLabel).toEqual(1);
      expect(keyboardComponent.ratingComponent._selectedIndex).toBe(0);
      expect(element.nativeElement.getAttribute('aria-valuenow')).toEqual('1');
      expect(event.preventDefault).toHaveBeenCalled();

      event = createKeyDownEvent(Key.End);
      keyboardComponent.ratingComponent.handleKeyDown(event);
      keyboardfixture.detectChanges();

      expect(keyboardComponent.ratingLabel).toEqual(keyboardComponent.size);
      expect(keyboardComponent.ratingComponent._selectedIndex).toBe(keyboardComponent.size - 1);
      expect(element.nativeElement.getAttribute('aria-valuenow')).toEqual(`${keyboardComponent.size}`);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});

function createKeyDownEvent(key: string): KeyboardEvent {
  const event = { code: key, preventDefault: () => {} };
  spyOn(event, 'preventDefault');
  return event as KeyboardEvent;
}

@Component({
  template: `
    <d-ng-rating [showCancelIcon]="showCancelIcon" (rateChange)="this.ratingLabel = $event" [size]="size">
      <d-ng-rating-label>{{ this.ratingLabel }}</d-ng-rating-label>
    </d-ng-rating>
  `,
})
export class NgRatingTestComponent {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public ratingLabel: number;
  public size = 6;
  public showCancelIcon: boolean;
}

@Component({
  template: ` <d-ng-rating [size]="size" [rating]="rating"> </d-ng-rating> `,
})
export class NgRatingPreDefinedTestComponent {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public size = 6;
  public rating = 3;
}

@Component({
  template: `
    <d-ng-rating [size]="size" [readonly]="readonly" [disabled]="disabled" [rating]="rating"> </d-ng-rating>
  `,
})
export class NgRatingReadonlyTestComponent {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public size = 6;
  public rating = 3;
  public readonly = false;
  public disabled = false;
}

@Component({
  template: ` <d-ng-rating [size]="size" [(ngModel)]="rating"> </d-ng-rating> `,
})
export class NgRatingControlValueAccessorTestComponent {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public size = 6;
  public rating: number;
}

@Component({
  template: `
    <form [formGroup]="form">
      <d-ng-rating formControlName="ratingControl" [size]="6"></d-ng-rating>
    </form>
  `,
})
export class NgRatingFormControlTestComponent implements OnInit {
  @ViewChild(NgRatingComponent) ratingComponent: NgRatingComponent;
  public size = 6;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ratingControl: [3, Validators.required],
    });
  }
}
