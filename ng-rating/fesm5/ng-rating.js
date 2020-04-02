import { __decorate } from 'tslib';
import { HostBinding, Directive, forwardRef, EventEmitter, ContentChild, Input, Output, TemplateRef, HostListener, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { faStar, faBan } from '@fortawesome/free-solid-svg-icons';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

var RATING_SIZE_ERROR = function () {
    throw Error('Rating size must be greater than zero.');
};
var RATE_SET_ERROR = function () {
    throw Error('Rate definition must be greather than zero.');
};

var NgRatingLabelDirective = /** @class */ (function () {
    function NgRatingLabelDirective() {
    }
    Object.defineProperty(NgRatingLabelDirective.prototype, "ngRatingLabel", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        HostBinding('class.ng-rating-label')
    ], NgRatingLabelDirective.prototype, "ngRatingLabel", null);
    NgRatingLabelDirective = __decorate([
        Directive({
            selector: '[ngRatingLabel], ng-rating-label',
        })
    ], NgRatingLabelDirective);
    return NgRatingLabelDirective;
}());

var Key;
(function (Key) {
    Key["End"] = "End";
    Key["Home"] = "Home";
    Key["ArrowLeft"] = "ArrowLeft";
    Key["ArrowUp"] = "ArrowUp";
    Key["ArrowRight"] = "ArrowRight";
    Key["ArrowDown"] = "ArrowDown";
})(Key || (Key = {}));

/**
 * Provider that allows the rating component to register as a ControlValueAccessor.
 * @docs-private @internal
 */
var NG_RATING_VALUE_ACCESSOR = {
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

var NgRatingModule = /** @class */ (function () {
    function NgRatingModule() {
    }
    NgRatingModule = __decorate([
        NgModule({
            declarations: [NgRatingComponent, NgRatingLabelDirective],
            imports: [CommonModule, FormsModule, HammerModule, FontAwesomeModule],
            exports: [NgRatingComponent, NgRatingLabelDirective],
        })
    ], NgRatingModule);
    return NgRatingModule;
}());

/*
 * Public API Surface of ng-rating
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NG_RATING_VALUE_ACCESSOR, NgRatingComponent, NgRatingLabelDirective, NgRatingModule, RATE_SET_ERROR, RATING_SIZE_ERROR };
//# sourceMappingURL=ng-rating.js.map
