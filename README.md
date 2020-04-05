[![Build Status](https://travis-ci.com/darkoandreev/d-ng-rating.svg?token=dyC7xCjKChVxFuxWSFtn&branch=master)](https://travis-ci.com/darkoandreev/d-ng-rating)

# Rating - Angular powered rating library

## Demo

Please check rating component in action at http://darkoandreev.github.io/d-ng-rating

## Installation

You need to have an Angular project with the supported Angular version. We strongly recommend using Angular CLI for this.


After installing the above dependencies, install **d-ng-rating** via:

```html
npm install d-ng-rating --save
```

Once installed you need to import our main module:

```javascript
import { NgRatingModule } from 'd-ng-rating';

@NgModule({
  ...
  imports: [NgRatingModule, ...],
  ...
})
export class YourAppModule {
}
```
**NOTE** There are few more packages that are dependencies of the library.

### Dependecies
- @fortawesome/angular-fontawesome
- @fortawesome/fontawesome-svg-core
- @fortawesome/free-solid-svg-icons
- @angular/cdk

See more details in the [official documentation](https://github.com/darkoandreev/d-ng-rating/blob/master/projects/d-ng-rating/README.md)

## Supported browsers

We support the same browsers and versions supported by Angular, whichever is more restrictive. See Angular browser support for more details, but on the high-level it should be something like:

Chrome (45+)
Firefox (40+)
IE (10+)
Edge (20+)
Safari (7+)
