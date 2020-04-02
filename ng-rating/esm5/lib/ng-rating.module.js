import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { NgRatingComponent } from './ng-rating.component';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgRatingLabelDirective } from './ng-rating-label.directive';
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
export { NgRatingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXJhdGluZy8iLCJzb3VyY2VzIjpbImxpYi9uZy1yYXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBT3JFO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixjQUFjO1FBTDFCLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHNCQUFzQixDQUFDO1lBQ3pELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixDQUFDO1lBQ3JFLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLHNCQUFzQixDQUFDO1NBQ3JELENBQUM7T0FDVyxjQUFjLENBQUc7SUFBRCxxQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSYXRpbmdDb21wb25lbnQgfSBmcm9tICcuL25nLXJhdGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEhhbW1lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nUmF0aW5nTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL25nLXJhdGluZy1sYWJlbC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ1JhdGluZ0NvbXBvbmVudCwgTmdSYXRpbmdMYWJlbERpcmVjdGl2ZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBIYW1tZXJNb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbiAgZXhwb3J0czogW05nUmF0aW5nQ29tcG9uZW50LCBOZ1JhdGluZ0xhYmVsRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdSYXRpbmdNb2R1bGUge31cbiJdfQ==