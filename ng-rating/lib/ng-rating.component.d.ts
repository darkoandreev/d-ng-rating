import { EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgRatingLabelDirective } from './ng-rating-label.directive';
/**
 * Provider that allows the rating component to register as a ControlValueAccessor.
 * @docs-private @internal
 */
import * as ɵngcc0 from '@angular/core';
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
 * <ng-rating [input bindings]>
 *  <ng-template ngRatingLabel>{{ this.ratingLabel }}</ng-template>
 * </ng-rating>
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
     * <ng-rating [rating]="5"></ng-rating>
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
     * <ng-rating [size]="5"></ng-rating>
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
     * <ng-rating readonly></ng-rating>
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
     * <ng-rating disabled></ng-rating>
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
     * <ng-rating [showCancelIcon]="false"></ng-rating>
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
     * <ng-rating [icon]="faStar"></ng-rating>
     * ```
     * @memberOf NgRatingComponent
     */
    icon: IconDefinition;
    /**
     * Gets/sets the `cancelIcon` for the component.
     * By default it uses **faBan** FontAwesome icon.
     * @example
     * ```html
     * <ng-rating [cancelIcon]="faBan"></ng-rating>
     * ```
     * @memberOf NgRatingComponent
     */
    cancelIcon: IconDefinition;
    /**
     * An event that is emitted after the rate item is clicked and set.
     * Provides a number of clicked item - ex. 1,2,3, etc.
     * @example
     * ```html
     * <ng-rating [rateChange]="change($event)"></ng-rating>
     * ```
     */
    rateChange: EventEmitter<number>;
    /**
     * An event that is emitted after the rating is canceled (cleared).
     * @example
     * ```html
     * <ng-rating [rateCancel]="cancel($event)"></ng-rating>
     * ```
     */
    rateCancel: EventEmitter<void>;
    /**
     * The template to override the way each star is displayed.
     *
     * Alternatively put an `<ng-template>` as the only child of your `<ng-rating>` element
     * @example
     * ```html
     * <ng-rating (rateChange)="this.ratingLabel = $event" [size]="6">
     *   <ng-template let-hovered="hovered">
     *    <span class="star" [class.filled]="hovered">&#9733;</span>
     *   </ng-template>
     * </ng-rating>
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgRatingComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgRatingComponent, "ng-rating", never, { "id": "id"; "ariaLabel": "aria-label"; "ariaLabelledby": "aria-labelledby"; "icon": "icon"; "cancelIcon": "cancelIcon"; "rating": "rating"; "size": "size"; "readonly": "readonly"; "disabled": "disabled"; "showCancelIcon": "showCancelIcon"; "ratingTemplate": "ratingTemplate"; }, { "rateChange": "rateChange"; "rateCancel": "rateCancel"; }, ["ratingLabelTemplate", "ratingTemplateContent"], ["[ngRatingLabel], ng-rating-label"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJuZy1yYXRpbmcuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0xBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IE5nUmF0aW5nTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL25nLXJhdGluZy1sYWJlbC5kaXJlY3RpdmUnO1xuLyoqXG4gKiBQcm92aWRlciB0aGF0IGFsbG93cyB0aGUgcmF0aW5nIGNvbXBvbmVudCB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogQGRvY3MtcHJpdmF0ZSBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTkdfUkFUSU5HX1ZBTFVFX0FDQ0VTU09SOiBhbnk7XG4vKipcbiAqIFJhdGluZyBpdGVtIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElSYXRpbmdDb250ZXh0IHtcbiAgICBob3ZlcmVkOiBib29sZWFuO1xufVxuLyoqXG4gKiBSYXRpbmcgY29tcG9uZW50cyBpcyBhIHN0YXIgYmFzZWQgc2VsZWN0aW9uIGlucHV0LlxuICogQSBzdGFyIHJhdGluZyB1c3VhbGx5IGNvbnNpc3RzIG9mIGltYWdlcyBvZiBzdGFycyB0aGF0IGNhbiBiZSB1c2VkIHRvIHJhdGUgYSBwYXJ0aWN1bGFyIGl0ZW0uXG4gKiBBIG1vdXNlIHVzZXIgaG92ZXJzIG92ZXIgdGhlIHN0YXJzIGFuZCBjbGlja3Mgb25lIHRvIHNlbGVjdCBpdC5cbiAqIEZvciBleGFtcGxlLCBpZiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHRoaXJkIHN0YXIgZnJvbSB0aGUgbGVmdCwgdGhlIHJhdGluZyBvZiB0aGUgaXRlbSBpcyAzIG9mIDUgc3RhcnMuXG4gKiBgYGBcbiAqIEBleGFtcGxlXG4gKiA8bmctcmF0aW5nIFtpbnB1dCBiaW5kaW5nc10+XG4gKiAgPG5nLXRlbXBsYXRlIG5nUmF0aW5nTGFiZWw+e3sgdGhpcy5yYXRpbmdMYWJlbCB9fTwvbmctdGVtcGxhdGU+XG4gKiA8L25nLXJhdGluZz5cbiAqIGBgYFxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTmdSYXRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgICByYXRpbmdzOiBJUmF0aW5nQ29udGV4dFtdO1xuICAgIC8qKiBDdXJyZW50bHkgc2VsZWN0ZWQgcmF0aW5nIGl0ZW0gaW5kZXhcbiAgICAgKiBAaGlkZGVuIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9zZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gICAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gICAgcmF0aW5nTGFiZWxUZW1wbGF0ZTogTmdSYXRpbmdMYWJlbERpcmVjdGl2ZTtcbiAgICBnZXQgc3RhclJhdGluZ0NsYXNzKCk6IGJvb2xlYW47XG4gICAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgcmF0aW5nIGlucHV0LiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICAgIGlkOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQXR0YWNoZWQgdG8gdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAgICogSW4gbW9zdCBjYXNlcywgYXJpYS1sYWJlbGxlZGJ5IHdpbGwgdGFrZSBwcmVjZWRlbmNlIHNvIHRoaXMgbWF5IGJlIG9taXR0ZWQuXG4gICAgICovXG4gICAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVXNlcnMgY2FuIHNwZWNpZnkgdGhlIGBhcmlhLWxhYmVsbGVkYnlgIGF0dHJpYnV0ZSB3aGljaCB3aWxsIGJlIGZvcndhcmRlZCB0byB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBhcmlhTGFiZWxsZWRieTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGdldCBhcmlhVmFsdWVNaW4oKTogbnVtYmVyO1xuICAgIGdldCBhcmlhVmFsdWVNYXgoKTogbnVtYmVyO1xuICAgIGdldCBhcmlhVmFsdWVOb3coKTogbnVtYmVyO1xuICAgIGdldCBhcmlhVmFsdWVUZXh0QXR0cigpOiBzdHJpbmc7XG4gICAgZ2V0IHJvbGUoKTogc3RyaW5nO1xuICAgIGdldCB0YWJpbmRleEF0dHIoKTogbnVtYmVyO1xuICAgIGdldCBhcmlhRGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICBnZXQgYXJpYVJlYWRvbmx5KCk6IGJvb2xlYW47XG4gICAgZ2V0IGFyaWFTZXRTaXplKCk6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBHZXRzL3NldHMgdGhlIGByYXRpbmdgIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAqIERldGVybWluZXMgc2VsZWN0ZWQgcmF0ZSBpdGVtcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGh0bWxcbiAgICAgKiA8bmctcmF0aW5nIFtyYXRpbmddPVwiNVwiPjwvbmctcmF0aW5nPlxuICAgICAqIGBgYFxuICAgICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgICAqL1xuICAgIGdldCByYXRpbmcoKTogbnVtYmVyO1xuICAgIHNldCByYXRpbmcodmFsdWU6IG51bWJlcik7XG4gICAgcHJpdmF0ZSBfcmF0aW5nO1xuICAgIC8qKlxuICAgICAqIEdldHMvc2V0cyB0aGUgYHNpemVgIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAqIFNldHMgbWF4IG51bWJlciBvZiByYXRlIGl0ZW1zLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgaHRtbFxuICAgICAqIDxuZy1yYXRpbmcgW3NpemVdPVwiNVwiPjwvbmctcmF0aW5nPlxuICAgICAqIGBgYFxuICAgICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgICAqL1xuICAgIGdldCBzaXplKCk6IG51bWJlcjtcbiAgICBzZXQgc2l6ZSh2YWx1ZTogbnVtYmVyKTtcbiAgICBwcml2YXRlIF9zaXplO1xuICAgIC8qKlxuICAgICAqIEdldHMvc2V0cyB0aGUgYHJlYWRvbmx5YCBwcm9wZXJ0eS5cbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSByYXRlIGNvbXBvbmVudCBpcyByZWFkb25seS5cbiAgICAgKiBCeSBkZWZhdWx0IGl0J3MgKipmYWxzZSoqLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgaHRtbFxuICAgICAqIDxuZy1yYXRpbmcgcmVhZG9ubHk+PC9uZy1yYXRpbmc+XG4gICAgICogYGBgXG4gICAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAgICovXG4gICAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW47XG4gICAgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKTtcbiAgICBwcml2YXRlIF9yZWFkb25seTtcbiAgICAvKipcbiAgICAgKiBHZXRzL3NldHMgdGhlIGBkaXNhYmxlZGAgcHJvcGVydHkuXG4gICAgICogV2hldGhlciB0aGUgcmF0ZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuXG4gICAgICogQnkgZGVmYXVsdCByYXRlIGl0ZW1zIGFyZSBjbGlja2FibGUgKGRpc2FibGVkPWZhbHNlKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGh0bWxcbiAgICAgKiA8bmctcmF0aW5nIGRpc2FibGVkPjwvbmctcmF0aW5nPlxuICAgICAqIGBgYFxuICAgICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgICAqL1xuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuO1xuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ7XG4gICAgLyoqXG4gICAgICogR2V0cy9zZXRzIHRoZSBgc2hvd0NhbmNlbEljb25gIHByb3BlcnR5LlxuICAgICAqIFdoZXRoZXIgdGhlIGNhbmNlbCAoY2xlYXIpIGljb24gaXMgdmlzaWJsZS5cbiAgICAgKiBCeSBkZWZhdWx0IGl0J3MgdmlzaWJsZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGh0bWxcbiAgICAgKiA8bmctcmF0aW5nIFtzaG93Q2FuY2VsSWNvbl09XCJmYWxzZVwiPjwvbmctcmF0aW5nPlxuICAgICAqIGBgYFxuICAgICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgICAqL1xuICAgIGdldCBzaG93Q2FuY2VsSWNvbigpOiBib29sZWFuO1xuICAgIHNldCBzaG93Q2FuY2VsSWNvbih2YWx1ZTogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfc2hvd0NhbmNlbEljb247XG4gICAgLyoqXG4gICAgICogR2V0cy9zZXRzIHRoZSBgaWNvbmAgZm9yIHRoZSByYXRlIGl0ZW0uXG4gICAgICogQnkgZGVmYXVsdCBpdCdzICoqZmFTdGFyKiogRm9udEF3ZXNvbWUgaWNvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGh0bWxcbiAgICAgKiA8bmctcmF0aW5nIFtpY29uXT1cImZhU3RhclwiPjwvbmctcmF0aW5nPlxuICAgICAqIGBgYFxuICAgICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgICAqL1xuICAgIGljb246IEljb25EZWZpbml0aW9uO1xuICAgIC8qKlxuICAgICAqIEdldHMvc2V0cyB0aGUgYGNhbmNlbEljb25gIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAqIEJ5IGRlZmF1bHQgaXQgdXNlcyAqKmZhQmFuKiogRm9udEF3ZXNvbWUgaWNvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGh0bWxcbiAgICAgKiA8bmctcmF0aW5nIFtjYW5jZWxJY29uXT1cImZhQmFuXCI+PC9uZy1yYXRpbmc+XG4gICAgICogYGBgXG4gICAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAgICovXG4gICAgY2FuY2VsSWNvbjogSWNvbkRlZmluaXRpb247XG4gICAgLyoqXG4gICAgICogQW4gZXZlbnQgdGhhdCBpcyBlbWl0dGVkIGFmdGVyIHRoZSByYXRlIGl0ZW0gaXMgY2xpY2tlZCBhbmQgc2V0LlxuICAgICAqIFByb3ZpZGVzIGEgbnVtYmVyIG9mIGNsaWNrZWQgaXRlbSAtIGV4LiAxLDIsMywgZXRjLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgaHRtbFxuICAgICAqIDxuZy1yYXRpbmcgW3JhdGVDaGFuZ2VdPVwiY2hhbmdlKCRldmVudClcIj48L25nLXJhdGluZz5cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICByYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPjtcbiAgICAvKipcbiAgICAgKiBBbiBldmVudCB0aGF0IGlzIGVtaXR0ZWQgYWZ0ZXIgdGhlIHJhdGluZyBpcyBjYW5jZWxlZCAoY2xlYXJlZCkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBodG1sXG4gICAgICogPG5nLXJhdGluZyBbcmF0ZUNhbmNlbF09XCJjYW5jZWwoJGV2ZW50KVwiPjwvbmctcmF0aW5nPlxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHJhdGVDYW5jZWw6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBUaGUgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgdGhlIHdheSBlYWNoIHN0YXIgaXMgZGlzcGxheWVkLlxuICAgICAqXG4gICAgICogQWx0ZXJuYXRpdmVseSBwdXQgYW4gYDxuZy10ZW1wbGF0ZT5gIGFzIHRoZSBvbmx5IGNoaWxkIG9mIHlvdXIgYDxuZy1yYXRpbmc+YCBlbGVtZW50XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBodG1sXG4gICAgICogPG5nLXJhdGluZyAocmF0ZUNoYW5nZSk9XCJ0aGlzLnJhdGluZ0xhYmVsID0gJGV2ZW50XCIgW3NpemVdPVwiNlwiPlxuICAgICAqICAgPG5nLXRlbXBsYXRlIGxldC1ob3ZlcmVkPVwiaG92ZXJlZFwiPlxuICAgICAqICAgIDxzcGFuIGNsYXNzPVwic3RhclwiIFtjbGFzcy5maWxsZWRdPVwiaG92ZXJlZFwiPiYjOTczMzs8L3NwYW4+XG4gICAgICogICA8L25nLXRlbXBsYXRlPlxuICAgICAqIDwvbmctcmF0aW5nPlxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHJhdGluZ1RlbXBsYXRlQ29udGVudDogVGVtcGxhdGVSZWY8SVJhdGluZ0NvbnRleHQ+O1xuICAgIHJhdGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJUmF0aW5nQ29udGV4dD47XG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQ7XG4gICAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gICAgaG92ZXJlZEl0ZW0oaW5kZXg6IG51bWJlcik6IHZvaWQ7XG4gICAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gICAgaGFuZGxlQ2xpY2soaW5kZXg6IG51bWJlcik6IHZvaWQ7XG4gICAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gICAgY2FuY2VsKCk6IHZvaWQ7XG4gICAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gICAgbW91c2VMZWF2ZSgpOiB2b2lkO1xuICAgIGJsdXIoKTogdm9pZDtcbiAgICAvKiogSGFuZGxlIHJhdGluZyB1c2luZyBhcnJvdyBrZXlzIGFuZCBob21lL2VuZCBrZXlzICovXG4gICAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQ7XG4gICAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gICAgd3JpdGVWYWx1ZShyYXRpbmc6IG51bWJlcik6IHZvaWQ7XG4gICAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkO1xuICAgIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkO1xuICAgIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICAgIHNldERpc2FibGVkU3RhdGUodmFsdWU6IGJvb2xlYW4pOiB2b2lkO1xuICAgIHByaXZhdGUgdXBkYXRlO1xuICAgIHByaXZhdGUgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm47XG4gICAgcHJpdmF0ZSBvblRvdWNoZWQ7XG4gICAgcHJpdmF0ZSByYXRpbmdzSG92ZXI7XG4gICAgcHJpdmF0ZSBnZXQgYXJpYVZhbHVlVGV4dCgpO1xufVxuIl19