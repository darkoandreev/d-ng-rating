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
export var NG_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgRatingComponent; }),
    multi: true,
};
var UNIQUE_ID = 0;
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
var NgRatingComponent = /** @class */ (function () {
    function NgRatingComponent() {
        /** Currently selected rating item index
         * @hidden @internal
         */
        this._selectedIndex = -1;
        /** A unique id for the rating input. If none is supplied, it will be auto-generated. */
        this.id = "ng-star-rating-" + UNIQUE_ID++;
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
        this._controlValueAccessorChangeFn = function () { };
        // Function to call when the input is touched (when a star is clicked).
        this.onTouched = function () { };
    }
    Object.defineProperty(NgRatingComponent.prototype, "starRatingClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "ariaValueMin", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "ariaValueMax", {
        get: function () {
            return this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "ariaValueNow", {
        get: function () {
            return this._selectedIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "ariaValueTextAttr", {
        get: function () {
            return this.ariaValueText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "role", {
        get: function () {
            return 'slider';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "tabindexAttr", {
        get: function () {
            return this.disabled ? -1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "ariaReadonly", {
        get: function () {
            return this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "ariaSetSize", {
        get: function () {
            return this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "rating", {
        /**
         * Gets/sets the `rating` for the component.
         * Determines selected rate items.
         * @example
         * ```html
         * <ng-rating [rating]="5"></ng-rating>
         * ```
         * @memberOf NgRatingComponent
         */
        get: function () {
            return this._rating;
        },
        set: function (value) {
            if (value <= 0) {
                RATE_SET_ERROR();
            }
            this._rating = coerceNumberProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "size", {
        /**
         * Gets/sets the `size` for the component.
         * Sets max number of rate items.
         * @example
         * ```html
         * <ng-rating [size]="5"></ng-rating>
         * ```
         * @memberOf NgRatingComponent
         */
        get: function () {
            return this._size;
        },
        set: function (value) {
            if (value <= 0) {
                RATING_SIZE_ERROR();
            }
            this._size = coerceNumberProperty(value);
            this.ratings = Array.from(new Array(value)).map(function () {
                var rating = {
                    hovered: false,
                };
                return rating;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "readonly", {
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
        get: function () {
            return this._readonly;
        },
        set: function (value) {
            this._readonly = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "disabled", {
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
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgRatingComponent.prototype, "showCancelIcon", {
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
        get: function () {
            return this._showCancelIcon;
        },
        set: function (value) {
            this._showCancelIcon = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NgRatingComponent.prototype.ngOnChanges = function (changes) {
        if ('rating' in changes && changes.rating.currentValue > 0) {
            this.ratingsHover(this.rating - 1);
            this._selectedIndex = this.rating - 1;
        }
    };
    /** @hidden @internal */
    NgRatingComponent.prototype.hoveredItem = function (index) {
        if (!this.readonly) {
            this.ratingsHover(index);
        }
    };
    /** @hidden @internal */
    NgRatingComponent.prototype.handleClick = function (index) {
        if (!this.readonly) {
            this.update(index);
        }
    };
    /** @hidden @internal */
    NgRatingComponent.prototype.cancel = function () {
        this._selectedIndex = -1;
        this.ratings.forEach(function (item) { return (item.hovered = false); });
        this.rateCancel.emit();
    };
    /** @hidden @internal */
    NgRatingComponent.prototype.mouseLeave = function () {
        var _this = this;
        if (!this.readonly) {
            this.ratings.forEach(function (item, index) { return (item.hovered = !(index > _this._selectedIndex)); });
        }
    };
    NgRatingComponent.prototype.blur = function () {
        this.onTouched();
    };
    /** Handle rating using arrow keys and home/end keys */
    NgRatingComponent.prototype.handleKeyDown = function (event) {
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
    };
    /** @hidden @internal */
    NgRatingComponent.prototype.writeValue = function (rating) {
        if (rating) {
            this._controlValueAccessorChangeFn(rating);
            this.rating = rating;
            this._selectedIndex = rating - 1;
            this.ratingsHover(rating - 1);
        }
    };
    /** @hidden @internal */
    NgRatingComponent.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /** @hidden @internal */
    NgRatingComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /** @hidden @internal */
    NgRatingComponent.prototype.setDisabledState = function (value) {
        this.disabled = value;
    };
    NgRatingComponent.prototype.update = function (index) {
        this._selectedIndex = index;
        this.hoveredItem(this._selectedIndex);
        this.onTouched();
        this.rateChange.emit(index + 1);
    };
    NgRatingComponent.prototype.ratingsHover = function (index) {
        this.ratings.forEach(function (item, i) { return (item.hovered = index >= i); });
    };
    Object.defineProperty(NgRatingComponent.prototype, "ariaValueText", {
        get: function () {
            return this._selectedIndex + 1 + " out of " + this.size;
        },
        enumerable: true,
        configurable: true
    });
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
    return NgRatingComponent;
}());
export { NgRatingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXJhdGluZy8iLCJzb3VyY2VzIjpbImxpYi9uZy1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsV0FBVyxFQUNYLFlBQVksRUFHWixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbEM7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sd0JBQXdCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFTRixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFFbEI7Ozs7Ozs7Ozs7Ozs7R0FhRztBQVNIO0lBQUE7UUFJRTs7V0FFRztRQUNJLG1CQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFTM0Isd0ZBQXdGO1FBR2pGLE9BQUUsR0FBRyxvQkFBa0IsU0FBUyxFQUFJLENBQUM7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QjtRQVI3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQiwrOEJBQXlDO1lBRXpDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztTQUN0QyxDQUFDO09BQ1csaUJBQWlCLENBaVc3QjtJQUFELHdCQUFDO0NBQUEsQUFqV0QsSUFpV0M7U0FqV1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgQ29udGVudENoaWxkLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZhU3RhciwgZmFCYW4sIEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IFJBVElOR19TSVpFX0VSUk9SLCBSQVRFX1NFVF9FUlJPUiB9IGZyb20gJy4vbmctcmF0aW5nLmVycm9yJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgTmdSYXRpbmdMYWJlbERpcmVjdGl2ZSB9IGZyb20gJy4vbmctcmF0aW5nLWxhYmVsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi91dGlsL2tleSc7XG5cbi8qKlxuICogUHJvdmlkZXIgdGhhdCBhbGxvd3MgdGhlIHJhdGluZyBjb21wb25lbnQgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIEBkb2NzLXByaXZhdGUgQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBOR19SQVRJTkdfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nUmF0aW5nQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG4vKipcbiAqIFJhdGluZyBpdGVtIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElSYXRpbmdDb250ZXh0IHtcbiAgaG92ZXJlZDogYm9vbGVhbjtcbn1cblxubGV0IFVOSVFVRV9JRCA9IDA7XG5cbi8qKlxuICogUmF0aW5nIGNvbXBvbmVudHMgaXMgYSBzdGFyIGJhc2VkIHNlbGVjdGlvbiBpbnB1dC5cbiAqIEEgc3RhciByYXRpbmcgdXN1YWxseSBjb25zaXN0cyBvZiBpbWFnZXMgb2Ygc3RhcnMgdGhhdCBjYW4gYmUgdXNlZCB0byByYXRlIGEgcGFydGljdWxhciBpdGVtLlxuICogQSBtb3VzZSB1c2VyIGhvdmVycyBvdmVyIHRoZSBzdGFycyBhbmQgY2xpY2tzIG9uZSB0byBzZWxlY3QgaXQuXG4gKiBGb3IgZXhhbXBsZSwgaWYgdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSB0aGlyZCBzdGFyIGZyb20gdGhlIGxlZnQsIHRoZSByYXRpbmcgb2YgdGhlIGl0ZW0gaXMgMyBvZiA1IHN0YXJzLlxuICogYGBgXG4gKiBAZXhhbXBsZVxuICogPG5nLXJhdGluZyBbaW5wdXQgYmluZGluZ3NdPlxuICogIDxuZy10ZW1wbGF0ZSBuZ1JhdGluZ0xhYmVsPnt7IHRoaXMucmF0aW5nTGFiZWwgfX08L25nLXRlbXBsYXRlPlxuICogPC9uZy1yYXRpbmc+XG4gKiBgYGBcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXJhdGluZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZy1yYXRpbmcuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW05HX1JBVElOR19WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE5nUmF0aW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgcmF0aW5nczogSVJhdGluZ0NvbnRleHRbXTtcblxuICAvKiogQ3VycmVudGx5IHNlbGVjdGVkIHJhdGluZyBpdGVtIGluZGV4XG4gICAqIEBoaWRkZW4gQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgX3NlbGVjdGVkSW5kZXggPSAtMTtcblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgQENvbnRlbnRDaGlsZChOZ1JhdGluZ0xhYmVsRGlyZWN0aXZlKSBwdWJsaWMgcmF0aW5nTGFiZWxUZW1wbGF0ZTogTmdSYXRpbmdMYWJlbERpcmVjdGl2ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5nLXN0YXItcmF0aW5nJykgZ2V0IHN0YXJSYXRpbmdDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIHJhdGluZyBpbnB1dC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgQElucHV0KClcbiAgcHVibGljIGlkID0gYG5nLXN0YXItcmF0aW5nLSR7VU5JUVVFX0lEKyt9YDtcblxuICAvKipcbiAgICogQXR0YWNoZWQgdG8gdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqIEluIG1vc3QgY2FzZXMsIGFyaWEtbGFiZWxsZWRieSB3aWxsIHRha2UgcHJlY2VkZW5jZSBzbyB0aGlzIG1heSBiZSBvbWl0dGVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWwnKVxuICBASW5wdXQoJ2FyaWEtbGFiZWwnKVxuICBwdWJsaWMgYXJpYUxhYmVsID0gJ3N0YXInO1xuXG4gIC8qKlxuICAgKiBVc2VycyBjYW4gc3BlY2lmeSB0aGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHdoaWNoIHdpbGwgYmUgZm9yd2FyZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWxsZWRieScpXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JylcbiAgcHVibGljIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnU3RhciByYXRpbmcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbWluJykgZ2V0IGFyaWFWYWx1ZU1pbigpOiBudW1iZXIge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtdmFsdWVtYXgnKSBnZXQgYXJpYVZhbHVlTWF4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbm93JykgZ2V0IGFyaWFWYWx1ZU5vdygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4ICsgMTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVldGV4dCcpIGdldCBhcmlhVmFsdWVUZXh0QXR0cigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFWYWx1ZVRleHQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIGdldCByb2xlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdzbGlkZXInO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRhYmluZGV4JykgZ2V0IHRhYmluZGV4QXR0cigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gLTEgOiAwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGlzYWJsZWQnKSBnZXQgYXJpYURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtcmVhZG9ubHknKSBnZXQgYXJpYVJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlYWRvbmx5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2V0c2l6ZScpIGdldCBhcmlhU2V0U2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgcmF0aW5nYCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICogRGV0ZXJtaW5lcyBzZWxlY3RlZCByYXRlIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3JhdGluZ109XCI1XCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgcmF0aW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3JhdGluZztcbiAgfVxuICBwdWJsaWMgc2V0IHJhdGluZyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDw9IDApIHtcbiAgICAgIFJBVEVfU0VUX0VSUk9SKCk7XG4gICAgfVxuICAgIHRoaXMuX3JhdGluZyA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yYXRpbmc6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgc2l6ZWAgZm9yIHRoZSBjb21wb25lbnQuXG4gICAqIFNldHMgbWF4IG51bWJlciBvZiByYXRlIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3NpemVdPVwiNVwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNpemUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8PSAwKSB7XG4gICAgICBSQVRJTkdfU0laRV9FUlJPUigpO1xuICAgIH1cblxuICAgIHRoaXMuX3NpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5yYXRpbmdzID0gQXJyYXkuZnJvbShuZXcgQXJyYXkodmFsdWUpKS5tYXAoKCkgPT4ge1xuICAgICAgY29uc3QgcmF0aW5nOiBJUmF0aW5nQ29udGV4dCA9IHtcbiAgICAgICAgaG92ZXJlZDogZmFsc2UsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJhdGluZztcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIF9zaXplID0gNTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgcmVhZG9ubHlgIHByb3BlcnR5LlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSByYXRlIGNvbXBvbmVudCBpcyByZWFkb25seS5cbiAgICogQnkgZGVmYXVsdCBpdCdzICoqZmFsc2UqKi5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8bmctcmF0aW5nIHJlYWRvbmx5PjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBwdWJsaWMgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEdldHMvc2V0cyB0aGUgYGRpc2FibGVkYCBwcm9wZXJ0eS5cbiAgICogV2hldGhlciB0aGUgcmF0ZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuXG4gICAqIEJ5IGRlZmF1bHQgcmF0ZSBpdGVtcyBhcmUgY2xpY2thYmxlIChkaXNhYmxlZD1mYWxzZSkuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBkaXNhYmxlZD48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgcHVibGljIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGBzaG93Q2FuY2VsSWNvbmAgcHJvcGVydHkuXG4gICAqIFdoZXRoZXIgdGhlIGNhbmNlbCAoY2xlYXIpIGljb24gaXMgdmlzaWJsZS5cbiAgICogQnkgZGVmYXVsdCBpdCdzIHZpc2libGUuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBbc2hvd0NhbmNlbEljb25dPVwiZmFsc2VcIj48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBzaG93Q2FuY2VsSWNvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0NhbmNlbEljb247XG4gIH1cbiAgcHVibGljIHNldCBzaG93Q2FuY2VsSWNvbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dDYW5jZWxJY29uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9zaG93Q2FuY2VsSWNvbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGBpY29uYCBmb3IgdGhlIHJhdGUgaXRlbS5cbiAgICogQnkgZGVmYXVsdCBpdCdzICoqZmFTdGFyKiogRm9udEF3ZXNvbWUgaWNvbi5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8bmctcmF0aW5nIFtpY29uXT1cImZhU3RhclwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgaWNvbjogSWNvbkRlZmluaXRpb24gPSBmYVN0YXI7XG5cbiAgLyoqXG4gICAqIEdldHMvc2V0cyB0aGUgYGNhbmNlbEljb25gIGZvciB0aGUgY29tcG9uZW50LlxuICAgKiBCeSBkZWZhdWx0IGl0IHVzZXMgKipmYUJhbioqIEZvbnRBd2Vzb21lIGljb24uXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBbY2FuY2VsSWNvbl09XCJmYUJhblwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsSWNvbjogSWNvbkRlZmluaXRpb24gPSBmYUJhbjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgdGhhdCBpcyBlbWl0dGVkIGFmdGVyIHRoZSByYXRlIGl0ZW0gaXMgY2xpY2tlZCBhbmQgc2V0LlxuICAgKiBQcm92aWRlcyBhIG51bWJlciBvZiBjbGlja2VkIGl0ZW0gLSBleC4gMSwyLDMsIGV0Yy5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8bmctcmF0aW5nIFtyYXRlQ2hhbmdlXT1cImNoYW5nZSgkZXZlbnQpXCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgdGhhdCBpcyBlbWl0dGVkIGFmdGVyIHRoZSByYXRpbmcgaXMgY2FuY2VsZWQgKGNsZWFyZWQpLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3JhdGVDYW5jZWxdPVwiY2FuY2VsKCRldmVudClcIj48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqL1xuICBAT3V0cHV0KCkgcHVibGljIHJhdGVDYW5jZWw6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogVGhlIHRlbXBsYXRlIHRvIG92ZXJyaWRlIHRoZSB3YXkgZWFjaCBzdGFyIGlzIGRpc3BsYXllZC5cbiAgICpcbiAgICogQWx0ZXJuYXRpdmVseSBwdXQgYW4gYDxuZy10ZW1wbGF0ZT5gIGFzIHRoZSBvbmx5IGNoaWxkIG9mIHlvdXIgYDxuZy1yYXRpbmc+YCBlbGVtZW50XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyAocmF0ZUNoYW5nZSk9XCJ0aGlzLnJhdGluZ0xhYmVsID0gJGV2ZW50XCIgW3NpemVdPVwiNlwiPlxuICAgKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaG92ZXJlZD1cImhvdmVyZWRcIj5cbiAgICogICAgPHNwYW4gY2xhc3M9XCJzdGFyXCIgW2NsYXNzLmZpbGxlZF09XCJob3ZlcmVkXCI+JiM5NzMzOzwvc3Bhbj5cbiAgICogICA8L25nLXRlbXBsYXRlPlxuICAgKiA8L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqL1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiBmYWxzZSB9KSByYXRpbmdUZW1wbGF0ZUNvbnRlbnQ6IFRlbXBsYXRlUmVmPElSYXRpbmdDb250ZXh0PjtcbiAgQElucHV0KCkgcmF0aW5nVGVtcGxhdGU6IFRlbXBsYXRlUmVmPElSYXRpbmdDb250ZXh0PjtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCdyYXRpbmcnIGluIGNoYW5nZXMgJiYgY2hhbmdlcy5yYXRpbmcuY3VycmVudFZhbHVlID4gMCkge1xuICAgICAgdGhpcy5yYXRpbmdzSG92ZXIodGhpcy5yYXRpbmcgLSAxKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSB0aGlzLnJhdGluZyAtIDE7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyBob3ZlcmVkSXRlbShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLnJhdGluZ3NIb3ZlcihpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyBoYW5kbGVDbGljayhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLnVwZGF0ZShpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgIHRoaXMucmF0aW5ncy5mb3JFYWNoKChpdGVtOiBJUmF0aW5nQ29udGV4dCkgPT4gKGl0ZW0uaG92ZXJlZCA9IGZhbHNlKSk7XG4gICAgdGhpcy5yYXRlQ2FuY2VsLmVtaXQoKTtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgcHVibGljIG1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLnJhdGluZ3MuZm9yRWFjaCgoaXRlbTogSVJhdGluZ0NvbnRleHQsIGluZGV4KSA9PiAoaXRlbS5ob3ZlcmVkID0gIShpbmRleCA+IHRoaXMuX3NlbGVjdGVkSW5kZXgpKSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHB1YmxpYyBibHVyKCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cblxuICAvKiogSGFuZGxlIHJhdGluZyB1c2luZyBhcnJvdyBrZXlzIGFuZCBob21lL2VuZCBrZXlzICovXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBwdWJsaWMgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgY2FzZSBLZXkuQXJyb3dMZWZ0OlxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleC0tO1xuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4IDwgdGhpcy5zaXplIC0gMSkge1xuICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXgrKztcbiAgICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLl9zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkhvbWU6XG4gICAgICAgIHRoaXMudXBkYXRlKDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkVuZDpcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5zaXplIC0gMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHdyaXRlVmFsdWUocmF0aW5nOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocmF0aW5nKSB7XG4gICAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKHJhdGluZyk7XG4gICAgICB0aGlzLnJhdGluZyA9IHJhdGluZztcbiAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSByYXRpbmcgLSAxO1xuICAgICAgdGhpcy5yYXRpbmdzSG92ZXIocmF0aW5nIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIHRoaXMuaG92ZXJlZEl0ZW0odGhpcy5fc2VsZWN0ZWRJbmRleCk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB0aGlzLnJhdGVDaGFuZ2UuZW1pdChpbmRleCArIDEpO1xuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSByYXRpbmcgY2hhbmdlcy5cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvLyBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGlucHV0IGlzIHRvdWNoZWQgKHdoZW4gYSBzdGFyIGlzIGNsaWNrZWQpLlxuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSByYXRpbmdzSG92ZXIoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmF0aW5ncy5mb3JFYWNoKChpdGVtOiBJUmF0aW5nQ29udGV4dCwgaSkgPT4gKGl0ZW0uaG92ZXJlZCA9IGluZGV4ID49IGkpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGFyaWFWYWx1ZVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5fc2VsZWN0ZWRJbmRleCArIDF9IG91dCBvZiAke3RoaXMuc2l6ZX1gO1xuICB9XG59XG4iXX0=