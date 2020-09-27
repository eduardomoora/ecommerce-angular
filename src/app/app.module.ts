import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressIndicatorInterceptorService } from './shared/services/progress-indicator-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ProductsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ProgressIndicatorInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
