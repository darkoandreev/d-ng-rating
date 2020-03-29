import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule } from './rating/rating.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    MatToolbarModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RatingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
