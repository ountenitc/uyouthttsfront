import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LangueComponent } from './view/langue/langue.component';
import { HomeComponent } from './view/home/home.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { SpinnerComponent } from './view/spinner/spinner.component';
import { FulltextComponent } from './view/fulltext/fulltext.component';
import { FulltextFormComponent } from './form/fulltext-form/fulltext-form.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LangueComponent,
    HomeComponent,
    SpinnerComponent,
   // FulltextComponent,
    //FulltextFormComponent,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title: String;
  constructor() {
    this.title = 'Traduction';
  }
}
