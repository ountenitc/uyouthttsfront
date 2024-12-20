import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RequestInterceptorService } from './services/request-interceptor.service';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AppComponent, MatSlideToggleModule,
    HttpClientModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatPaginatorModule,    
  ],
  providers: [
  /*   {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
     
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'fr-FR'}, */
  ]
})
export class AppModule { }
