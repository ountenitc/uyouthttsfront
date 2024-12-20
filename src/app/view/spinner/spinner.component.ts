import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  constructor(public loader: LoaderService) { }

}
