import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, Output, EventEmitter, forwardRef, Input, HostBinding, ContentChild, HostListener, ViewEncapsulation, TemplateRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { faStar, faBan } from '@fortawesome/free-solid-svg-icons';
import { RATING_SIZE_ERROR, RATE_SET_ERROR } from './ng-rating.error';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { NgRatingLabelDirective } from './ng-rating-label.directive';
import { Key } from '../util/key';
/**
 * Provider that allows the rating component to register as a ControlValueAccessor.
 * @docs-private @internal
 */
export const NG_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgRatingComponent),
    multi: true,
};
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
let NgRatingComponent = class NgRatingComponent {
    constructor() {
        /** Currently selected rating item index
         * @hidden @internal
         */
        this._selectedIndex = -1;
        /** A unique id for the rating input. If none is supplied, it will be auto-generated. */
        this.id = `ng-star-rating-${UNIQUE_ID++}`;
        /**
         * Attached to the aria-label attribute of the host element.
         * In most cases, aria-labelledby will take precedence so this may be omitted.
         */
        this.ariaLabel = 'star';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element.
         */
        this.ariaLabelledby = 'Star rating';
        this._size = 5;
        this._readonly = false;
        this._disabled = false;
        this._showCancelIcon = false;
        /**
         * Gets/sets the `icon` for the rate item.
         * By default it's **faStar** FontAwesome icon.
         * @example
         * ```html
         * <ng-rating [icon]="faStar"></ng-rating>
         * ```
         * @memberOf NgRatingComponent
         */
        this.icon = faStar;
        /**
         * Gets/sets the `cancelIcon` for the component.
         * By default it uses **faBan** FontAwesome icon.
         * @example
         * ```html
         * <ng-rating [cancelIcon]="faBan"></ng-rating>
         * ```
         * @memberOf NgRatingComponent
         */
        this.cancelIcon = faBan;
        /**
         * An event that is emitted after the rate item is clicked and set.
         * Provides a number of clicked item - ex. 1,2,3, etc.
         * @example
         * ```html
         * <ng-rating [rateChange]="change($event)"></ng-rating>
         * ```
         */
        this.rateChange = new EventEmitter();
        /**
         * An event that is emitted after the rating is canceled (cleared).
         * @example
         * ```html
         * <ng-rating [rateCancel]="cancel($event)"></ng-rating>
         * ```
         */
        this.rateCancel = new EventEmitter();
        // Function to call when the rating changes.
        this._controlValueAccessorChangeFn = () => { };
        // Function to call when the input is touched (when a star is clicked).
        this.onTouched = () => { };
    }
    get starRatingClass() {
        return true;
    }
    get ariaValueMin() {
        return 0;
    }
    get ariaValueMax() {
        return this.size;
    }
    get ariaValueNow() {
        return this._selectedIndex + 1;
    }
    get ariaValueTextAttr() {
        return this.ariaValueText;
    }
    get role() {
        return 'slider';
    }
    get tabindexAttr() {
        return this.disabled ? -1 : 0;
    }
    get ariaDisabled() {
        return this.disabled;
    }
    get ariaReadonly() {
        return this.readonly;
    }
    get ariaSetSize() {
        return this.size;
    }
    /**
     * Gets/sets the `rating` for the component.
     * Determines selected rate items.
     * @example
     * ```html
     * <ng-rating [rating]="5"></ng-rating>
     * ```
     * @memberOf NgRatingComponent
     */
    get rating() {
        return this._rating;
    }
    set rating(value) {
        if (value <= 0) {
            RATE_SET_ERROR();
        }
        this._rating = coerceNumberProperty(value);
    }
    /**
     * Gets/sets the `size` for the component.
     * Sets max number of rate items.
     * @example
     * ```html
     * <ng-rating [size]="5"></ng-rating>
     * ```
     * @memberOf NgRatingComponent
     */
    get size() {
        return this._size;
    }
    set size(value) {
        if (value <= 0) {
            RATING_SIZE_ERROR();
        }
        this._size = coerceNumberProperty(value);
        this.ratings = Array.from(new Array(value)).map(() => {
            const rating = {
                hovered: false,
            };
            return rating;
        });
    }
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
    get readonly() {
        return this._readonly;
    }
    set readonly(value) {
        this._readonly = coerceBooleanProperty(value);
    }
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
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
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
    get showCancelIcon() {
        return this._showCancelIcon;
    }
    set showCancelIcon(value) {
        this._showCancelIcon = coerceBooleanProperty(value);
    }
    ngOnChanges(changes) {
        if ('rating' in changes && changes.rating.currentValue > 0) {
            this.ratingsHover(this.rating - 1);
            this._selectedIndex = this.rating - 1;
        }
    }
    /** @hidden @internal */
    hoveredItem(index) {
        if (!this.readonly) {
            this.ratingsHover(index);
        }
    }
    /** @hidden @internal */
    handleClick(index) {
        if (!this.readonly) {
            this.update(index);
        }
    }
    /** @hidden @internal */
    cancel() {
        this._selectedIndex = -1;
        this.ratings.forEach((item) => (item.hovered = false));
        this.rateCancel.emit();
    }
    /** @hidden @internal */
    mouseLeave() {
        if (!this.readonly) {
            this.ratings.forEach((item, index) => (item.hovered = !(index > this._selectedIndex)));
        }
    }
    blur() {
        this.onTouched();
    }
    /** Handle rating using arrow keys and home/end keys */
    handleKeyDown(event) {
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
    writeValue(rating) {
        if (rating) {
            this._controlValueAccessorChangeFn(rating);
            this.rating = rating;
            this._selectedIndex = rating - 1;
            this.ratingsHover(rating - 1);
        }
    }
    /** @hidden @internal */
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    /** @hidden @internal */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /** @hidden @internal */
    setDisabledState(value) {
        this.disabled = value;
    }
    update(index) {
        this._selectedIndex = index;
        this.hoveredItem(this._selectedIndex);
        this.onTouched();
        this.rateChange.emit(index + 1);
    }
    ratingsHover(index) {
        this.ratings.forEach((item, i) => (item.hovered = index >= i));
    }
    get ariaValueText() {
        return `${this._selectedIndex + 1} out of ${this.size}`;
    }
};
__decorate([
    ContentChild(NgRatingLabelDirective)
], NgRatingComponent.prototype, "ratingLabelTemplate", void 0);
__decorate([
    HostBinding('class.ng-star-rating')
], NgRatingComponent.prototype, "starRatingClass", null);
__decorate([
    HostBinding('attr.id'),
    Input()
], NgRatingComponent.prototype, "id", void 0);
__decorate([
    HostBinding('attr.aria-label'),
    Input('aria-label')
], NgRatingComponent.prototype, "ariaLabel", void 0);
__decorate([
    HostBinding('attr.aria-labelledby'),
    Input('aria-labelledby')
], NgRatingComponent.prototype, "ariaLabelledby", void 0);
__decorate([
    HostBinding('attr.aria-valuemin')
], NgRatingComponent.prototype, "ariaValueMin", null);
__decorate([
    HostBinding('attr.aria-valuemax')
], NgRatingComponent.prototype, "ariaValueMax", null);
__decorate([
    HostBinding('attr.aria-valuenow')
], NgRatingComponent.prototype, "ariaValueNow", null);
__decorate([
    HostBinding('attr.aria-valuetext')
], NgRatingComponent.prototype, "ariaValueTextAttr", null);
__decorate([
    HostBinding('attr.role')
], NgRatingComponent.prototype, "role", null);
__decorate([
    HostBinding('attr.tabindex')
], NgRatingComponent.prototype, "tabindexAttr", null);
__decorate([
    HostBinding('attr.aria-disabled')
], NgRatingComponent.prototype, "ariaDisabled", null);
__decorate([
    HostBinding('attr.aria-readonly')
], NgRatingComponent.prototype, "ariaReadonly", null);
__decorate([
    HostBinding('attr.aria-setsize')
], NgRatingComponent.prototype, "ariaSetSize", null);
__decorate([
    Input()
], NgRatingComponent.prototype, "rating", null);
__decorate([
    Input()
], NgRatingComponent.prototype, "size", null);
__decorate([
    Input()
], NgRatingComponent.prototype, "readonly", null);
__decorate([
    Input()
], NgRatingComponent.prototype, "disabled", null);
__decorate([
    Input()
], NgRatingComponent.prototype, "showCancelIcon", null);
__decorate([
    Input()
], NgRatingComponent.prototype, "icon", void 0);
__decorate([
    Input()
], NgRatingComponent.prototype, "cancelIcon", void 0);
__decorate([
    Output()
], NgRatingComponent.prototype, "rateChange", void 0);
__decorate([
    Output()
], NgRatingComponent.prototype, "rateCancel", void 0);
__decorate([
    ContentChild(TemplateRef, { static: false })
], NgRatingComponent.prototype, "ratingTemplateContent", void 0);
__decorate([
    Input()
], NgRatingComponent.prototype, "ratingTemplate", void 0);
__decorate([
    HostListener('mouseleave')
], NgRatingComponent.prototype, "mouseLeave", null);
__decorate([
    HostListener('blur')
], NgRatingComponent.prototype, "blur", null);
__decorate([
    HostListener('keydown', ['$event'])
], NgRatingComponent.prototype, "handleKeyDown", null);
NgRatingComponent = __decorate([
    Component({
        selector: 'ng-rating',
        template: "<button *ngIf=\"showCancelIcon\" class=\"ng-rating-cancel\" (click)=\"cancel()\">\n  <fa-icon [icon]=\"cancelIcon\"></fa-icon>\n</button>\n<ng-container *ngFor=\"let rating of ratings; let index = index\">\n  <button\n    type=\"button\"\n    class=\"ng-rating-item\"\n    [attr.aria-selected]=\"_selectedIndex === index\"\n    [attr.aria-posinset]=\"index + 1\"\n    [disabled]=\"disabled\"\n    [class.ng-rating-item-disabled]=\"disabled\"\n    (mouseenter)=\"hoveredItem(index)\"\n    (click)=\"handleClick(index)\"\n  >\n    <ng-container\n      *ngTemplateOutlet=\"ratingTemplateContent || ratingTemplate || defaultTemplate; context: rating\"\n    ></ng-container>\n  </button>\n</ng-container>\n\n<ng-content select=\"[ngRatingLabel], ng-rating-label\"></ng-content>\n\n<ng-template #defaultTemplate let-hovered=\"hovered\">\n  <fa-icon [class.ng-rating-item-icon-hover]=\"hovered\" class=\"ng-rating-item-icon\" [icon]=\"icon\"></fa-icon>\n</ng-template>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [NG_RATING_VALUE_ACCESSOR],
        encapsulation: ViewEncapsulation.None,
        styles: [":host{display:inline-flex;flex-direction:row;flex-wrap:wrap;outline:0}.ng-rating-item{border:none;outline:0;background:0 0}.ng-rating-item-icon{font-size:1.875rem;transition:.3s}.ng-rating-item-disabled{pointer-events:none;opacity:.7}.ng-rating-item-icon-hover{color:gold;cursor:pointer}.ng-rating-cancel{border:none;outline:0;background:0 0}.ng-rating-cancel fa-icon{font-size:1.875rem;color:#dc143c}.ng-rating-cancel fa-icon:hover{cursor:pointer}.ng-rating-label{display:inline-flex;align-self:center;padding-left:1rem;font-size:1.875rem}"]
    })
], NgRatingComponent);
export { NgRatingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXJhdGluZy8iLCJzb3VyY2VzIjpbImxpYi9uZy1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsV0FBVyxFQUNYLFlBQVksRUFHWixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbEM7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQVNGLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUVsQjs7Ozs7Ozs7Ozs7OztHQWFHO0FBU0gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFBOUI7UUFJRTs7V0FFRztRQUNJLG1CQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFTM0Isd0ZBQXdGO1FBR2pGLE9BQUUsR0FB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aGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgQ29udGVudENoaWxkLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZhU3RhciwgZmFCYW4sIEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IFJBVElOR19TSVpFX0VSUk9SLCBSQVRFX1NFVF9FUlJPUiB9IGZyb20gJy4vbmctcmF0aW5nLmVycm9yJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgTmdSYXRpbmdMYWJlbERpcmVjdGl2ZSB9IGZyb20gJy4vbmctcmF0aW5nLWxhYmVsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi91dGlsL2tleSc7XG5cbi8qKlxuICogUHJvdmlkZXIgdGhhdCBhbGxvd3MgdGhlIHJhdGluZyBjb21wb25lbnQgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIEBkb2NzLXByaXZhdGUgQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBOR19SQVRJTkdfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nUmF0aW5nQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG4vKipcbiAqIFJhdGluZyBpdGVtIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElSYXRpbmdDb250ZXh0IHtcbiAgaG92ZXJlZDogYm9vbGVhbjtcbn1cblxubGV0IFVOSVFVRV9JRCA9IDA7XG5cbi8qKlxuICogUmF0aW5nIGNvbXBvbmVudHMgaXMgYSBzdGFyIGJhc2VkIHNlbGVjdGlvbiBpbnB1dC5cbiAqIEEgc3RhciByYXRpbmcgdXN1YWxseSBjb25zaXN0cyBvZiBpbWFnZXMgb2Ygc3RhcnMgdGhhdCBjYW4gYmUgdXNlZCB0byByYXRlIGEgcGFydGljdWxhciBpdGVtLlxuICogQSBtb3VzZSB1c2VyIGhvdmVycyBvdmVyIHRoZSBzdGFycyBhbmQgY2xpY2tzIG9uZSB0byBzZWxlY3QgaXQuXG4gKiBGb3IgZXhhbXBsZSwgaWYgdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSB0aGlyZCBzdGFyIGZyb20gdGhlIGxlZnQsIHRoZSByYXRpbmcgb2YgdGhlIGl0ZW0gaXMgMyBvZiA1IHN0YXJzLlxuICogYGBgXG4gKiBAZXhhbXBsZVxuICogPG5nLXJhdGluZyBbaW5wdXQgYmluZGluZ3NdPlxuICogIDxuZy10ZW1wbGF0ZSBuZ1JhdGluZ0xhYmVsPnt7IHRoaXMucmF0aW5nTGFiZWwgfX08L25nLXRlbXBsYXRlPlxuICogPC9uZy1yYXRpbmc+XG4gKiBgYGBcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXJhdGluZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZy1yYXRpbmcuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW05HX1JBVElOR19WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE5nUmF0aW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgcmF0aW5nczogSVJhdGluZ0NvbnRleHRbXTtcblxuICAvKiogQ3VycmVudGx5IHNlbGVjdGVkIHJhdGluZyBpdGVtIGluZGV4XG4gICAqIEBoaWRkZW4gQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgX3NlbGVjdGVkSW5kZXggPSAtMTtcblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgQENvbnRlbnRDaGlsZChOZ1JhdGluZ0xhYmVsRGlyZWN0aXZlKSBwdWJsaWMgcmF0aW5nTGFiZWxUZW1wbGF0ZTogTmdSYXRpbmdMYWJlbERpcmVjdGl2ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5nLXN0YXItcmF0aW5nJykgZ2V0IHN0YXJSYXRpbmdDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIHJhdGluZyBpbnB1dC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgQElucHV0KClcbiAgcHVibGljIGlkID0gYG5nLXN0YXItcmF0aW5nLSR7VU5JUVVFX0lEKyt9YDtcblxuICAvKipcbiAgICogQXR0YWNoZWQgdG8gdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqIEluIG1vc3QgY2FzZXMsIGFyaWEtbGFiZWxsZWRieSB3aWxsIHRha2UgcHJlY2VkZW5jZSBzbyB0aGlzIG1heSBiZSBvbWl0dGVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWwnKVxuICBASW5wdXQoJ2FyaWEtbGFiZWwnKVxuICBwdWJsaWMgYXJpYUxhYmVsID0gJ3N0YXInO1xuXG4gIC8qKlxuICAgKiBVc2VycyBjYW4gc3BlY2lmeSB0aGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHdoaWNoIHdpbGwgYmUgZm9yd2FyZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWxsZWRieScpXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JylcbiAgcHVibGljIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnU3RhciByYXRpbmcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbWluJykgZ2V0IGFyaWFWYWx1ZU1pbigpOiBudW1iZXIge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtdmFsdWVtYXgnKSBnZXQgYXJpYVZhbHVlTWF4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbm93JykgZ2V0IGFyaWFWYWx1ZU5vdygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4ICsgMTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVldGV4dCcpIGdldCBhcmlhVmFsdWVUZXh0QXR0cigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFWYWx1ZVRleHQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIGdldCByb2xlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdzbGlkZXInO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRhYmluZGV4JykgZ2V0IHRhYmluZGV4QXR0cigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gLTEgOiAwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGlzYWJsZWQnKSBnZXQgYXJpYURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtcmVhZG9ubHknKSBnZXQgYXJpYVJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlYWRvbmx5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2V0c2l6ZScpIGdldCBhcmlhU2V0U2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgcmF0aW5nYCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICogRGV0ZXJtaW5lcyBzZWxlY3RlZCByYXRlIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3JhdGluZ109XCI1XCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgcmF0aW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3JhdGluZztcbiAgfVxuICBwdWJsaWMgc2V0IHJhdGluZyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDw9IDApIHtcbiAgICAgIFJBVEVfU0VUX0VSUk9SKCk7XG4gICAgfVxuICAgIHRoaXMuX3JhdGluZyA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yYXRpbmc6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgc2l6ZWAgZm9yIHRoZSBjb21wb25lbnQuXG4gICAqIFNldHMgbWF4IG51bWJlciBvZiByYXRlIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3NpemVdPVwiNVwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNpemUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8PSAwKSB7XG4gICAgICBSQVRJTkdfU0laRV9FUlJPUigpO1xuICAgIH1cblxuICAgIHRoaXMuX3NpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5yYXRpbmdzID0gQXJyYXkuZnJvbShuZXcgQXJyYXkodmFsdWUpKS5tYXAoKCkgPT4ge1xuICAgICAgY29uc3QgcmF0aW5nOiBJUmF0aW5nQ29udGV4dCA9IHtcbiAgICAgICAgaG92ZXJlZDogZmFsc2UsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJhdGluZztcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIF9zaXplID0gNTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgcmVhZG9ubHlgIHByb3BlcnR5LlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSByYXRlIGNvbXBvbmVudCBpcyByZWFkb25seS5cbiAgICogQnkgZGVmYXVsdCBpdCdzICoqZmFsc2UqKi5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8bmctcmF0aW5nIHJlYWRvbmx5PjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBwdWJsaWMgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEdldHMvc2V0cyB0aGUgYGRpc2FibGVkYCBwcm9wZXJ0eS5cbiAgICogV2hldGhlciB0aGUgcmF0ZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuXG4gICAqIEJ5IGRlZmF1bHQgcmF0ZSBpdGVtcyBhcmUgY2xpY2thYmxlIChkaXNhYmxlZD1mYWxzZSkuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBkaXNhYmxlZD48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgcHVibGljIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGBzaG93Q2FuY2VsSWNvbmAgcHJvcGVydHkuXG4gICAqIFdoZXRoZXIgdGhlIGNhbmNlbCAoY2xlYXIpIGljb24gaXMgdmlzaWJsZS5cbiAgICogQnkgZGVmYXVsdCBpdCdzIHZpc2libGUuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBbc2hvd0NhbmNlbEljb25dPVwiZmFsc2VcIj48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBzaG93Q2FuY2VsSWNvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0NhbmNlbEljb247XG4gIH1cbiAgcHVibGljIHNldCBzaG93Q2FuY2VsSWNvbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dDYW5jZWxJY29uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9zaG93Q2FuY2VsSWNvbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGBpY29uYCBmb3IgdGhlIHJhdGUgaXRlbS5cbiAgICogQnkgZGVmYXVsdCBpdCdzICoqZmFTdGFyKiogRm9udEF3ZXNvbWUgaWNvbi5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8bmctcmF0aW5nIFtpY29uXT1cImZhU3RhclwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgaWNvbjogSWNvbkRlZmluaXRpb24gPSBmYVN0YXI7XG5cbiAgLyoqXG4gICAqIEdldHMvc2V0cyB0aGUgYGNhbmNlbEljb25gIGZvciB0aGUgY29tcG9uZW50LlxuICAgKiBCeSBkZWZhdWx0IGl0IHVzZXMgKipmYUJhbioqIEZvbnRBd2Vzb21lIGljb24uXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBbY2FuY2VsSWNvbl09XCJmYUJhblwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsSWNvbjogSWNvbkRlZmluaXRpb24gPSBmYUJhbjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgdGhhdCBpcyBlbWl0dGVkIGFmdGVyIHRoZSByYXRlIGl0ZW0gaXMgY2xpY2tlZCBhbmQgc2V0LlxuICAgKiBQcm92aWRlcyBhIG51bWJlciBvZiBjbGlja2VkIGl0ZW0gLSBleC4gMSwyLDMsIGV0Yy5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8bmctcmF0aW5nIFtyYXRlQ2hhbmdlXT1cImNoYW5nZSgkZXZlbnQpXCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgdGhhdCBpcyBlbWl0dGVkIGFmdGVyIHRoZSByYXRpbmcgaXMgY2FuY2VsZWQgKGNsZWFyZWQpLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3JhdGVDYW5jZWxdPVwiY2FuY2VsKCRldmVudClcIj48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqL1xuICBAT3V0cHV0KCkgcHVibGljIHJhdGVDYW5jZWw6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogVGhlIHRlbXBsYXRlIHRvIG92ZXJyaWRlIHRoZSB3YXkgZWFjaCBzdGFyIGlzIGRpc3BsYXllZC5cbiAgICpcbiAgICogQWx0ZXJuYXRpdmVseSBwdXQgYW4gYDxuZy10ZW1wbGF0ZT5gIGFzIHRoZSBvbmx5IGNoaWxkIG9mIHlvdXIgYDxuZy1yYXRpbmc+YCBlbGVtZW50XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyAocmF0ZUNoYW5nZSk9XCJ0aGlzLnJhdGluZ0xhYmVsID0gJGV2ZW50XCIgW3NpemVdPVwiNlwiPlxuICAgKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaG92ZXJlZD1cImhvdmVyZWRcIj5cbiAgICogICAgPHNwYW4gY2xhc3M9XCJzdGFyXCIgW2NsYXNzLmZpbGxlZF09XCJob3ZlcmVkXCI+JiM5NzMzOzwvc3Bhbj5cbiAgICogICA8L25nLXRlbXBsYXRlPlxuICAgKiA8L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqL1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiBmYWxzZSB9KSByYXRpbmdUZW1wbGF0ZUNvbnRlbnQ6IFRlbXBsYXRlUmVmPElSYXRpbmdDb250ZXh0PjtcbiAgQElucHV0KCkgcmF0aW5nVGVtcGxhdGU6IFRlbXBsYXRlUmVmPElSYXRpbmdDb250ZXh0PjtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCdyYXRpbmcnIGluIGNoYW5nZXMgJiYgY2hhbmdlcy5yYXRpbmcuY3VycmVudFZhbHVlID4gMCkge1xuICAgICAgdGhpcy5yYXRpbmdzSG92ZXIodGhpcy5yYXRpbmcgLSAxKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSB0aGlzLnJhdGluZyAtIDE7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyBob3ZlcmVkSXRlbShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLnJhdGluZ3NIb3ZlcihpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyBoYW5kbGVDbGljayhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLnVwZGF0ZShpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgIHRoaXMucmF0aW5ncy5mb3JFYWNoKChpdGVtOiBJUmF0aW5nQ29udGV4dCkgPT4gKGl0ZW0uaG92ZXJlZCA9IGZhbHNlKSk7XG4gICAgdGhpcy5yYXRlQ2FuY2VsLmVtaXQoKTtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgcHVibGljIG1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLnJhdGluZ3MuZm9yRWFjaCgoaXRlbTogSVJhdGluZ0NvbnRleHQsIGluZGV4KSA9PiAoaXRlbS5ob3ZlcmVkID0gIShpbmRleCA+IHRoaXMuX3NlbGVjdGVkSW5kZXgpKSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHB1YmxpYyBibHVyKCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cblxuICAvKiogSGFuZGxlIHJhdGluZyB1c2luZyBhcnJvdyBrZXlzIGFuZCBob21lL2VuZCBrZXlzICovXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBwdWJsaWMgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgY2FzZSBLZXkuQXJyb3dMZWZ0OlxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleC0tO1xuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4IDwgdGhpcy5zaXplIC0gMSkge1xuICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXgrKztcbiAgICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLl9zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkhvbWU6XG4gICAgICAgIHRoaXMudXBkYXRlKDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkVuZDpcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5zaXplIC0gMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHdyaXRlVmFsdWUocmF0aW5nOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocmF0aW5nKSB7XG4gICAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKHJhdGluZyk7XG4gICAgICB0aGlzLnJhdGluZyA9IHJhdGluZztcbiAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSByYXRpbmcgLSAxO1xuICAgICAgdGhpcy5yYXRpbmdzSG92ZXIocmF0aW5nIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIHRoaXMuaG92ZXJlZEl0ZW0odGhpcy5fc2VsZWN0ZWRJbmRleCk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB0aGlzLnJhdGVDaGFuZ2UuZW1pdChpbmRleCArIDEpO1xuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSByYXRpbmcgY2hhbmdlcy5cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvLyBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGlucHV0IGlzIHRvdWNoZWQgKHdoZW4gYSBzdGFyIGlzIGNsaWNrZWQpLlxuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSByYXRpbmdzSG92ZXIoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmF0aW5ncy5mb3JFYWNoKChpdGVtOiBJUmF0aW5nQ29udGV4dCwgaSkgPT4gKGl0ZW0uaG92ZXJlZCA9IGluZGV4ID49IGkpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGFyaWFWYWx1ZVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5fc2VsZWN0ZWRJbmRleCArIDF9IG91dCBvZiAke3RoaXMuc2l6ZX1gO1xuICB9XG59XG4iXX0=