import { Component, ChangeDetectionStrategy, Output, EventEmitter, forwardRef, Input, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { RATING_SIZE_ERROR } from './ng-rating.error';

export interface IRating {
  index: number;
  hovered: boolean;
  clicked: boolean;
}

let UNIQUE_ID = 0;

@Component({
  selector: 'lib-ng-rating',
  templateUrl: './ng-rating.component.html',
  styleUrls: ['./ng-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgRatingComponent),
      multi: true
    }
  ]
})
export class NgRatingComponent implements ControlValueAccessor {
  @HostBinding('class.ng-star-rating') get starRatingClass(): boolean {
    return true;
  }
  @HostBinding('attr.id')
  @Input() id: string = `ng-star-rating-${UNIQUE_ID++}`

  @Input() color: string;

  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @HostBinding('attr.aria-label')
  @Input('aria-label') 
  ariaLabel: string = 'star';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @HostBinding('attr.aria-labelledby')
  @Input('aria-labelledby') 
  ariaLabelledby: string | undefined = 'Star rating';

  @Input() 
  get size(): number {
    return this._size;
  }
  set size(value: number) {
    if(value <= 0) {
      RATING_SIZE_ERROR();
    }
    
    this._size = value;
    this.ratings = Array.from(new Array(value)).map((_, index) => <IRating> { index, hovered: false, clicked: false });
  }

  @Input() 
  get rating(): number {
    return this._rating
  }
  set rating(value: number) {
    this._rating = value
    this.ratings.forEach((item, i) => item.hovered = value - 1 >= i);
  }

  @Output() change: EventEmitter<number> = new EventEmitter();

  public ratings: IRating[];
  public faStar = faStar;

  private _selectedIndex: number = 0;
  private _rating: number;
  private _size: number;

  hoveredItem(index: number): void {
    this.ratings.forEach((item, i) => item.hovered = index >= i);
  }

  mouseLeave(): void {
    this.ratings.forEach((item, index) => {
      if (index > this._selectedIndex || !this._selectedIndex) {
        item.hovered = false;
      }
    });
  }

  itemClick(item: IRating, index: number): void {
    this._selectedIndex = index;
    item.clicked = true;
    this.hoveredItem(index);
    this.change.emit(index + 1)
  }

  // Function to call when the rating changes.
  _controlValueAccessorChangeFn = (rating: number) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  writeValue(rating: number): void {
    this.rating = rating;
    this._controlValueAccessorChangeFn(rating);
  }

  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
