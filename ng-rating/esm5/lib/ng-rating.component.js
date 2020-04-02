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
            styles: [":host{display:inline-flex;flex-direction:row;flex-wrap:wrap;outline:0}.ng-rating-item{border:none;outline:0}.ng-rating-item-icon{font-size:1.875rem;transition:.3s}.ng-rating-item-disabled{pointer-events:none;opacity:.7}.ng-rating-item-icon-hover{color:gold;cursor:pointer}.ng-rating-cancel{border:none;outline:0}.ng-rating-cancel fa-icon{font-size:1.875rem;color:#dc143c}.ng-rating-cancel fa-icon:hover{cursor:pointer}.ng-rating-label{display:inline-flex;align-self:center;padding-left:1rem;font-size:1.875rem}"]
        })
    ], NgRatingComponent);
    return NgRatingComponent;
}());
export { NgRatingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXJhdGluZy8iLCJzb3VyY2VzIjpbImxpYi9uZy1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsV0FBVyxFQUNYLFlBQVksRUFHWixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbEM7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sd0JBQXdCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFTRixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFFbEI7Ozs7Ozs7Ozs7Ozs7R0FhRztBQVNIO0lBQUE7UUFJRTs7V0FFRztRQUNJLG1CQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFTM0Isd0ZBQXdGO1FBR2pGLE9BQUUsR0FBRyxvQkFBa0IsU0FBUyxFQUFJLENBQUM7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LEVBQUUsV0FBVztZQUNyQiwrOEJBQXlDO1lBRXpDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztTQUN0QyxDQUFDO09BQ1csaUJBQWlCLENBZ1c3QjtJQUFELHdCQUFDO0NBQUEsQUFoV0QsSUFnV0M7U0FoV1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgQ29udGVudENoaWxkLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZhU3RhciwgZmFCYW4sIEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IFJBVElOR19TSVpFX0VSUk9SLCBSQVRFX1NFVF9FUlJPUiB9IGZyb20gJy4vbmctcmF0aW5nLmVycm9yJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgTmdSYXRpbmdMYWJlbERpcmVjdGl2ZSB9IGZyb20gJy4vbmctcmF0aW5nLWxhYmVsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi91dGlsL2tleSc7XG5cbi8qKlxuICogUHJvdmlkZXIgdGhhdCBhbGxvd3MgdGhlIHJhdGluZyBjb21wb25lbnQgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIEBkb2NzLXByaXZhdGUgQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBOR19SQVRJTkdfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nUmF0aW5nQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG4vKipcbiAqIFJhdGluZyBpdGVtIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElSYXRpbmdDb250ZXh0IHtcbiAgaG92ZXJlZDogYm9vbGVhbjtcbn1cblxubGV0IFVOSVFVRV9JRCA9IDA7XG5cbi8qKlxuICogUmF0aW5nIGNvbXBvbmVudHMgaXMgYSBzdGFyIGJhc2VkIHNlbGVjdGlvbiBpbnB1dC5cbiAqIEEgc3RhciByYXRpbmcgdXN1YWxseSBjb25zaXN0cyBvZiBpbWFnZXMgb2Ygc3RhcnMgdGhhdCBjYW4gYmUgdXNlZCB0byByYXRlIGEgcGFydGljdWxhciBpdGVtLlxuICogQSBtb3VzZSB1c2VyIGhvdmVycyBvdmVyIHRoZSBzdGFycyBhbmQgY2xpY2tzIG9uZSB0byBzZWxlY3QgaXQuXG4gKiBGb3IgZXhhbXBsZSwgaWYgdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSB0aGlyZCBzdGFyIGZyb20gdGhlIGxlZnQsIHRoZSByYXRpbmcgb2YgdGhlIGl0ZW0gaXMgMyBvZiA1IHN0YXJzLlxuICogYGBgXG4gKiBAZXhhbXBsZVxuICogPG5nLXJhdGluZyBbaW5wdXQgYmluZGluZ3NdPlxuICogIDxuZy10ZW1wbGF0ZSBuZ1JhdGluZ0xhYmVsPnt7IHRoaXMucmF0aW5nTGFiZWwgfX08L25nLXRlbXBsYXRlPlxuICogPC9uZy1yYXRpbmc+XG4gKiBgYGBcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXJhdGluZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZy1yYXRpbmcuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW05HX1JBVElOR19WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE5nUmF0aW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgcmF0aW5nczogSVJhdGluZ0NvbnRleHRbXTtcblxuICAvKiogQ3VycmVudGx5IHNlbGVjdGVkIHJhdGluZyBpdGVtIGluZGV4XG4gICAqIEBoaWRkZW4gQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgX3NlbGVjdGVkSW5kZXggPSAtMTtcblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgQENvbnRlbnRDaGlsZChOZ1JhdGluZ0xhYmVsRGlyZWN0aXZlKSBwdWJsaWMgcmF0aW5nTGFiZWxUZW1wbGF0ZTogTmdSYXRpbmdMYWJlbERpcmVjdGl2ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5nLXN0YXItcmF0aW5nJykgZ2V0IHN0YXJSYXRpbmdDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIHJhdGluZyBpbnB1dC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgQElucHV0KClcbiAgcHVibGljIGlkID0gYG5nLXN0YXItcmF0aW5nLSR7VU5JUVVFX0lEKyt9YDtcblxuICAvKipcbiAgICogQXR0YWNoZWQgdG8gdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqIEluIG1vc3QgY2FzZXMsIGFyaWEtbGFiZWxsZWRieSB3aWxsIHRha2UgcHJlY2VkZW5jZSBzbyB0aGlzIG1heSBiZSBvbWl0dGVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWwnKVxuICBASW5wdXQoJ2FyaWEtbGFiZWwnKVxuICBwdWJsaWMgYXJpYUxhYmVsID0gJ3N0YXInO1xuXG4gIC8qKlxuICAgKiBVc2VycyBjYW4gc3BlY2lmeSB0aGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHdoaWNoIHdpbGwgYmUgZm9yd2FyZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWxsZWRieScpXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JylcbiAgcHVibGljIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnU3RhciByYXRpbmcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbWluJykgZ2V0IGFyaWFWYWx1ZU1pbigpOiBudW1iZXIge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtdmFsdWVtYXgnKSBnZXQgYXJpYVZhbHVlTWF4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbm93JykgZ2V0IGFyaWFWYWx1ZU5vdygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4ICsgMTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVldGV4dCcpIGdldCBhcmlhVmFsdWVUZXh0QXR0cigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFWYWx1ZVRleHQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIGdldCByb2xlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdzbGlkZXInO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRhYmluZGV4JykgZ2V0IHRhYmluZGV4QXR0cigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gLTEgOiAwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGlzYWJsZWQnKSBnZXQgYXJpYURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtcmVhZG9ubHknKSBnZXQgYXJpYVJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlYWRvbmx5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2V0c2l6ZScpIGdldCBhcmlhU2V0U2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgcmF0aW5nYCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICogRGV0ZXJtaW5lcyBzZWxlY3RlZCByYXRlIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3JhdGluZ109XCI1XCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgcmF0aW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3JhdGluZztcbiAgfVxuICBwdWJsaWMgc2V0IHJhdGluZyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDw9IDApIHtcbiAgICAgIFJBVEVfU0VUX0VSUk9SKCk7XG4gICAgfVxuICAgIHRoaXMuX3JhdGluZyA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yYXRpbmc6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgc2l6ZWAgZm9yIHRoZSBjb21wb25lbnQuXG4gICAqIFNldHMgbWF4IG51bWJlciBvZiByYXRlIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3NpemVdPVwiNVwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNpemUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8PSAwKSB7XG4gICAgICBSQVRJTkdfU0laRV9FUlJPUigpO1xuICAgIH1cblxuICAgIHRoaXMuX3NpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5yYXRpbmdzID0gQXJyYXkuZnJvbShuZXcgQXJyYXkodmFsdWUpKS5tYXAoKCkgPT4ge1xuICAgICAgY29uc3QgcmF0aW5nOiBJUmF0aW5nQ29udGV4dCA9IHtcbiAgICAgICAgaG92ZXJlZDogZmFsc2UsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJhdGluZztcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIF9zaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEdldHMvc2V0cyB0aGUgYHJlYWRvbmx5YCBwcm9wZXJ0eS5cbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgcmF0ZSBjb21wb25lbnQgaXMgcmVhZG9ubHkuXG4gICAqIEJ5IGRlZmF1bHQgaXQncyAqKmZhbHNlKiouXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyByZWFkb25seT48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XG4gIH1cbiAgcHVibGljIHNldCByZWFkb25seSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGBkaXNhYmxlZGAgcHJvcGVydHkuXG4gICAqIFdoZXRoZXIgdGhlIHJhdGUgY29tcG9uZW50IGlzIGRpc2FibGVkLlxuICAgKiBCeSBkZWZhdWx0IHJhdGUgaXRlbXMgYXJlIGNsaWNrYWJsZSAoZGlzYWJsZWQ9ZmFsc2UpLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgZGlzYWJsZWQ+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHB1YmxpYyBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgc2hvd0NhbmNlbEljb25gIHByb3BlcnR5LlxuICAgKiBXaGV0aGVyIHRoZSBjYW5jZWwgKGNsZWFyKSBpY29uIGlzIHZpc2libGUuXG4gICAqIEJ5IGRlZmF1bHQgaXQncyB2aXNpYmxlLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW3Nob3dDYW5jZWxJY29uXT1cImZhbHNlXCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgc2hvd0NhbmNlbEljb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dDYW5jZWxJY29uO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hvd0NhbmNlbEljb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93Q2FuY2VsSWNvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfc2hvd0NhbmNlbEljb24gPSBmYWxzZTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgaWNvbmAgZm9yIHRoZSByYXRlIGl0ZW0uXG4gICAqIEJ5IGRlZmF1bHQgaXQncyAqKmZhU3RhcioqIEZvbnRBd2Vzb21lIGljb24uXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBbaWNvbl09XCJmYVN0YXJcIj48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGljb246IEljb25EZWZpbml0aW9uID0gZmFTdGFyO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGBjYW5jZWxJY29uYCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICogQnkgZGVmYXVsdCBpdCB1c2VzICoqZmFCYW4qKiBGb250QXdlc29tZSBpY29uLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgW2NhbmNlbEljb25dPVwiZmFCYW5cIj48L25nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGNhbmNlbEljb246IEljb25EZWZpbml0aW9uID0gZmFCYW47XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IHRoYXQgaXMgZW1pdHRlZCBhZnRlciB0aGUgcmF0ZSBpdGVtIGlzIGNsaWNrZWQgYW5kIHNldC5cbiAgICogUHJvdmlkZXMgYSBudW1iZXIgb2YgY2xpY2tlZCBpdGVtIC0gZXguIDEsMiwzLCBldGMuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPG5nLXJhdGluZyBbcmF0ZUNoYW5nZV09XCJjaGFuZ2UoJGV2ZW50KVwiPjwvbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgcmF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IHRoYXQgaXMgZW1pdHRlZCBhZnRlciB0aGUgcmF0aW5nIGlzIGNhbmNlbGVkIChjbGVhcmVkKS5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8bmctcmF0aW5nIFtyYXRlQ2FuY2VsXT1cImNhbmNlbCgkZXZlbnQpXCI+PC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByYXRlQ2FuY2VsOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIFRoZSB0ZW1wbGF0ZSB0byBvdmVycmlkZSB0aGUgd2F5IGVhY2ggc3RhciBpcyBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEFsdGVybmF0aXZlbHkgcHV0IGFuIGA8bmctdGVtcGxhdGU+YCBhcyB0aGUgb25seSBjaGlsZCBvZiB5b3VyIGA8bmctcmF0aW5nPmAgZWxlbWVudFxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxuZy1yYXRpbmcgKHJhdGVDaGFuZ2UpPVwidGhpcy5yYXRpbmdMYWJlbCA9ICRldmVudFwiIFtzaXplXT1cIjZcIj5cbiAgICogICA8bmctdGVtcGxhdGUgbGV0LWhvdmVyZWQ9XCJob3ZlcmVkXCI+XG4gICAqICAgIDxzcGFuIGNsYXNzPVwic3RhclwiIFtjbGFzcy5maWxsZWRdPVwiaG92ZXJlZFwiPiYjOTczMzs8L3NwYW4+XG4gICAqICAgPC9uZy10ZW1wbGF0ZT5cbiAgICogPC9uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IGZhbHNlIH0pIHJhdGluZ1RlbXBsYXRlQ29udGVudDogVGVtcGxhdGVSZWY8SVJhdGluZ0NvbnRleHQ+O1xuICBASW5wdXQoKSByYXRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SVJhdGluZ0NvbnRleHQ+O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoJ3JhdGluZycgaW4gY2hhbmdlcyAmJiBjaGFuZ2VzLnJhdGluZy5jdXJyZW50VmFsdWUgPiAwKSB7XG4gICAgICB0aGlzLnJhdGluZ3NIb3Zlcih0aGlzLnJhdGluZyAtIDEpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHRoaXMucmF0aW5nIC0gMTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGhvdmVyZWRJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMucmF0aW5nc0hvdmVyKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGhhbmRsZUNsaWNrKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMudXBkYXRlKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgdGhpcy5yYXRpbmdzLmZvckVhY2goKGl0ZW06IElSYXRpbmdDb250ZXh0KSA9PiAoaXRlbS5ob3ZlcmVkID0gZmFsc2UpKTtcbiAgICB0aGlzLnJhdGVDYW5jZWwuZW1pdCgpO1xuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBwdWJsaWMgbW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMucmF0aW5ncy5mb3JFYWNoKChpdGVtOiBJUmF0aW5nQ29udGV4dCwgaW5kZXgpID0+IChpdGVtLmhvdmVyZWQgPSAhKGluZGV4ID4gdGhpcy5fc2VsZWN0ZWRJbmRleCkpKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgcHVibGljIGJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGUgcmF0aW5nIHVzaW5nIGFycm93IGtleXMgYW5kIGhvbWUvZW5kIGtleXMgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4LS07XG4gICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5fc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggPCB0aGlzLnNpemUgLSAxKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCsrO1xuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgdGhpcy51cGRhdGUoMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnNpemUgLSAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgd3JpdGVWYWx1ZShyYXRpbmc6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChyYXRpbmcpIHtcbiAgICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4ocmF0aW5nKTtcbiAgICAgIHRoaXMucmF0aW5nID0gcmF0aW5nO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHJhdGluZyAtIDE7XG4gICAgICB0aGlzLnJhdGluZ3NIb3ZlcihyYXRpbmcgLSAxKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5ob3ZlcmVkSXRlbSh0aGlzLl9zZWxlY3RlZEluZGV4KTtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIHRoaXMucmF0ZUNoYW5nZS5lbWl0KGluZGV4ICsgMSk7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIHJhdGluZyBjaGFuZ2VzLlxuICBwcml2YXRlIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgaW5wdXQgaXMgdG91Y2hlZCAod2hlbiBhIHN0YXIgaXMgY2xpY2tlZCkuXG4gIHByaXZhdGUgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIHJhdGluZ3NIb3ZlcihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yYXRpbmdzLmZvckVhY2goKGl0ZW06IElSYXRpbmdDb250ZXh0LCBpKSA9PiAoaXRlbS5ob3ZlcmVkID0gaW5kZXggPj0gaSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgYXJpYVZhbHVlVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLl9zZWxlY3RlZEluZGV4ICsgMX0gb3V0IG9mICR7dGhpcy5zaXplfWA7XG4gIH1cbn1cbiJdfQ==