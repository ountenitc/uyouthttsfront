import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatSlideToggleModule } from '@angular/material/slide-toggle'
import {MatButtonModule} from '@angular/material/button';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatSlideToggleModule,MatButtonModule,MatIconModule,MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
