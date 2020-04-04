import { __decorate } from 'tslib';
import { HostBinding, Directive, forwardRef, EventEmitter, ContentChild, Input, Output, TemplateRef, HostListener, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { faStar, faBan } from '@fortawesome/free-solid-svg-icons';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@fortawesome/angular-fontawesome';

function NgRatingComponent_button_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 3);
    ɵngcc0.ɵɵlistener("click", function NgRatingComponent_button_0_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.cancel(); });
    ɵngcc0.ɵɵelement(1, "fa-icon", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("icon", ctx_r0.cancelIcon);
} }
function NgRatingComponent_ng_container_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function NgRatingComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "button", 5);
    ɵngcc0.ɵɵlistener("mouseenter", function NgRatingComponent_ng_container_1_Template_button_mouseenter_1_listener() { ɵngcc0.ɵɵrestoreView(_r10); const index_r7 = ctx.index; const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.hoveredItem(index_r7); })("click", function NgRatingComponent_ng_container_1_Template_button_click_1_listener() { ɵngcc0.ɵɵrestoreView(_r10); const index_r7 = ctx.index; const ctx_r11 = ɵngcc0.ɵɵnextContext(); return ctx_r11.handleClick(index_r7); });
    ɵngcc0.ɵɵtemplate(2, NgRatingComponent_ng_container_1_ng_container_2_Template, 1, 0, "ng-container", 6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const rating_r6 = ctx.$implicit;
    const index_r7 = ctx.index;
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    const _r2 = ɵngcc0.ɵɵreference(4);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassProp("ng-rating-item-disabled", ctx_r1.disabled);
    ɵngcc0.ɵɵproperty("disabled", ctx_r1.disabled);
    ɵngcc0.ɵɵattribute("aria-selected", ctx_r1._selectedIndex === index_r7)("aria-posinset", index_r7 + 1);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r1.ratingTemplateContent || ctx_r1.ratingTemplate || _r2)("ngTemplateOutletContext", rating_r6);
} }
function NgRatingComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "fa-icon", 7);
} if (rf & 2) {
    const hovered_r12 = ctx.hovered;
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassProp("ng-rating-item-icon-hover", hovered_r12);
    ɵngcc0.ɵɵproperty("icon", ctx_r3.icon);
} }
const _c0 = [[["", "ngRatingLabel", ""], ["ng-rating-label"]]];
const _c1 = ["[ngRatingLabel], ng-rating-label"];
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
NgRatingLabelDirective.ɵfac = function NgRatingLabelDirective_Factory(t) { return new (t || NgRatingLabelDirective)(); };
NgRatingLabelDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NgRatingLabelDirective, selectors: [["", "ngRatingLabel", ""], ["ng-rating-label"]], hostVars: 2, hostBindings: function NgRatingLabelDirective_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("ng-rating-label", ctx.ngRatingLabel);
    } } });
__decorate([
    HostBinding('class.ng-rating-label')
], NgRatingLabelDirective.prototype, "ngRatingLabel", null);

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
NgRatingComponent.ɵfac = function NgRatingComponent_Factory(t) { return new (t || NgRatingComponent)(); };
NgRatingComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgRatingComponent, selectors: [["ng-rating"]], contentQueries: function NgRatingComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, NgRatingLabelDirective, true);
        ɵngcc0.ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.ratingLabelTemplate = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.ratingTemplateContent = _t.first);
    } }, hostVars: 14, hostBindings: function NgRatingComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("mouseleave", function NgRatingComponent_mouseleave_HostBindingHandler() { return ctx.mouseLeave(); })("blur", function NgRatingComponent_blur_HostBindingHandler() { return ctx.blur(); })("keydown", function NgRatingComponent_keydown_HostBindingHandler($event) { return ctx.handleKeyDown($event); });
    } if (rf & 2) {
        ɵngcc0.ɵɵattribute("id", ctx.id)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby)("aria-valuemin", ctx.ariaValueMin)("aria-valuemax", ctx.ariaValueMax)("aria-valuenow", ctx.ariaValueNow)("aria-valuetext", ctx.ariaValueTextAttr)("role", ctx.role)("tabindex", ctx.tabindexAttr)("aria-disabled", ctx.ariaDisabled)("aria-readonly", ctx.ariaReadonly)("aria-setsize", ctx.ariaSetSize);
        ɵngcc0.ɵɵclassProp("ng-star-rating", ctx.starRatingClass);
    } }, inputs: { id: "id", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], icon: "icon", cancelIcon: "cancelIcon", rating: "rating", size: "size", readonly: "readonly", disabled: "disabled", showCancelIcon: "showCancelIcon", ratingTemplate: "ratingTemplate" }, outputs: { rateChange: "rateChange", rateCancel: "rateCancel" }, features: [ɵngcc0.ɵɵProvidersFeature([NG_RATING_VALUE_ACCESSOR]), ɵngcc0.ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 5, vars: 2, consts: [["class", "ng-rating-cancel", 3, "click", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["defaultTemplate", ""], [1, "ng-rating-cancel", 3, "click"], [3, "icon"], ["type", "button", 1, "ng-rating-item", 3, "disabled", "mouseenter", "click"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ng-rating-item-icon", 3, "icon"]], template: function NgRatingComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c0);
        ɵngcc0.ɵɵtemplate(0, NgRatingComponent_button_0_Template, 2, 1, "button", 0);
        ɵngcc0.ɵɵtemplate(1, NgRatingComponent_ng_container_1_Template, 3, 7, "ng-container", 1);
        ɵngcc0.ɵɵprojection(2);
        ɵngcc0.ɵɵtemplate(3, NgRatingComponent_ng_template_3_Template, 1, 3, "ng-template", null, 2, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.showCancelIcon);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.ratings);
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgForOf, ɵngcc2.FaIconComponent, ɵngcc1.NgTemplateOutlet], styles: [":host{display:inline-flex;flex-direction:row;flex-wrap:wrap;outline:0}.ng-rating-item{border:none;outline:0;background:0 0}.ng-rating-item-icon{font-size:1.875rem;transition:.3s}.ng-rating-item-disabled{pointer-events:none;opacity:.7}.ng-rating-item-icon-hover{color:gold;cursor:pointer}.ng-rating-cancel{border:none;outline:0;background:0 0}.ng-rating-cancel fa-icon{font-size:1.875rem;color:#dc143c}.ng-rating-cancel fa-icon:hover{cursor:pointer}.ng-rating-label{display:inline-flex;align-self:center;padding-left:1rem;font-size:1.875rem}"], encapsulation: 2, changeDetection: 0 });
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

let NgRatingModule = class NgRatingModule {
};
NgRatingModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NgRatingModule });
NgRatingModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NgRatingModule_Factory(t) { return new (t || NgRatingModule)(); }, imports: [[CommonModule, FormsModule, HammerModule, FontAwesomeModule]] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgRatingLabelDirective, [{
        type: Directive,
        args: [{
                selector: '[ngRatingLabel], ng-rating-label'
            }]
    }], null, { ngRatingLabel: [{
            type: HostBinding,
            args: ['class.ng-rating-label']
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgRatingComponent, [{
        type: Component,
        args: [{
                selector: 'ng-rating',
                template: "<button *ngIf=\"showCancelIcon\" class=\"ng-rating-cancel\" (click)=\"cancel()\">\n  <fa-icon [icon]=\"cancelIcon\"></fa-icon>\n</button>\n<ng-container *ngFor=\"let rating of ratings; let index = index\">\n  <button\n    type=\"button\"\n    class=\"ng-rating-item\"\n    [attr.aria-selected]=\"_selectedIndex === index\"\n    [attr.aria-posinset]=\"index + 1\"\n    [disabled]=\"disabled\"\n    [class.ng-rating-item-disabled]=\"disabled\"\n    (mouseenter)=\"hoveredItem(index)\"\n    (click)=\"handleClick(index)\"\n  >\n    <ng-container\n      *ngTemplateOutlet=\"ratingTemplateContent || ratingTemplate || defaultTemplate; context: rating\"\n    ></ng-container>\n  </button>\n</ng-container>\n\n<ng-content select=\"[ngRatingLabel], ng-rating-label\"></ng-content>\n\n<ng-template #defaultTemplate let-hovered=\"hovered\">\n  <fa-icon [class.ng-rating-item-icon-hover]=\"hovered\" class=\"ng-rating-item-icon\" [icon]=\"icon\"></fa-icon>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [NG_RATING_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                styles: [":host{display:inline-flex;flex-direction:row;flex-wrap:wrap;outline:0}.ng-rating-item{border:none;outline:0;background:0 0}.ng-rating-item-icon{font-size:1.875rem;transition:.3s}.ng-rating-item-disabled{pointer-events:none;opacity:.7}.ng-rating-item-icon-hover{color:gold;cursor:pointer}.ng-rating-cancel{border:none;outline:0;background:0 0}.ng-rating-cancel fa-icon{font-size:1.875rem;color:#dc143c}.ng-rating-cancel fa-icon:hover{cursor:pointer}.ng-rating-label{display:inline-flex;align-self:center;padding-left:1rem;font-size:1.875rem}"]
            }]
    }], function () { return []; }, { id: [{
            type: HostBinding,
            args: ['attr.id']
        }, {
            type: Input
        }], ariaLabel: [{
            type: HostBinding,
            args: ['attr.aria-label']
        }, {
            type: Input,
            args: ['aria-label']
        }], ariaLabelledby: [{
            type: HostBinding,
            args: ['attr.aria-labelledby']
        }, {
            type: Input,
            args: ['aria-labelledby']
        }], icon: [{
            type: Input
        }], cancelIcon: [{
            type: Input
        }], rateChange: [{
            type: Output
        }], rateCancel: [{
            type: Output
        }], starRatingClass: [{
            type: HostBinding,
            args: ['class.ng-star-rating']
        }], ariaValueMin: [{
            type: HostBinding,
            args: ['attr.aria-valuemin']
        }], ariaValueMax: [{
            type: HostBinding,
            args: ['attr.aria-valuemax']
        }], ariaValueNow: [{
            type: HostBinding,
            args: ['attr.aria-valuenow']
        }], ariaValueTextAttr: [{
            type: HostBinding,
            args: ['attr.aria-valuetext']
        }], role: [{
            type: HostBinding,
            args: ['attr.role']
        }], tabindexAttr: [{
            type: HostBinding,
            args: ['attr.tabindex']
        }], ariaDisabled: [{
            type: HostBinding,
            args: ['attr.aria-disabled']
        }], ariaReadonly: [{
            type: HostBinding,
            args: ['attr.aria-readonly']
        }], ariaSetSize: [{
            type: HostBinding,
            args: ['attr.aria-setsize']
        }], rating: [{
            type: Input
        }], size: [{
            type: Input
        }], readonly: [{
            type: Input
        }], disabled: [{
            type: Input
        }], showCancelIcon: [{
            type: Input
        }], mouseLeave: [{
            type: HostListener,
            args: ['mouseleave']
        }], blur: [{
            type: HostListener,
            args: ['blur']
        }], handleKeyDown: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }], ratingLabelTemplate: [{
            type: ContentChild,
            args: [NgRatingLabelDirective]
        }], ratingTemplateContent: [{
            type: ContentChild,
            args: [TemplateRef, { static: false }]
        }], ratingTemplate: [{
            type: Input
        }] }); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NgRatingModule, { declarations: function () { return [NgRatingComponent,
        NgRatingLabelDirective]; }, imports: function () { return [CommonModule, FormsModule, HammerModule, FontAwesomeModule]; }, exports: function () { return [NgRatingComponent,
        NgRatingLabelDirective]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgRatingModule, [{
        type: NgModule,
        args: [{
                declarations: [NgRatingComponent, NgRatingLabelDirective],
                imports: [CommonModule, FormsModule, HammerModule, FontAwesomeModule],
                exports: [NgRatingComponent, NgRatingLabelDirective]
            }]
    }], null, null); })();

/*
 * Public API Surface of ng-rating
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NG_RATING_VALUE_ACCESSOR, NgRatingComponent, NgRatingLabelDirective, NgRatingModule, RATE_SET_ERROR, RATING_SIZE_ERROR };

//# sourceMappingURL=ng-rating.js.map