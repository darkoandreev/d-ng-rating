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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2QtbmctcmF0aW5nLyIsInNvdXJjZXMiOlsibGliL25nLXJhdGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFPckU7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLENBQUM7WUFDekQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLENBQUM7WUFDckUsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLENBQUM7U0FDckQsQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1JhdGluZ0NvbXBvbmVudCB9IGZyb20gJy4vbmctcmF0aW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSGFtbWVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmdSYXRpbmdMYWJlbERpcmVjdGl2ZSB9IGZyb20gJy4vbmctcmF0aW5nLWxhYmVsLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nUmF0aW5nQ29tcG9uZW50LCBOZ1JhdGluZ0xhYmVsRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEhhbW1lck1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxuICBleHBvcnRzOiBbTmdSYXRpbmdDb21wb25lbnQsIE5nUmF0aW5nTGFiZWxEaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JhdGluZ01vZHVsZSB7fVxuIl19