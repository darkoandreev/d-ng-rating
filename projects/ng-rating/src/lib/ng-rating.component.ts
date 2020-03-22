import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  forwardRef,
  Input,
  HostBinding,
  ContentChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faStar, faBan, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RATING_SIZE_ERROR } from './ng-rating.error';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { NgRatingLabelDirective } from './ng-rating-label.directive';

export const NG_RATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgRatingComponent),
  multi: true,
};
export interface IRating {
  hovered: boolean;
  clicked: boolean;
}

let UNIQUE_ID = 0;

@Component({
  selector: 'ng-rating',
  templateUrl: './ng-rating.component.html',
  styleUrls: ['./ng-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NG_RATING_VALUE_ACCESSOR],
})
export class NgRatingComponent implements ControlValueAccessor {
  @ContentChild(NgRatingLabelDirective) ratingLabelTemplate: NgRatingLabelDirective;

  @HostBinding('class.ng-star-rating') get starRatingClass(): boolean {
    return true;
  }
  @HostBinding('attr.id')
  @Input()
  id = `ng-star-rating-${UNIQUE_ID++}`;

  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @HostBinding('attr.aria-label')
  @Input('aria-label')
  ariaLabel = 'star';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @HostBinding('attr.aria-labelledby')
  @Input('aria-labelledby')
  ariaLabelledby: string | undefined = 'Star rating';

  @Input()
  get rating(): number {
    return this._rating;
  }
  set rating(value: number) {
    this._rating = coerceNumberProperty(value);
  }
  private _rating: number;

  @Input()
  get size(): number {
    return this._size;
  }
  set size(value: number) {
    if (value <= 0) {
      RATING_SIZE_ERROR();
    }

    this._size = coerceNumberProperty(value);
    this.ratings = Array.from(new Array(value)).map(() => {
      const rating: IRating = {
        hovered: false,
        clicked: false,
      };
      return rating;
    });

    if (this.rating > 0) {
      this.ratings.forEach((item, i) => (item.hovered = this.rating - 1 >= i));
      this._selectedIndex = this.rating - 1;
    }
  }
  private _size: number;

  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }
  private _readonly: boolean;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean;

  @Input()
  get showCancelIcon(): boolean {
    return this._showCancelIcon;
  }
  set showCancelIcon(value: boolean) {
    this._showCancelIcon = coerceBooleanProperty(value);
  }
  private _showCancelIcon = true;

  @Input() icon: IconDefinition = faStar;

  @Input() cancelIcon: IconDefinition = faBan;

  @Input() rateStyle: any;

  @Input() cancelRateStyle: any;

  @Output() rateChange: EventEmitter<number> = new EventEmitter();

  @Output() rateCancel: EventEmitter<void> = new EventEmitter();

  private _selectedIndex = -1;

  public ratings: IRating[];

  hoveredItem(index: number): void {
    if (!this.readonly) {
      this.ratings.forEach((item, i) => (item.hovered = index >= i));
    }
  }

  mouseLeave(): void {
    if (!this.readonly) {
      this.ratings.forEach((item, index) => {
        item.clicked = false;
        item.hovered = !(index > this._selectedIndex);
      });
    }
  }

  itemClick(item: IRating, index: number): void {
    if (!this.readonly) {
      this._selectedIndex = index;
      item.clicked = true;
      this.hoveredItem(index);
      this.onTouched();
      this.rateChange.emit(index + 1);
    }
  }

  cancel(): void {
    this._selectedIndex = -1;
    this.ratings.forEach((item) => {
      item.hovered = false;
      item.clicked = false;
    });
    this.rateCancel.emit();
  }

  // Function to call when the rating changes.
  _controlValueAccessorChangeFn: (value: any) => void = () => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched: () => any = () => {};

  writeValue(rating: number): void {
    this._controlValueAccessorChangeFn(rating);

    this.rating = rating;
    this._selectedIndex = rating - 1;
    this.ratings.forEach((item, i) => (item.hovered = rating - 1 >= i));
  }

  registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(value: boolean): void {
    this.disabled = value;
  }
}
