import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgPatternModule } from 'ngPattern';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgPatternModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
