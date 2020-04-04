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
 * <d-ng-rating [input bindings]>
 *  <ng-template ngRatingLabel>{{ this.ratingLabel }}</ng-template>
 * </d-ng-rating>
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
         * <d-ng-rating [icon]="faStar"></d-ng-rating>
         * ```
         * @memberOf NgRatingComponent
         */
        this.icon = faStar;
        /**
         * Gets/sets the `cancelIcon` for the component.
         * By default it uses **faBan** FontAwesome icon.
         * @example
         * ```html
         * <d-ng-rating [cancelIcon]="faBan"></d-ng-rating>
         * ```
         * @memberOf NgRatingComponent
         */
        this.cancelIcon = faBan;
        /**
         * An event that is emitted after the rate item is clicked and set.
         * Provides a number of clicked item - ex. 1,2,3, etc.
         * @example
         * ```html
         * <d-ng-rating [rateChange]="change($event)"></d-ng-rating>
         * ```
         */
        this.rateChange = new EventEmitter();
        /**
         * An event that is emitted after the rating is canceled (cleared).
         * @example
         * ```html
         * <d-ng-rating [rateCancel]="cancel($event)"></d-ng-rating>
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
         * <d-ng-rating [rating]="5"></d-ng-rating>
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
         * <d-ng-rating [size]="5"></d-ng-rating>
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
         * <d-ng-rating readonly></d-ng-rating>
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
         * <d-ng-rating disabled></d-ng-rating>
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
         * <d-ng-rating [showCancelIcon]="false"></d-ng-rating>
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
            selector: 'd-ng-rating',
            template: "<button *ngIf=\"showCancelIcon\" class=\"d-ng-rating-cancel\" (click)=\"cancel()\">\n  <fa-icon [icon]=\"cancelIcon\"></fa-icon>\n</button>\n<ng-container *ngFor=\"let rating of ratings; let index = index\">\n  <button\n    type=\"button\"\n    class=\"d-ng-rating-item\"\n    [attr.aria-selected]=\"_selectedIndex === index\"\n    [attr.aria-posinset]=\"index + 1\"\n    [disabled]=\"disabled\"\n    [class.d-ng-rating-item-disabled]=\"disabled\"\n    (mouseenter)=\"hoveredItem(index)\"\n    (click)=\"handleClick(index)\"\n  >\n    <ng-container\n      *ngTemplateOutlet=\"ratingTemplateContent || ratingTemplate || defaultTemplate; context: rating\"\n    ></ng-container>\n  </button>\n</ng-container>\n\n<ng-content select=\"[ngRatingLabel], d-ng-rating-label\"></ng-content>\n\n<ng-template #defaultTemplate let-hovered=\"hovered\">\n  <fa-icon [class.d-ng-rating-item-icon-hover]=\"hovered\" class=\"d-ng-rating-item-icon\" [icon]=\"icon\"></fa-icon>\n</ng-template>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [NG_RATING_VALUE_ACCESSOR],
            encapsulation: ViewEncapsulation.None,
            styles: [":host{display:inline-flex;flex-direction:row;flex-wrap:wrap;outline:0}.d-ng-rating-item{border:none;outline:0;background:0 0}.d-ng-rating-item-icon{font-size:1.875rem;transition:.3s}.d-ng-rating-item-disabled{pointer-events:none;opacity:.7}.d-ng-rating-item-icon-hover{color:gold;cursor:pointer}.d-ng-rating-cancel{border:none;outline:0;background:0 0}.d-ng-rating-cancel fa-icon{font-size:1.875rem;color:#dc143c}.d-ng-rating-cancel fa-icon:hover{cursor:pointer}.d-ng-rating-label{display:inline-flex;align-self:center;padding-left:1rem;font-size:1.875rem}"]
        })
    ], NgRatingComponent);
    return NgRatingComponent;
}());
export { NgRatingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2QtbmctcmF0aW5nLyIsInNvdXJjZXMiOlsibGliL25nLXJhdGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxXQUFXLEVBQ1gsWUFBWSxFQUdaLFlBQVksRUFDWixpQkFBaUIsRUFDakIsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBa0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVsQzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSx3QkFBd0IsR0FBUTtJQUMzQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQVNGLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUVsQjs7Ozs7Ozs7Ozs7OztHQWFHO0FBU0g7SUFBQTtRQUlFOztXQUVHO1FBQ0ksbUJBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQVMzQix3RkFBd0Y7UUFHakYsT0FBRSxHQUFHLG9CQUFrQixTQUFTLEVBQUksQ0FB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QWlCO1FBUjdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLDI5QkFBeUM7WUFFekMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3RDLENBQUM7T0FDVyxpQkFBaUIsQ0FpVzdCO0lBQUQsd0JBQUM7Q0FBQSxBQWpXRCxJQWlXQztTQWpXWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIEhvc3RCaW5kaW5nLFxuICBDb250ZW50Q2hpbGQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZmFTdGFyLCBmYUJhbiwgSWNvbkRlZmluaXRpb24gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgUkFUSU5HX1NJWkVfRVJST1IsIFJBVEVfU0VUX0VSUk9SIH0gZnJvbSAnLi9uZy1yYXRpbmcuZXJyb3InO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBOZ1JhdGluZ0xhYmVsRGlyZWN0aXZlIH0gZnJvbSAnLi9uZy1yYXRpbmctbGFiZWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uL3V0aWwva2V5JztcblxuLyoqXG4gKiBQcm92aWRlciB0aGF0IGFsbG93cyB0aGUgcmF0aW5nIGNvbXBvbmVudCB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogQGRvY3MtcHJpdmF0ZSBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IE5HX1JBVElOR19WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdSYXRpbmdDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbi8qKlxuICogUmF0aW5nIGl0ZW0gbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVJhdGluZ0NvbnRleHQge1xuICBob3ZlcmVkOiBib29sZWFuO1xufVxuXG5sZXQgVU5JUVVFX0lEID0gMDtcblxuLyoqXG4gKiBSYXRpbmcgY29tcG9uZW50cyBpcyBhIHN0YXIgYmFzZWQgc2VsZWN0aW9uIGlucHV0LlxuICogQSBzdGFyIHJhdGluZyB1c3VhbGx5IGNvbnNpc3RzIG9mIGltYWdlcyBvZiBzdGFycyB0aGF0IGNhbiBiZSB1c2VkIHRvIHJhdGUgYSBwYXJ0aWN1bGFyIGl0ZW0uXG4gKiBBIG1vdXNlIHVzZXIgaG92ZXJzIG92ZXIgdGhlIHN0YXJzIGFuZCBjbGlja3Mgb25lIHRvIHNlbGVjdCBpdC5cbiAqIEZvciBleGFtcGxlLCBpZiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHRoaXJkIHN0YXIgZnJvbSB0aGUgbGVmdCwgdGhlIHJhdGluZyBvZiB0aGUgaXRlbSBpcyAzIG9mIDUgc3RhcnMuXG4gKiBgYGBcbiAqIEBleGFtcGxlXG4gKiA8ZC1uZy1yYXRpbmcgW2lucHV0IGJpbmRpbmdzXT5cbiAqICA8bmctdGVtcGxhdGUgbmdSYXRpbmdMYWJlbD57eyB0aGlzLnJhdGluZ0xhYmVsIH19PC9uZy10ZW1wbGF0ZT5cbiAqIDwvZC1uZy1yYXRpbmc+XG4gKiBgYGBcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2QtbmctcmF0aW5nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25nLXJhdGluZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25nLXJhdGluZy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbTkdfUkFUSU5HX1ZBTFVFX0FDQ0VTU09SXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTmdSYXRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyByYXRpbmdzOiBJUmF0aW5nQ29udGV4dFtdO1xuXG4gIC8qKiBDdXJyZW50bHkgc2VsZWN0ZWQgcmF0aW5nIGl0ZW0gaW5kZXhcbiAgICogQGhpZGRlbiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBfc2VsZWN0ZWRJbmRleCA9IC0xO1xuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBAQ29udGVudENoaWxkKE5nUmF0aW5nTGFiZWxEaXJlY3RpdmUpIHB1YmxpYyByYXRpbmdMYWJlbFRlbXBsYXRlOiBOZ1JhdGluZ0xhYmVsRGlyZWN0aXZlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Mubmctc3Rhci1yYXRpbmcnKSBnZXQgc3RhclJhdGluZ0NsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgcmF0aW5nIGlucHV0LiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKVxuICBASW5wdXQoKVxuICBwdWJsaWMgaWQgPSBgbmctc3Rhci1yYXRpbmctJHtVTklRVUVfSUQrK31gO1xuXG4gIC8qKlxuICAgKiBBdHRhY2hlZCB0byB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgZWxlbWVudC5cbiAgICogSW4gbW9zdCBjYXNlcywgYXJpYS1sYWJlbGxlZGJ5IHdpbGwgdGFrZSBwcmVjZWRlbmNlIHNvIHRoaXMgbWF5IGJlIG9taXR0ZWQuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1sYWJlbCcpXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpXG4gIHB1YmxpYyBhcmlhTGFiZWwgPSAnc3Rhcic7XG5cbiAgLyoqXG4gICAqIFVzZXJzIGNhbiBzcGVjaWZ5IHRoZSBgYXJpYS1sYWJlbGxlZGJ5YCBhdHRyaWJ1dGUgd2hpY2ggd2lsbCBiZSBmb3J3YXJkZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1sYWJlbGxlZGJ5JylcbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKVxuICBwdWJsaWMgYXJpYUxhYmVsbGVkYnk6IHN0cmluZyB8IHVuZGVmaW5lZCA9ICdTdGFyIHJhdGluZyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtdmFsdWVtaW4nKSBnZXQgYXJpYVZhbHVlTWluKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS12YWx1ZW1heCcpIGdldCBhcmlhVmFsdWVNYXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zaXplO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtdmFsdWVub3cnKSBnZXQgYXJpYVZhbHVlTm93KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXggKyAxO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtdmFsdWV0ZXh0JykgZ2V0IGFyaWFWYWx1ZVRleHRBdHRyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYVZhbHVlVGV4dDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJykgZ2V0IHJvbGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ3NsaWRlcic7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKSBnZXQgdGFiaW5kZXhBdHRyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IDA7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1kaXNhYmxlZCcpIGdldCBhcmlhRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1yZWFkb25seScpIGdldCBhcmlhUmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmVhZG9ubHk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZXRzaXplJykgZ2V0IGFyaWFTZXRTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGByYXRpbmdgIGZvciB0aGUgY29tcG9uZW50LlxuICAgKiBEZXRlcm1pbmVzIHNlbGVjdGVkIHJhdGUgaXRlbXMuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPGQtbmctcmF0aW5nIFtyYXRpbmddPVwiNVwiPjwvZC1uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgcmF0aW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3JhdGluZztcbiAgfVxuICBwdWJsaWMgc2V0IHJhdGluZyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDw9IDApIHtcbiAgICAgIFJBVEVfU0VUX0VSUk9SKCk7XG4gICAgfVxuICAgIHRoaXMuX3JhdGluZyA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yYXRpbmc6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgc2l6ZWAgZm9yIHRoZSBjb21wb25lbnQuXG4gICAqIFNldHMgbWF4IG51bWJlciBvZiByYXRlIGl0ZW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxkLW5nLXJhdGluZyBbc2l6ZV09XCI1XCI+PC9kLW5nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cbiAgcHVibGljIHNldCBzaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPD0gMCkge1xuICAgICAgUkFUSU5HX1NJWkVfRVJST1IoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zaXplID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMucmF0aW5ncyA9IEFycmF5LmZyb20obmV3IEFycmF5KHZhbHVlKSkubWFwKCgpID0+IHtcbiAgICAgIGNvbnN0IHJhdGluZzogSVJhdGluZ0NvbnRleHQgPSB7XG4gICAgICAgIGhvdmVyZWQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICAgIHJldHVybiByYXRpbmc7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBfc2l6ZSA9IDU7XG5cbiAgLyoqXG4gICAqIEdldHMvc2V0cyB0aGUgYHJlYWRvbmx5YCBwcm9wZXJ0eS5cbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgcmF0ZSBjb21wb25lbnQgaXMgcmVhZG9ubHkuXG4gICAqIEJ5IGRlZmF1bHQgaXQncyAqKmZhbHNlKiouXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPGQtbmctcmF0aW5nIHJlYWRvbmx5PjwvZC1uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIHB1YmxpYyBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfcmVhZG9ubHkgPSBmYWxzZTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgZGlzYWJsZWRgIHByb3BlcnR5LlxuICAgKiBXaGV0aGVyIHRoZSByYXRlIGNvbXBvbmVudCBpcyBkaXNhYmxlZC5cbiAgICogQnkgZGVmYXVsdCByYXRlIGl0ZW1zIGFyZSBjbGlja2FibGUgKGRpc2FibGVkPWZhbHNlKS5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8ZC1uZy1yYXRpbmcgZGlzYWJsZWQ+PC9kLW5nLXJhdGluZz5cbiAgICogYGBgXG4gICAqIEBtZW1iZXJPZiBOZ1JhdGluZ0NvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgcHVibGljIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIGBzaG93Q2FuY2VsSWNvbmAgcHJvcGVydHkuXG4gICAqIFdoZXRoZXIgdGhlIGNhbmNlbCAoY2xlYXIpIGljb24gaXMgdmlzaWJsZS5cbiAgICogQnkgZGVmYXVsdCBpdCdzIHZpc2libGUuXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPGQtbmctcmF0aW5nIFtzaG93Q2FuY2VsSWNvbl09XCJmYWxzZVwiPjwvZC1uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgc2hvd0NhbmNlbEljb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dDYW5jZWxJY29uO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hvd0NhbmNlbEljb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93Q2FuY2VsSWNvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfc2hvd0NhbmNlbEljb24gPSBmYWxzZTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgaWNvbmAgZm9yIHRoZSByYXRlIGl0ZW0uXG4gICAqIEJ5IGRlZmF1bHQgaXQncyAqKmZhU3RhcioqIEZvbnRBd2Vzb21lIGljb24uXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGh0bWxcbiAgICogPGQtbmctcmF0aW5nIFtpY29uXT1cImZhU3RhclwiPjwvZC1uZy1yYXRpbmc+XG4gICAqIGBgYFxuICAgKiBAbWVtYmVyT2YgTmdSYXRpbmdDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBpY29uOiBJY29uRGVmaW5pdGlvbiA9IGZhU3RhcjtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBgY2FuY2VsSWNvbmAgZm9yIHRoZSBjb21wb25lbnQuXG4gICAqIEJ5IGRlZmF1bHQgaXQgdXNlcyAqKmZhQmFuKiogRm9udEF3ZXNvbWUgaWNvbi5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8ZC1uZy1yYXRpbmcgW2NhbmNlbEljb25dPVwiZmFCYW5cIj48L2QtbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICogQG1lbWJlck9mIE5nUmF0aW5nQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsSWNvbjogSWNvbkRlZmluaXRpb24gPSBmYUJhbjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgdGhhdCBpcyBlbWl0dGVkIGFmdGVyIHRoZSByYXRlIGl0ZW0gaXMgY2xpY2tlZCBhbmQgc2V0LlxuICAgKiBQcm92aWRlcyBhIG51bWJlciBvZiBjbGlja2VkIGl0ZW0gLSBleC4gMSwyLDMsIGV0Yy5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8ZC1uZy1yYXRpbmcgW3JhdGVDaGFuZ2VdPVwiY2hhbmdlKCRldmVudClcIj48L2QtbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgcmF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IHRoYXQgaXMgZW1pdHRlZCBhZnRlciB0aGUgcmF0aW5nIGlzIGNhbmNlbGVkIChjbGVhcmVkKS5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8ZC1uZy1yYXRpbmcgW3JhdGVDYW5jZWxdPVwiY2FuY2VsKCRldmVudClcIj48L2QtbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgcmF0ZUNhbmNlbDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBUaGUgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgdGhlIHdheSBlYWNoIHN0YXIgaXMgZGlzcGxheWVkLlxuICAgKlxuICAgKiBBbHRlcm5hdGl2ZWx5IHB1dCBhbiBgPG5nLXRlbXBsYXRlPmAgYXMgdGhlIG9ubHkgY2hpbGQgb2YgeW91ciBgPGQtbmctcmF0aW5nPmAgZWxlbWVudFxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBodG1sXG4gICAqIDxkLW5nLXJhdGluZyAocmF0ZUNoYW5nZSk9XCJ0aGlzLnJhdGluZ0xhYmVsID0gJGV2ZW50XCIgW3NpemVdPVwiNlwiPlxuICAgKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaG92ZXJlZD1cImhvdmVyZWRcIj5cbiAgICogICAgPHNwYW4gY2xhc3M9XCJzdGFyXCIgW2NsYXNzLmZpbGxlZF09XCJob3ZlcmVkXCI+JiM5NzMzOzwvc3Bhbj5cbiAgICogICA8L25nLXRlbXBsYXRlPlxuICAgKiA8L2QtbmctcmF0aW5nPlxuICAgKiBgYGBcbiAgICovXG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IGZhbHNlIH0pIHJhdGluZ1RlbXBsYXRlQ29udGVudDogVGVtcGxhdGVSZWY8SVJhdGluZ0NvbnRleHQ+O1xuICBASW5wdXQoKSByYXRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SVJhdGluZ0NvbnRleHQ+O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoJ3JhdGluZycgaW4gY2hhbmdlcyAmJiBjaGFuZ2VzLnJhdGluZy5jdXJyZW50VmFsdWUgPiAwKSB7XG4gICAgICB0aGlzLnJhdGluZ3NIb3Zlcih0aGlzLnJhdGluZyAtIDEpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHRoaXMucmF0aW5nIC0gMTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGhvdmVyZWRJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMucmF0aW5nc0hvdmVyKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGhhbmRsZUNsaWNrKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMudXBkYXRlKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgdGhpcy5yYXRpbmdzLmZvckVhY2goKGl0ZW06IElSYXRpbmdDb250ZXh0KSA9PiAoaXRlbS5ob3ZlcmVkID0gZmFsc2UpKTtcbiAgICB0aGlzLnJhdGVDYW5jZWwuZW1pdCgpO1xuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBwdWJsaWMgbW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMucmF0aW5ncy5mb3JFYWNoKChpdGVtOiBJUmF0aW5nQ29udGV4dCwgaW5kZXgpID0+IChpdGVtLmhvdmVyZWQgPSAhKGluZGV4ID4gdGhpcy5fc2VsZWN0ZWRJbmRleCkpKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgcHVibGljIGJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGUgcmF0aW5nIHVzaW5nIGFycm93IGtleXMgYW5kIGhvbWUvZW5kIGtleXMgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4LS07XG4gICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5fc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggPCB0aGlzLnNpemUgLSAxKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCsrO1xuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgdGhpcy51cGRhdGUoMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnNpemUgLSAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgd3JpdGVWYWx1ZShyYXRpbmc6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChyYXRpbmcpIHtcbiAgICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4ocmF0aW5nKTtcbiAgICAgIHRoaXMucmF0aW5nID0gcmF0aW5nO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHJhdGluZyAtIDE7XG4gICAgICB0aGlzLnJhdGluZ3NIb3ZlcihyYXRpbmcgLSAxKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGhpZGRlbiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgLyoqIEBoaWRkZW4gQGludGVybmFsICovXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKiBAaGlkZGVuIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5ob3ZlcmVkSXRlbSh0aGlzLl9zZWxlY3RlZEluZGV4KTtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIHRoaXMucmF0ZUNoYW5nZS5lbWl0KGluZGV4ICsgMSk7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIHJhdGluZyBjaGFuZ2VzLlxuICBwcml2YXRlIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgaW5wdXQgaXMgdG91Y2hlZCAod2hlbiBhIHN0YXIgaXMgY2xpY2tlZCkuXG4gIHByaXZhdGUgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIHJhdGluZ3NIb3ZlcihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yYXRpbmdzLmZvckVhY2goKGl0ZW06IElSYXRpbmdDb250ZXh0LCBpKSA9PiAoaXRlbS5ob3ZlcmVkID0gaW5kZXggPj0gaSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgYXJpYVZhbHVlVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLl9zZWxlY3RlZEluZGV4ICsgMX0gb3V0IG9mICR7dGhpcy5zaXplfWA7XG4gIH1cbn1cbiJdfQ==