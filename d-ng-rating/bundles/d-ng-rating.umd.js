(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@fortawesome/free-solid-svg-icons'), require('@angular/cdk/coercion'), require('@angular/common'), require('@angular/platform-browser'), require('@fortawesome/angular-fontawesome')) :
    typeof define === 'function' && define.amd ? define('d-ng-rating', ['exports', '@angular/core', '@angular/forms', '@fortawesome/free-solid-svg-icons', '@angular/cdk/coercion', '@angular/common', '@angular/platform-browser', '@fortawesome/angular-fontawesome'], factory) :
    (global = global || self, factory(global['d-ng-rating'] = {}, global.ng.core, global.ng.forms, global.freeSolidSvgIcons, global.ng.cdk.coercion, global.ng.common, global.ng.platformBrowser, global.angularFontawesome));
}(this, (function (exports, core, forms, freeSolidSvgIcons, coercion, common, platformBrowser, angularFontawesome) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
            core.HostBinding('class.d-ng-rating-label')
        ], NgRatingLabelDirective.prototype, "ngRatingLabel", null);
        NgRatingLabelDirective = __decorate([
            core.Directive({
                selector: '[ngRatingLabel], d-ng-rating-label',
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return NgRatingComponent; }),
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
            this.icon = freeSolidSvgIcons.faStar;
            /**
             * Gets/sets the `cancelIcon` for the component.
             * By default it uses **faBan** FontAwesome icon.
             * @example
             * ```html
             * <d-ng-rating [cancelIcon]="faBan"></d-ng-rating>
             * ```
             * @memberOf NgRatingComponent
             */
            this.cancelIcon = freeSolidSvgIcons.faBan;
            /**
             * An event that is emitted after the rate item is clicked and set.
             * Provides a number of clicked item - ex. 1,2,3, etc.
             * @example
             * ```html
             * <d-ng-rating [rateChange]="change($event)"></d-ng-rating>
             * ```
             */
            this.rateChange = new core.EventEmitter();
            /**
             * An event that is emitted after the rating is canceled (cleared).
             * @example
             * ```html
             * <d-ng-rating [rateCancel]="cancel($event)"></d-ng-rating>
             * ```
             */
            this.rateCancel = new core.EventEmitter();
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
                this._rating = coercion.coerceNumberProperty(value);
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
                this._size = coercion.coerceNumberProperty(value);
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
                this._readonly = coercion.coerceBooleanProperty(value);
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
                this._disabled = coercion.coerceBooleanProperty(value);
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
                this._showCancelIcon = coercion.coerceBooleanProperty(value);
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
            core.ContentChild(NgRatingLabelDirective)
        ], NgRatingComponent.prototype, "ratingLabelTemplate", void 0);
        __decorate([
            core.HostBinding('class.ng-star-rating')
        ], NgRatingComponent.prototype, "starRatingClass", null);
        __decorate([
            core.HostBinding('attr.id'),
            core.Input()
        ], NgRatingComponent.prototype, "id", void 0);
        __decorate([
            core.HostBinding('attr.aria-label'),
            core.Input('aria-label')
        ], NgRatingComponent.prototype, "ariaLabel", void 0);
        __decorate([
            core.HostBinding('attr.aria-labelledby'),
            core.Input('aria-labelledby')
        ], NgRatingComponent.prototype, "ariaLabelledby", void 0);
        __decorate([
            core.HostBinding('attr.aria-valuemin')
        ], NgRatingComponent.prototype, "ariaValueMin", null);
        __decorate([
            core.HostBinding('attr.aria-valuemax')
        ], NgRatingComponent.prototype, "ariaValueMax", null);
        __decorate([
            core.HostBinding('attr.aria-valuenow')
        ], NgRatingComponent.prototype, "ariaValueNow", null);
        __decorate([
            core.HostBinding('attr.aria-valuetext')
        ], NgRatingComponent.prototype, "ariaValueTextAttr", null);
        __decorate([
            core.HostBinding('attr.role')
        ], NgRatingComponent.prototype, "role", null);
        __decorate([
            core.HostBinding('attr.tabindex')
        ], NgRatingComponent.prototype, "tabindexAttr", null);
        __decorate([
            core.HostBinding('attr.aria-disabled')
        ], NgRatingComponent.prototype, "ariaDisabled", null);
        __decorate([
            core.HostBinding('attr.aria-readonly')
        ], NgRatingComponent.prototype, "ariaReadonly", null);
        __decorate([
            core.HostBinding('attr.aria-setsize')
        ], NgRatingComponent.prototype, "ariaSetSize", null);
        __decorate([
            core.Input()
        ], NgRatingComponent.prototype, "rating", null);
        __decorate([
            core.Input()
        ], NgRatingComponent.prototype, "size", null);
        __decorate([
            core.Input()
        ], NgRatingComponent.prototype, "readonly", null);
        __decorate([
            core.Input()
        ], NgRatingComponent.prototype, "disabled", null);
        __decorate([
            core.Input()
        ], NgRatingComponent.prototype, "showCancelIcon", null);
        __decorate([
            core.Input()
        ], NgRatingComponent.prototype, "icon", void 0);
        __decorate([
            core.Input()
        ], NgRatingComponent.prototype, "cancelIcon", void 0);
        __decorate([
            core.Output()
        ], NgRatingComponent.prototype, "rateChange", void 0);
        __decorate([
            core.Output()
        ], NgRatingComponent.prototype, "rateCancel", void 0);
        __decorate([
            core.ContentChild(core.TemplateRef, { static: false })
        ], NgRatingComponent.prototype, "ratingTemplateContent", void 0);
        __decorate([
            core.Input()
        ], NgRatingComponent.prototype, "ratingTemplate", void 0);
        __decorate([
            core.HostListener('mouseleave')
        ], NgRatingComponent.prototype, "mouseLeave", null);
        __decorate([
            core.HostListener('blur')
        ], NgRatingComponent.prototype, "blur", null);
        __decorate([
            core.HostListener('keydown', ['$event'])
        ], NgRatingComponent.prototype, "handleKeyDown", null);
        NgRatingComponent = __decorate([
            core.Component({
                selector: 'd-ng-rating',
                template: "<button *ngIf=\"showCancelIcon\" class=\"d-ng-rating-cancel\" (click)=\"cancel()\">\n  <fa-icon [icon]=\"cancelIcon\"></fa-icon>\n</button>\n<ng-container *ngFor=\"let rating of ratings; let index = index\">\n  <button\n    type=\"button\"\n    class=\"d-ng-rating-item\"\n    [attr.aria-selected]=\"_selectedIndex === index\"\n    [attr.aria-posinset]=\"index + 1\"\n    [disabled]=\"disabled\"\n    [class.d-ng-rating-item-disabled]=\"disabled\"\n    (mouseenter)=\"hoveredItem(index)\"\n    (click)=\"handleClick(index)\"\n  >\n    <ng-container\n      *ngTemplateOutlet=\"ratingTemplateContent || ratingTemplate || defaultTemplate; context: rating\"\n    ></ng-container>\n  </button>\n</ng-container>\n\n<ng-content select=\"[ngRatingLabel], d-ng-rating-label\"></ng-content>\n\n<ng-template #defaultTemplate let-hovered=\"hovered\">\n  <fa-icon [class.d-ng-rating-item-icon-hover]=\"hovered\" class=\"d-ng-rating-item-icon\" [icon]=\"icon\"></fa-icon>\n</ng-template>\n",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                providers: [NG_RATING_VALUE_ACCESSOR],
                encapsulation: core.ViewEncapsulation.None,
                styles: [":host{display:inline-flex;flex-direction:row;flex-wrap:wrap;outline:0}.d-ng-rating-item{border:none;outline:0;background:0 0}.d-ng-rating-item-icon{font-size:1.875rem;transition:.3s}.d-ng-rating-item-disabled{pointer-events:none;opacity:.7}.d-ng-rating-item-icon-hover{color:gold;cursor:pointer}.d-ng-rating-cancel{border:none;outline:0;background:0 0}.d-ng-rating-cancel fa-icon{font-size:1.875rem;color:#dc143c}.d-ng-rating-cancel fa-icon:hover{cursor:pointer}.d-ng-rating-label{display:inline-flex;align-self:center;padding-left:1rem;font-size:1.875rem}"]
            })
        ], NgRatingComponent);
        return NgRatingComponent;
    }());

    var NgRatingModule = /** @class */ (function () {
        function NgRatingModule() {
        }
        NgRatingModule = __decorate([
            core.NgModule({
                declarations: [NgRatingComponent, NgRatingLabelDirective],
                imports: [common.CommonModule, forms.FormsModule, platformBrowser.HammerModule, angularFontawesome.FontAwesomeModule],
                exports: [NgRatingComponent, NgRatingLabelDirective],
            })
        ], NgRatingModule);
        return NgRatingModule;
    }());

    exports.NG_RATING_VALUE_ACCESSOR = NG_RATING_VALUE_ACCESSOR;
    exports.NgRatingComponent = NgRatingComponent;
    exports.NgRatingLabelDirective = NgRatingLabelDirective;
    exports.NgRatingModule = NgRatingModule;
    exports.RATE_SET_ERROR = RATE_SET_ERROR;
    exports.RATING_SIZE_ERROR = RATING_SIZE_ERROR;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d-ng-rating.umd.js.map
