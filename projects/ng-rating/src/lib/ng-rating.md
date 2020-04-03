## Overview

Rating is Angular 9 component that helps visualising and interacting with a star rating bar.

---

## Usage

### Basic rating

In order to create a rating component, we simply have to define it in our component's template:

```html
<ng-rating [size]="6"></ng-rating>
```

We need to define size of our rating items and we can do it by defining **size** mandatory property.

### Keyboard interaction

- ArrowUp, ArrowRight: Moves to next rating item
- ArrowDown, ArrowLeft: Moves to previous rating item
- Home: Moves to the first step header
- END: Moves to the last step header

---

## API

Please find the related API below.

### Reference

```javascript
import { NgratingModule } from '@ng-rating';
```

### NgRatingComponent

```html
Selector: ng-rating
```

| Property                  | Type                 | Description                                                      | Default value     |
| ------------------------- | -------------------- | ---------------------------------------------------------------- | ----------------- |
| @Input() id               | string               | Unique id of the element.                                        | Auto-generated    |
| @Input('aria-label')      | string               | Used to set the aria-label attribute on the rating.              | star              |
| @Input('aria-labelledby') | string               | Used to set the aria-labelledby attribute on the rating.         | Star rating       |
| @Input() rating           | number               | Used to set a number of initially selected items.                | 0                 |
| @Input() size             | number               | Used to set maximal rating that can be given.                    | 5                 |
| @Input() readonly         | boolean              | If true, the rating can't be changed.                            | false             |
| @Input() disabled         | boolean              | Used to set disabled property for rating.                        | false             |
| @Input() showCancelIcon   | boolean              | Whether a cancel icon will be shown for canceling rating.        | false             |
| @Input() icon             | IconDefinition       | Used to set icon for rating item. FontAwesome used for icons.    | faStar            |
| @Input() cancelIcon       | IconDefinition       | Used to set icon for cancel button. FontAwesome used for icons.  | faBan             |
| @Output() rateChange      | EventEmitter<number> | Event emitted when the rate is changed (rating item is clicked). | No default value. |
| @Output() rateCancel      | EventEmitter<void>   | Event emitted when rating is canceled.                           | No default value  |

### Interfaces

#### IRatingContext

```javascript
export interface IRatingContext {
  hovered: boolean;
}
```

---

## Accessibility

The rating component has role attribute set to **slider**.  
The component exposes aria inputs in order to provide accessible experience. The components should be given a meaningful label via aria-label or aria-labelledby. By default aria-label is set to **star** and aria-labelledby to **Star rating**.
