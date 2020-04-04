## Overview

Rating is Angular component that helps visualising and interacting with a star rating bar.

---

## Usage

### Basic rating

In order to create a rating component, we simply have to define it in our component's template:

```html
<d-ng-rating [size]="6"></d-ng-rating>
```

We need to define size of our rating items and we can do it by defining **size** mandatory property.

### Result label

We can define rating result label that shows clicked rate item.

```html
<d-ng-rating showCancelIcon (rateChange)="this.ratingLabel = $event" (rateCancel)="this.ratingLabel = null" [size]="6">
  <d-ng-rating-label>{{ this.ratingLabel }}</d-ng-rating-label>
</d-ng-rating>
```

### Using form

We can use single form for the rating component. Rating items are set to **type='button'** in order to prevent
sumibssion of the form before rating is completed.

```html
<form [formGroup]="form">
  <d-ng-rating formControlName="ratingControl" [size]="6"></d-ng-rating>
</form>
```

### Cancelable rating

By setting `showCancelIcon` property to **true**, we are activating new functionality for canceling current rating.
For example, we can cancel our rating if we rate wrong.
We can change rating cancel icon by using [FontAwesome icons](https://www.npmjs.com/package/@fortawesome/angular-fontawesome) and input property **cancelIcon**.

```html
<d-ng-rating showCancelIcon [size]="6"></d-ng-rating>
```

OR

```html
<d-ng-rating [showCancelIcon]="true" [size]="6"></d-ng-rating>
```

### Custom template

In order to use your own rating template, you can define it by using **ng-template** and **hovered** template variable.
Inside the template virtual element you need to define your rating item element and styling (item color, hovered item color).

```html
<d-ng-rating (rateChange)="this.ratingLabel = $event" [size]="6">
  <ng-template let-hovered="hovered">
    <span class="star" [class.filled]="hovered">&#9733;</span>
  </ng-template>
</d-ng-rating>
```

### Keyboard interaction

- ArrowUp, ArrowRight: Moves to next rating item
- ArrowDown, ArrowLeft: Moves to previous rating item
- Home: Moves to the first step header
- End: Moves to the last step header

---

## API

Please find the related API below.

### Reference

```javascript
import { NgratingModule } from '@d-ng-rating';
```

### NgRatingComponent

```html
Selector: d-ng-rating
```

| Property                  | Type                        | Description                                                      | Default value     |
| ------------------------- | --------------------------- | ---------------------------------------------------------------- | ----------------- |
| @Input() id               | string                      | Unique id of the element.                                        | Auto-generated    |
| @Input('aria-label')      | string                      | Used to set the aria-label attribute on the rating.              | star              |
| @Input('aria-labelledby') | string                      | Used to set the aria-labelledby attribute on the rating.         | Star rating       |
| @Input() rating           | number                      | Used to set a number of initially selected items.                | 0                 |
| @Input() size             | number                      | Used to set maximal rating that can be given.                    | 5                 |
| @Input() readonly         | boolean                     | If true, the rating can't be changed.                            | false             |
| @Input() disabled         | boolean                     | Used to set disabled property for rating.                        | false             |
| @Input() showCancelIcon   | boolean                     | Whether a cancel icon will be shown for canceling rating.        | false             |
| @Input() icon             | IconDefinition              | Used to set icon for rating item. FontAwesome used for icons.    | faStar            |
| @Input() cancelIcon       | IconDefinition              | Used to set icon for cancel button. FontAwesome used for icons.  | faBan             |
| @Output() rateChange      | EventEmitter<number>        | Event emitted when the rate is changed (rating item is clicked). | No default value. |
| @Output() rateCancel      | EventEmitter<void>          | Event emitted when rating is canceled.                           | No default value  |
| @Input() ratingTemplate   | TemplateRef<IRatingContext> | Define custom template and pass as reference.                    | No default value  |

### Dependency

In order to use our rating star and cancel icons you will need to install **@fortawesome/angular-fontawesome** package as
peer dependency. You can find this npm package [HERE](https://www.npmjs.com/package/@fortawesome/angular-fontawesome).
If you want to use your own custom rating template, then you don't need to install the peer dependency.

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
