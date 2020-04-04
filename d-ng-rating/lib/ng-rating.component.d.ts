import { EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgRatingLabelDirective } from './ng-rating-label.directive';
/**
 * Provider that allows the rating component to register as a ControlValueAccessor.
 * @docs-private @internal
 */
export declare const NG_RATING_VALUE_ACCESSOR: any;
/**
 * Rating item model.
 */
export interface IRatingContext {
    hovered: boolean;
}
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
export declare class NgRatingComponent implements OnChanges, ControlValueAccessor {
    /** @hidden @internal */
    ratings: IRatingContext[];
    /** Currently selected rating item index
     * @hidden @internal
     */
    _selectedIndex: number;
    /** @hidden @internal */
    ratingLabelTemplate: NgRatingLabelDirective;
    get starRatingClass(): boolean;
    /** A unique id for the rating input. If none is supplied, it will be auto-generated. */
    id: string;
    /**
     * Attached to the aria-label attribute of the host element.
     * In most cases, aria-labelledby will take precedence so this may be omitted.
     */
    ariaLabel: string;
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element.
     */
    ariaLabelledby: string | undefined;
    get ariaValueMin(): number;
    get ariaValueMax(): number;
    get ariaValueNow(): number;
    get ariaValueTextAttr(): string;
    get role(): string;
    get tabindexAttr(): number;
    get ariaDisabled(): boolean;
    get ariaReadonly(): boolean;
    get ariaSetSize(): number;
    /**
     * Gets/sets the `rating` for the component.
     * Determines selected rate items.
     * @example
     * ```html
     * <d-ng-rating [rating]="5"></d-ng-rating>
     * ```
     * @memberOf NgRatingComponent
     */
    get rating(): number;
    set rating(value: number);
    private _rating;
    /**
     * Gets/sets the `size` for the component.
     * Sets max number of rate items.
     * @example
     * ```html
     * <d-ng-rating [size]="5"></d-ng-rating>
     * ```
     * @memberOf NgRatingComponent
     */
    get size(): number;
    set size(value: number);
    private _size;
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
    get readonly(): boolean;
    set readonly(value: boolean);
    private _readonly;
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
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
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
    get showCancelIcon(): boolean;
    set showCancelIcon(value: boolean);
    private _showCancelIcon;
    /**
     * Gets/sets the `icon` for the rate item.
     * By default it's **faStar** FontAwesome icon.
     * @example
     * ```html
     * <d-ng-rating [icon]="faStar"></d-ng-rating>
     * ```
     * @memberOf NgRatingComponent
     */
    icon: IconDefinition;
    /**
     * Gets/sets the `cancelIcon` for the component.
     * By default it uses **faBan** FontAwesome icon.
     * @example
     * ```html
     * <d-ng-rating [cancelIcon]="faBan"></d-ng-rating>
     * ```
     * @memberOf NgRatingComponent
     */
    cancelIcon: IconDefinition;
    /**
     * An event that is emitted after the rate item is clicked and set.
     * Provides a number of clicked item - ex. 1,2,3, etc.
     * @example
     * ```html
     * <d-ng-rating [rateChange]="change($event)"></d-ng-rating>
     * ```
     */
    rateChange: EventEmitter<number>;
    /**
     * An event that is emitted after the rating is canceled (cleared).
     * @example
     * ```html
     * <d-ng-rating [rateCancel]="cancel($event)"></d-ng-rating>
     * ```
     */
    rateCancel: EventEmitter<void>;
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
    ratingTemplateContent: TemplateRef<IRatingContext>;
    ratingTemplate: TemplateRef<IRatingContext>;
    ngOnChanges(changes: SimpleChanges): void;
    /** @hidden @internal */
    hoveredItem(index: number): void;
    /** @hidden @internal */
    handleClick(index: number): void;
    /** @hidden @internal */
    cancel(): void;
    /** @hidden @internal */
    mouseLeave(): void;
    blur(): void;
    /** Handle rating using arrow keys and home/end keys */
    handleKeyDown(event: KeyboardEvent): void;
    /** @hidden @internal */
    writeValue(rating: number): void;
    /** @hidden @internal */
    registerOnChange(fn: (value: any) => void): void;
    /** @hidden @internal */
    registerOnTouched(fn: any): void;
    /** @hidden @internal */
    setDisabledState(value: boolean): void;
    private update;
    private _controlValueAccessorChangeFn;
    private onTouched;
    private ratingsHover;
    private get ariaValueText();
}
