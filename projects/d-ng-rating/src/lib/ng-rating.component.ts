import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  forwardRef,
  Input,
  HostBinding,
  ContentChild,
  OnChanges,
  SimpleChanges,
  HostListener,
  ViewEncapsulation,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faStar, faBan, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RATING_SIZE_ERROR, RATE_SET_ERROR } from './ng-rating.error';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { NgRatingLabelDirective } from './ng-rating-label.directive';
import { Key } from '../util/key';

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
export interface IRatingContext {
  hovered: boolean;
}

let UNIQUE_ID = 0;

/**
 * Rating components is a star based selection input.
 * A star rating usually consists of images of stars that can be used to rate a particular item.
 * A mouse user hovers over the stars and clicks one to select it.
 * For example, if the user clicks on the third star from the left, the rating of the item is 3 of 5 stars.
 * ```
 * @example
 * <d-ng-rating [input bindings]>
 *  <ng-template ngRatingLabel>{{ this.ratingLabel }}</ng-template>
 * </d-ng-rating>
 * ```
 *
 * @export
 */
@Component({
  selector: 'd-ng-rating',
  templateUrl: './ng-rating.component.html',
  styleUrls: ['./ng-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NG_RATING_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
})
export class NgRatingComponent implements OnChanges, ControlValueAccessor {
  /** @hidden @internal */
  public ratings: IRatingContext[];

  /** Currently selected rating item index
   * @hidden @internal
   */
  public _selectedIndex = -1;

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

  @HostBinding('attr.aria-valuemin') get ariaValueMin(): number {
    return 0;
  }

  @HostBinding('attr.aria-valuemax') get ariaValueMax(): number {
    return this.size;
  }

  @HostBinding('attr.aria-valuenow') get ariaValueNow(): number {
    return this._selectedIndex + 1;
  }

  @HostBinding('attr.aria-valuetext') get ariaValueTextAttr(): string {
    return this.ariaValueText;
  }

  @HostBinding('attr.role') get role(): string {
    return 'slider';
  }

  @HostBinding('attr.tabindex') get tabindexAttr(): number {
    return this.disabled ? -1 : 0;
  }

  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('attr.aria-readonly') get ariaReadonly(): boolean {
    return this.readonly;
  }

  @HostBinding('attr.aria-setsize') get ariaSetSize(): number {
    return this.size;
  }

  /**
   * Gets/sets the `rating` for the component.
   * Determines selected rate items.
   * @example
   * ```html
   * <d-ng-rating [rating]="5"></d-ng-rating>
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
   * <d-ng-rating [size]="5"></d-ng-rating>
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
      const rating: IRatingContext = {
        hovered: false,
      };
      return rating;
    });
  }
  private _size = 5;

  /**
   * Gets/sets the `readonly` property.
   * Determines if the rate component is readonly.
   * By default it's **false**.
   * @example
   * ```html
   * <d-ng-rating readonly></d-ng-rating>
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
   * <d-ng-rating disabled></d-ng-rating>
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
   * <d-ng-rating [showCancelIcon]="false"></d-ng-rating>
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
  private _showCancelIcon = false;

  /**
   * Gets/sets the `icon` for the rate item.
   * By default it's **faStar** FontAwesome icon.
   * @example
   * ```html
   * <d-ng-rating [icon]="faStar"></d-ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input() public icon: IconDefinition = faStar;

  /**
   * Gets/sets the `cancelIcon` for the component.
   * By default it uses **faBan** FontAwesome icon.
   * @example
   * ```html
   * <d-ng-rating [cancelIcon]="faBan"></d-ng-rating>
   * ```
   * @memberOf NgRatingComponent
   */
  @Input() public cancelIcon: IconDefinition = faBan;

  /**
   * An event that is emitted after the rate item is clicked and set.
   * Provides a number of clicked item - ex. 1,2,3, etc.
   * @example
   * ```html
   * <d-ng-rating [rateChange]="change($event)"></d-ng-rating>
   * ```
   */
  @Output() public rateChange: EventEmitter<number> = new EventEmitter();

  /**
   * An event that is emitted after the rating is canceled (cleared).
   * @example
   * ```html
   * <d-ng-rating [rateCancel]="cancel($event)"></d-ng-rating>
   * ```
   */
  @Output() public rateCancel: EventEmitter<void> = new EventEmitter();

  /**
   * The template to override the way each star is displayed.
   *
   * Alternatively put an `<ng-template>` as the only child of your `<d-ng-rating>` element
   * @example
   * ```html
   * <d-ng-rating (rateChange)="this.ratingLabel = $event" [size]="6">
   *   <ng-template let-hovered="hovered">
   *    <span class="star" [class.filled]="hovered">&#9733;</span>
   *   </ng-template>
   * </d-ng-rating>
   * ```
   */

  @ContentChild(TemplateRef, { static: false }) ratingTemplateContent: TemplateRef<IRatingContext>;
  @Input() ratingTemplate: TemplateRef<IRatingContext>;

  ngOnChanges(changes: SimpleChanges): void {
    if ('rating' in changes && changes.rating.currentValue > 0) {
      this.ratingsHover(this.rating - 1);
      this._selectedIndex = this.rating - 1;
    }
  }

  /** @hidden @internal */
  public hoveredItem(index: number): void {
    if (!this.readonly) {
      this.ratingsHover(index);
    }
  }

  /** @hidden @internal */
  public handleClick(index: number): void {
    if (!this.readonly) {
      this.update(index);
    }
  }

  /** @hidden @internal */
  public cancel(): void {
    this._selectedIndex = -1;
    this.ratings.forEach((item: IRatingContext) => (item.hovered = false));
    this.rateCancel.emit();
  }

  /** @hidden @internal */
  @HostListener('mouseleave')
  public mouseLeave(): void {
    if (!this.readonly) {
      this.ratings.forEach((item: IRatingContext, index) => (item.hovered = !(index > this._selectedIndex)));
    }
  }

  @HostListener('blur')
  public blur(): void {
    this.onTouched();
  }

  /** Handle rating using arrow keys and home/end keys */
  @HostListener('keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case Key.ArrowDown:
      case Key.ArrowLeft:
        if (this._selectedIndex > -1) {
          this._selectedIndex--;
          this.update(this._selectedIndex);
        }
        break;
      case Key.ArrowUp:
      case Key.ArrowRight:
        if (this._selectedIndex < this.size - 1) {
          this._selectedIndex++;
          this.update(this._selectedIndex);
        }
        break;
      case Key.Home:
        this.update(0);
        break;
      case Key.End:
        this.update(this.size - 1);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /** @hidden @internal */
  public writeValue(rating: number): void {
    if (rating) {
      this._controlValueAccessorChangeFn(rating);
      this.rating = rating;
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

  private update(index: number): void {
    this._selectedIndex = index;
    this.hoveredItem(this._selectedIndex);
    this.onTouched();
    this.rateChange.emit(index + 1);
  }

  // Function to call when the rating changes.
  private _controlValueAccessorChangeFn: (value: any) => void = () => {};

  // Function to call when the input is touched (when a star is clicked).
  private onTouched: () => any = () => {};

  private ratingsHover(index: number): void {
    this.ratings.forEach((item: IRatingContext, i) => (item.hovered = index >= i));
  }

  private get ariaValueText(): string {
    return `${this._selectedIndex + 1} out of ${this.size}`;
  }
}
