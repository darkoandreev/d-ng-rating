import { __decorate } from 'tslib';
import { HostBinding, Directive, forwardRef, EventEmitter, ContentChild, Input, Output, TemplateRef, HostListener, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { faStar, faBan } from '@fortawesome/free-solid-svg-icons';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const RATING_SIZE_ERROR = () => {
    throw Error('Rating size must be greater than zero.');
};
const RATE_SET_ERROR = () => {
    throw Error('Rate definition must be greather than zero.');
};

let NgRatingLabelDirective = class NgRatingLabelDirective {
    get ngRatingLabel() {
        return true;
    }
};
__decorate([
    HostBinding('class.d-ng-rating-label')
], NgRatingLabelDirective.prototype, "ngRatingLabel", null);
NgRatingLabelDirective = __decorate([
    Directive({
        selector: '[ngRatingLabel], d-ng-rating-label',
    })
], NgRatingLabelDirective);

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
const NG_RATING_VALUE_ACCESSOR = {
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
 * <d-ng-rating [input bindings]>
 *  <ng-template ngRatingLabel>{{ this.ratingLabel }}</ng-template>
 * </d-ng-rating>
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
     * <d-ng-rating [rating]="5"></d-ng-rating>
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
     * <d-ng-rating [size]="5"></d-ng-rating>
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
     * <d-ng-rating readonly></d-ng-rating>
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
     * <d-ng-rating disabled></d-ng-rating>
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
     * <d-ng-rating [showCancelIcon]="false"></d-ng-rating>
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
        selector: 'd-ng-rating',
        template: "<button *ngIf=\"showCancelIcon\" class=\"d-ng-rating-cancel\" (click)=\"cancel()\">\n  <fa-icon [icon]=\"cancelIcon\"></fa-icon>\n</button>\n<ng-container *ngFor=\"let rating of ratings; let index = index\">\n  <button\n    type=\"button\"\n    class=\"d-ng-rating-item\"\n    [attr.aria-selected]=\"_selectedIndex === index\"\n    [attr.aria-posinset]=\"index + 1\"\n    [disabled]=\"disabled\"\n    [class.d-ng-rating-item-disabled]=\"disabled\"\n    (mouseenter)=\"hoveredItem(index)\"\n    (click)=\"handleClick(index)\"\n  >\n    <ng-container\n      *ngTemplateOutlet=\"ratingTemplateContent || ratingTemplate || defaultTemplate; context: rating\"\n    ></ng-container>\n  </button>\n</ng-container>\n\n<ng-content select=\"[ngRatingLabel], d-ng-rating-label\"></ng-content>\n\n<ng-template #defaultTemplate let-hovered=\"hovered\">\n  <fa-icon [class.d-ng-rating-item-icon-hover]=\"hovered\" class=\"d-ng-rating-item-icon\" [icon]=\"icon\"></fa-icon>\n</ng-template>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [NG_RATING_VALUE_ACCESSOR],
        encapsulation: ViewEncapsulation.None,
        styles: [":host{display:inline-flex;flex-direction:row;flex-wrap:wrap;outline:0}.d-ng-rating-item{border:none;outline:0;background:0 0}.d-ng-rating-item-icon{font-size:1.875rem;transition:.3s}.d-ng-rating-item-disabled{pointer-events:none;opacity:.7}.d-ng-rating-item-icon-hover{color:gold;cursor:pointer}.d-ng-rating-cancel{border:none;outline:0;background:0 0}.d-ng-rating-cancel fa-icon{font-size:1.875rem;color:#dc143c}.d-ng-rating-cancel fa-icon:hover{cursor:pointer}.d-ng-rating-label{display:inline-flex;align-self:center;padding-left:1rem;font-size:1.875rem}"]
    })
], NgRatingComponent);

let NgRatingModule = class NgRatingModule {
};
NgRatingModule = __decorate([
    NgModule({
        declarations: [NgRatingComponent, NgRatingLabelDirective],
        imports: [CommonModule, FormsModule, HammerModule, FontAwesomeModule],
        exports: [NgRatingComponent, NgRatingLabelDirective],
    })
], NgRatingModule);

/*
 * Public API Surface of d-ng-rating
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NG_RATING_VALUE_ACCESSOR, NgRatingComponent, NgRatingLabelDirective, NgRatingModule, RATE_SET_ERROR, RATING_SIZE_ERROR };
//# sourceMappingURL=d-ng-rating.js.map
