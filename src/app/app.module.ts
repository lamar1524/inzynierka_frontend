import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthorizationModule } from '@authorization/authorization.module';
import { CoreModule } from '@core/core.module';
import { MainModule } from '@main/main.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { clearState } from './clear.reducer';

registerLocaleData(localePl, 'pl-PL');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}, { metaReducers: [clearState] }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    HttpClientModule,
    CoreModule,
    AuthorizationModule,
    MainModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
