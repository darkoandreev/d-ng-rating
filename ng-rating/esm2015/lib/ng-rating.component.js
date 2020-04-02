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
        styles: [":host{display:inline-flex;flex-direction:row;flex-wrap:wrap;outline:0}.ng-rating-item{border:none;outline:0}.ng-rating-item-icon{font-size:1.875rem;transition:.3s}.ng-rating-item-disabled{pointer-events:none;opacity:.7}.ng-rating-item-icon-hover{color:gold;cursor:pointer}.ng-rating-cancel{border:none;outline:0}.ng-rating-cancel fa-icon{font-size:1.875rem;color:#dc143c}.ng-rating-cancel fa-icon:hover{cursor:pointer}.ng-rating-label{display:inline-flex;align-self:center;padding-left:1rem;font-size:1.875rem}"]
    })
], NgRatingComponent);
export { NgRatingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXJhdGluZy8iLCJzb3VyY2VzIjpbImxpYi9uZy1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsV0FBVyxFQUNYLFlBQVksRUFHWixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbEM7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQVNGLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUVsQjs7Ozs7Ozs7Ozs7OztHQWFHO0FBU0gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFBOUI7UUFJRTs7V0FFRztRQUNJLG1CQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFTM0Isd0ZBQXdGO1FBR2pGLE9BQUUsR0FB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QUFDLGVBQWUsQ0FBQztxREFFNUI7QUFFa0M7SUFBbEMsV0FBVyxDQUFDLG9CQUFvQixDQUFDO3FEQUVqQztBQUVrQztJQUFsQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7cURBRWpDO0FBRWlDO0lBQWpDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQztvREFFaEM7QUFZRDtJQURDLEtBQUssRUFBRTsrQ0FHUDtBQW1CRDtJQURDLEtBQUssRUFBRTs2Q0FHUDtBQTJCRDtJQURDLEtBQUssRUFBRTtpREFHUDtBQWlCRDtJQURDLEtBQUssRUFBRTtpREFHUDtBQWlCRDtJQURDLEtBQUssRUFBRTt1REFHUDtBQWVRO0lBQVIsS0FBSyxFQUFFOytDQUFzQztBQVdyQztJQUFSLEtBQUssRUFBRTtxREFBMkM7QUFVekM7SUFBVCxNQUFNLEVBQUU7cURBQThEO0FBUzdEO0lBQVQsTUFBTSxFQUFFO3FEQUE0RDtBQWV2QjtJQUE3QyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO2dFQUFvRDtBQUN4RjtJQUFSLEtBQUssRUFBRTt5REFBNkM7QUFnQ3JEO0lBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzttREFLMUI7QUFHRDtJQURDLFlBQVksQ0FBQyxNQUFNLENBQUM7NkNBR3BCO0FBSUQ7SUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7c0RBNEJuQztBQWpUVSxpQkFBaUI7SUFSN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsKzhCQUF5QztRQUV6QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztRQUNyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7S0FDdEMsQ0FBQztHQUNXLGlCQUFpQixDQWdXN0I7U0FoV1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgQ29udGVudENoaWxkLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZhU3RhciwgZmFCYW4sIEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IFJBVElOR19TSVpFX0VSUk9SLCBSQVRFX1NFVF9FUlJPUiB9IGZyb20gJy4vbmctcmF0aW5nLmVycm9yJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgTmdSYXRpbmdMYWJlbERpcmVjdGl2ZSB9IGZyb20gJy4vbmctcmF0aW5nLWxhYmVsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi91dGlsL2tleSc7XG5cbi8qKlxuICogUHJvdmlkZXIgdGhhdCBhbGxvd3MgdGhlIHJhdGluZyBjb21wb25lbnQgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIEBkb2NzLXByaXZhdGUgQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBOR19SQVRJTkdfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nUmF0aW5nQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG4vKipcbiAqIFJhdGluZyBpdGVtIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElSYXRpbmdDb250ZXh0IHtcbiAgaG92ZXJlZDogYm9vbGVhbjtcbn1cblxubGV0IFVOSVFVRV9JRCA9IDA7XG5cbi8qKlxuICogUmF0aW5nIGNvbXBvbmVudHMgaXMgYSBzdGFyIGJhc2VkIHNlbGVjdGlvbiBpbnB1dC5cbiAqIEEgc3RhciByYXRpbmcgdXN1YWxseSBjb25zaXN0cyBvZiBpbWFnZXMgb2Ygc3RhcnMgdGhhdCBjYW4gYmUgdXNlZCB0byByYXRlIGEgcGFydGljdWxhciBpdGVtLlxuICogQSBtb3VzZSB1c2VyIGhvdmVycyBvdmVyIHRoZSBzdGFycyBhbmQgY2xpY2tzIG9uZSB0byBzZWxlY3QgaXQuXG4gKiBGb3IgZXhhbXBsZSwgaWYgdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSB0aGlyZCBzdGFyIGZyb20gdGhlIGxlZnQsIHRoZSByYXRpbmcgb2YgdGhlIGl0ZW0gaXMgMyBvZiA1IHN0YXJzLlxuICogYGBgXG4gKiBAZXhhbXBsZVxuICogPG5nLXJhdGluZyBbaW5wdXQgYmluZGluZ3NdPlxuICogIDxuZy10ZW1wbGF0ZSBuZ1JhdGluZ0xhYmVsPnt7IHRoaXMucmF0aW5nTGFiZWwgfX08L25nLXRlbXBsYXRlPlxuICogPC9uZy1yYXRpbmc+XG4gKiBgYGBcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXJhdGluZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZy1yYXRpbmcuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW05HX1JBVElOR19WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE5nUmF0aW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgcmF0aW5nczogSVJhdGluZ0NvbnRleHRbXTtcblxuICAvKiogQ3VycmVudGx5IHNlbGVjdGVkIHJhdGluZyBpdGVtIGluZGV4XG4gICAqIEBoaWRkZW4gQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgX3NlbGVjdGVkSW5kZXggPSAtMTtcblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgQENvbnRlbnRDaGlsZChOZ1JhdGluZ0xhYmVsRGlyZWN0aXZlKSBwdWJsaWMgcmF0aW5nTGFiZWxUZW1wbGF0ZTogTmdSYXRpbmdMYWJlbERpcmVjdGl2ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5nLXN0YXItcmF0aW5nJykgZ2V0IHN0YXJSYXRpbmdDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIHJhdGluZyBpbnB1dC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgQElucHV0KClcbiAgcHVibGljIGlkID0gYG5nLXN0YXItcmF0aW5nLSR7VU5JUVVFX0lEKyt9YDtcblxuICAvKipcbiAgICogQXR0YWNoZWQgdG8gdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqIEluIG1vc3QgY2FzZXMsIGFyaWEtbGFiZWxsZWRieSB3aWxsIHRha2UgcHJlY2VkZW5jZSBzbyB0aGlzIG1heSBiZSBvbWl0dGVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWwnKVxuICBASW5wdXQoJ2FyaWEtbGFiZWwnKVxuICBwdWJsaWMgYXJpYUxhYmVsID0gJ3N0YXInO1xuXG4gIC8qKlxuICAgKiBVc2VycyBjYW4gc3BlY2lmeSB0aGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHdoaWNoIHdpbGwgYmUgZm9yd2FyZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWxsZWRieScpXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JylcbiAgcHVibGljIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnU3RhciByYXRpbmcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbWluJykgZ2V0IGFyaWFWYWx1ZU1pbigpOiBudW1iZXIge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtdmFsdWVtYXgnKSBnZXQgYXJpYVZhbHVlTWF4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbm93JykgZ2V0IGFyaWFWYWx1ZU5vdygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4ICsgMTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVldGV4dCcpIGdldCBhcmlhVmFsdWVUZXh0QXR0cigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFWYWx1ZVRleHQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIGdldCByb2xlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdzbGlkZXInO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRhYmluZGV4JykgZ2V0IHRhYmluZGV4QXR0cigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gLTEgOiAwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGlzYWJsZWQnKSBnZXQgYXJpYURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtcmVhZG9ubHknKSBnZXQgYXJpYVJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlYWRvbmx5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2V0c2l6ZScpIGdldCBhcmlhU2V0U2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgcmF0aW5nYCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICogRGV0ZXJtaW5lcyBzZWxlY3RlZCByYXRlIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3JhdGluZ109XCI1XCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgcmF0aW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3JhdGluZztcbiAgfVxuICBwdWJsaWMgc2V0IHJhdGluZyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDw9IDApIHtcbiAgICAgIFJBVEVfU0VUX0VSUk9SKCk7XG4gICAgfVxuICAgIHRoaXMuX3JhdGluZyA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yYXRpbmc6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgc2l6ZWAgZm9yIHRoZSBjb21wb25lbnQuXG4gICAqIFNldHMgbWF4IG51bWJlciBvZiByYXRlIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3NpemVdPVwiNVwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNpemUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8PSAwKSB7XG4gICAgICBSQVRJTkdfU0laRV9FUlJPUigpO1xuICAgIH1cblxuICAgIHRoaXMuX3NpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5yYXRpbmdzID0gQXJyYXkuZnJvbShuZXcgQXJyYXkodmFsdWUpKS5tYXAoKCkgPT4ge1xuICAgICAgY29uc3QgcmF0aW5nOiBJUmF0aW5nQ29udGV4dCA9IHtcbiAgICAgICAgaG92ZXJlZDogZmFsc2UsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJhdGluZztcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIF9zaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEdldHMvc2V0cyB0aGUgYHJlYWRvbmx5YCBwcm9wZXJ0eS5cbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgcmF0ZSBjb21wb25lbnQgaXMgcmVhZG9ubHkuXG4gICAqIEJ5IGRlZmF1bHQgaXQncyAqKmZhbHNlKiouXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyByZWFkb25seT48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XG4gIH1cbiAgcHVibGljIHNldCByZWFkb25seSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGBkaXNhYmxlZGAgcHJvcGVydHkuXG4gICAqIFdoZXRoZXIgdGhlIHJhdGUgY29tcG9uZW50IGlzIGRpc2FibGVkLlxuICAgKiBCeSBkZWZhdWx0IHJhdGUgaXRlbXMgYXJlIGNsaWNrYWJsZSAoZGlzYWJsZWQ9ZmFsc2UpLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgZGlzYWJsZWQ+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHB1YmxpYyBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgc2hvd0NhbmNlbEljb25gIHByb3BlcnR5LlxuICAgKiBXaGV0aGVyIHRoZSBjYW5jZWwgKGNsZWFyKSBpY29uIGlzIHZpc2libGUuXG4gICAqIEJ5IGRlZmF1bHQgaXQncyB2aXNpYmxlLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3Nob3dDYW5jZWxJY29uXT1cImZhbHNlXCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgc2hvd0NhbmNlbEljb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dDYW5jZWxJY29uO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hvd0NhbmNlbEljb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93Q2FuY2VsSWNvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfc2hvd0NhbmNlbEljb24gPSBmYWxzZTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgaWNvbmAgZm9yIHRoZSByYXRlIGl0ZW0uXG4gICAqIEJ5IGRlZmF1bHQgaXQncyAqKmZhU3RhcioqIEZvbnRBd2Vzb21lIGljb24uXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBbaWNvbl09XCJmYVN0YXJcIj48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGljb246IEljb25EZWZpbml0aW9uID0gZmFTdGFyO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGBjYW5jZWxJY29uYCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICogQnkgZGVmYXVsdCBpdCB1c2VzICoqZmFCYW4qKiBGb250QXdlc29tZSBpY29uLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW2NhbmNlbEljb25dPVwiZmFCYW5cIj48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGNhbmNlbEljb246IEljb25EZWZpbml0aW9uID0gZmFCYW47XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IHRoYXQgaXMgZW1pdHRlZCBhZnRlciB0aGUgcmF0ZSBpdGVtIGlzIGNsaWNrZWQgYW5kIHNldC5cbiAgICogUHJvdmlkZXMgYSBudW1iZXIgb2YgY2xpY2tlZCBpdGVtIC0gZXguIDEsMiwzLCBldGMuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBbcmF0ZUNoYW5nZV09XCJjaGFuZ2UoJGV2ZW50KVwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgcmF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IHRoYXQgaXMgZW1pdHRlZCBhZnRlciB0aGUgcmF0aW5nIGlzIGNhbmNlbGVkIChjbGVhcmVkKS5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8bmctcmF0aW5nIFtyYXRlQ2FuY2VsXT1cImNhbmNlbCgkZXZlbnQpXCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByYXRlQ2FuY2VsOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIFRoZSB0ZW1wbGF0ZSB0byBvdmVycmlkZSB0aGUgd2F5IGVhY2ggc3RhciBpcyBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEFsdGVybmF0aXZlbHkgcHV0IGFuIGA8bmctdGVtcGxhdGU+YCBhcyB0aGUgb25seSBjaGlsZCBvZiB5b3VyIGA8bmctcmF0aW5nPmAgZWxlbWVudFxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgKHJhdGVDaGFuZ2UpPVwidGhpcy5yYXRpbmdMYWJlbCA9ICRldmVudFwiIFtzaXplXT1cIjZcIj5cbiAgICogICA8bmctdGVtcGxhdGUgbGV0LWhvdmVyZWQ9XCJob3ZlcmVkXCI+XG4gICAqICAgIDxzcGFuIGNsYXNzPVwic3RhclwiIFtjbGFzcy5maWxsZWRdPVwiaG92ZXJlZFwiPiYjOTczMzs8L3NwYW4+XG4gICAqICAgPC9uZy10ZW1wbGF0ZT5cbiAgICogPC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IGZhbHNlIH0pIHJhdGluZ1RlbXBsYXRlQ29udGVudDogVGVtcGxhdGVSZWY8SVJhdGluZ0NvbnRleHQ+O1xuICBASW5wdXQoKSByYXRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SVJhdGluZ0NvbnRleHQ+O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoJ3JhdGluZycgaW4gY2hhbmdlcyAmJiBjaGFuZ2VzLnJhdGluZy5jdXJyZW50VmFsdWUgPiAwKSB7XG4gICAgICB0aGlzLnJhdGluZ3NIb3Zlcih0aGlzLnJhdGluZyAtIDEpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHRoaXMucmF0aW5nIC0gMTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGhvdmVyZWRJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMucmF0aW5nc0hvdmVyKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGhhbmRsZUNsaWNrKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMudXBkYXRlKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgdGhpcy5yYXRpbmdzLmZvckVhY2goKGl0ZW06IElSYXRpbmdDb250ZXh0KSA9PiAoaXRlbS5ob3ZlcmVkID0gZmFsc2UpKTtcbiAgICB0aGlzLnJhdGVDYW5jZWwuZW1pdCgpO1xuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBwdWJsaWMgbW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMucmF0aW5ncy5mb3JFYWNoKChpdGVtOiBJUmF0aW5nQ29udGV4dCwgaW5kZXgpID0+IChpdGVtLmhvdmVyZWQgPSAhKGluZGV4ID4gdGhpcy5fc2VsZWN0ZWRJbmRleCkpKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgcHVibGljIGJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGUgcmF0aW5nIHVzaW5nIGFycm93IGtleXMgYW5kIGhvbWUvZW5kIGtleXMgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4LS07XG4gICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5fc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggPCB0aGlzLnNpemUgLSAxKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCsrO1xuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgdGhpcy51cGRhdGUoMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnNpemUgLSAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgd3JpdGVWYWx1ZShyYXRpbmc6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChyYXRpbmcpIHtcbiAgICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4ocmF0aW5nKTtcbiAgICAgIHRoaXMucmF0aW5nID0gcmF0aW5nO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHJhdGluZyAtIDE7XG4gICAgICB0aGlzLnJhdGluZ3NIb3ZlcihyYXRpbmcgLSAxKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5ob3ZlcmVkSXRlbSh0aGlzLl9zZWxlY3RlZEluZGV4KTtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIHRoaXMucmF0ZUNoYW5nZS5lbWl0KGluZGV4ICsgMSk7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIHJhdGluZyBjaGFuZ2VzLlxuICBwcml2YXRlIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgaW5wdXQgaXMgdG91Y2hlZCAod2hlbiBhIHN0YXIgaXMgY2xpY2tlZCkuXG4gIHByaXZhdGUgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIHJhdGluZ3NIb3ZlcihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yYXRpbmdzLmZvckVhY2goKGl0ZW06IElSYXRpbmdDb250ZXh0LCBpKSA9PiAoaXRlbS5ob3ZlcmVkID0gaW5kZXggPj0gaSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgYXJpYVZhbHVlVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLl9zZWxlY3RlZEluZGV4ICsgMX0gb3V0IG9mICR7dGhpcy5zaXplfWA7XG4gIH1cbn1cbiJdfQ==