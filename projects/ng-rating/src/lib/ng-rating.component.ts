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
import { RATING_SIZE_ERROR, RATE_SET_ERROR } from './ng-rating.error';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { NgRatingLabelDirective } from './ng-rating-label.directive';

/**
 * Provider that allows the rating component to register as a ControlValueAccessor.
 * @docs-private @internal
 */
export const NG_RATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgRatingComponent),
  multi: true,
};

/**
 * Rating item model.
 */
export interface IRating {
  hovered: boolean;
  clicked: boolean;
}

let UNIQUE_ID = 0;

/**
 * Rating components is a star based selection input.
 * A star rating usually consists of images of stars that can be used to rate a particular item.
 * A mouse user hovers over the stars and clicks one to select it.
 * For example, if the user clicks on the third star from the left, the rating of the item is 3 of 5 stars.
 * ```
 * @example
 * <ng-rating [input bindings]>
 *  <ng-template ngRatingLabel>{{ this.ratingLabel }}</ng-template>
 * </ng-rating>
 * ```
 *
 * @export
 */
@Component({
  selector: 'ng-rating',
  templateUrl: './ng-rating.component.html',
  styleUrls: ['./ng-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NG_RATING_VALUE_ACCESSOR],
})
export class NgRatingComponent implements ControlValueAccessor {
  /** @hidden @internal */
  public ratings: IRating[];

  /** @hidden @internal */
  @ContentChild(NgRatingLabelDirective) public ratingLabelTemplate: NgRatingLabelDirective;

  @HostBinding('class.ng-star-rating') get starRatingClass(): boolean {
    return true;
  }

  /** A unique id for the rating input. If none is supplied, it will be auto-generated. */
  @HostBinding('attr.id')
  @Input()
  public id = `ng-star-rating-${UNIQUE_ID++}`;

  /**
   * Attached to the aria-label attribute of the host element.
   * In most cases, aria-labelledby will take precedence so this may be omitted.
   */
  @HostBinding('attr.aria-label')
  @Input('aria-label')
  public ariaLabel = 'star';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element.
   */
  @HostBinding('attr.aria-labelledby')
  @Input('aria-labelledby')
  public ariaLabelledby: string | undefined = 'Star rating';

  /**
   * Gets/sets the `rating` for the component.
   * Determines selected rate items.
   * @example
   * ```html
   * <ng-rating [rating]="5"></ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input()
  public get rating(): number {
    return this._rating;
  }
  public set rating(value: number) {
    if (value <= 0) {
      RATE_SET_ERROR();
    }
    this._rating = coerceNumberProperty(value);
  }
  private _rating: number;

  /**
   * Gets/sets the `size` for the component.
   * Sets max number of rate items.
   * @example
   * ```html
   * <ng-rating [size]="5"></ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input()
  public get size(): number {
    return this._size;
  }
  public set size(value: number) {
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
      this.ratingsHover(this.rating - 1);
      this._selectedIndex = this.rating - 1;
    }
  }
  private _size: number;

  /**
   * Gets/sets the `readonly` property.
   * Determines if the rate component is readonly.
   * By default it's **false**.
   * @example
   * ```html
   * <ng-rating readonly></ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input()
  public get readonly(): boolean {
    return this._readonly;
  }
  public set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }
  private _readonly = false;

  /**
   * Gets/sets the `disabled` property.
   * Whether the rate component is disabled.
   * By default rate items are clickable (disabled=false).
   * @example
   * ```html
   * <ng-rating disabled></ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  /**
   * Gets/sets the `showCancelIcon` property.
   * Whether the cancel (clear) icon is visible.
   * By default it's visible.
   * @example
   * ```html
   * <ng-rating [showCancelIcon]="false"></ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input()
  public get showCancelIcon(): boolean {
    return this._showCancelIcon;
  }
  public set showCancelIcon(value: boolean) {
    this._showCancelIcon = coerceBooleanProperty(value);
  }
  private _showCancelIcon = true;

  /**
   * Gets/sets the `icon` for the rate item.
   * By default it's **faStar** FontAwesome icon.
   * @example
   * ```html
   * <ng-rating [icon]="faStar"></ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input() public icon: IconDefinition = faStar;

  /**
   * Gets/sets the `cancelIcon` for the component.
   * By default it uses **faBan** FontAwesome icon.
   * @example
   * ```html
   * <ng-rating [cancelIcon]="faBan"></ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input() public cancelIcon: IconDefinition = faBan;

  /**
   * Gets/sets the `rateStyle`. Custom style for rate item.
   * By default it uses styles from the component.
   * @example
   * ```html
   * <ng-rating [rateStyle]="{'font-size.px': fontSizeExp}"></ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input() public rateStyle: any;

  /**
   * Gets/sets the `cancelRateStyle`. Custom style for the cancel (clear) button.
   * By default it uses styles from the component.
   * @example
   * ```html
   * <ng-rating [cancelRateStyle]="{'font-size.px': fontSizeExp}"></ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input() public cancelRateStyle: any;

  /**
   * An event that is emitted after the rate item is clicked and set.
   * Provides a number of clicked item - ex. 1,2,3, etc.
   * @example
   * ```html
   * <ng-rating [rateChange]="change($event)"></ng-rating>
   * ```
   */
  @Output() public rateChange: EventEmitter<number> = new EventEmitter();

  /**
   * An event that is emitted after the rating is canceled (cleared).
   * @example
   * ```html
   * <ng-rating [rateCancel]="cancel($event)"></ng-rating>
   * ```
   */
  @Output() public rateCancel: EventEmitter<void> = new EventEmitter();

  // Currently selected rating item index.
  private _selectedIndex = -1;

  // Function to call when the rating changes.
  private _controlValueAccessorChangeFn: (value: any) => void = () => {};

  // Function to call when the input is touched (when a star is clicked).
  private onTouched: () => any = () => {};

  private ratingsHover(index: number): void {
    this.ratings.forEach((item, i) => (item.hovered = index >= i));
  }

  /** @hidden @internal */
  public hoveredItem(index: number): void {
    if (!this.readonly) {
      this.ratingsHover(index);
    }
  }

  /** @hidden @internal */
  public mouseLeave(): void {
    if (!this.readonly) {
      this.ratings.forEach((item, index) => {
        item.clicked = false;
        item.hovered = !(index > this._selectedIndex);
      });
    }
  }

  /** @hidden @internal */
  public itemClick(item: IRating, index: number): void {
    if (!this.readonly) {
      this._selectedIndex = index;
      item.clicked = true;
      this.hoveredItem(index);
      this.onTouched();
      this.rateChange.emit(index + 1);
    }
  }

  /** @hidden @internal */
  public cancel(): void {
    this._selectedIndex = -1;
    this.ratings.forEach((item) => {
      item.hovered = false;
      item.clicked = false;
    });
    this.rateCancel.emit();
  }

  /** @hidden @internal */
  public writeValue(rating: number): void {
    if (rating) {
      this._controlValueAccessorChangeFn(rating);
      this.rating = rating;
      console.log(this.rating);

      this._selectedIndex = rating - 1;
      this.ratingsHover(rating - 1);
    }
  }

  /** @hidden @internal */
  public registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  /** @hidden @internal */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** @hidden @internal */
  public setDisabledState(value: boolean): void {
    this.disabled = value;
  }
}
