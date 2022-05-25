import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { UsersModule } from './users/users.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    UsersModule,
    BrowserAnimationsModule,
    MatMenuModule    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: JwtInterceptorInterceptor, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
