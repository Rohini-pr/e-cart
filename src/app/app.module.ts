import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { ProductsModule } from './products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({      // ToastrModule added
      timeOut:3000,
      positionClass:'toast-top-center',
      preventDuplicates:true
    }), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
