import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Alertetext } from '../../model/alertetext';
import { AlertetextService } from '../../services/alertetext.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alertetext',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    RouterModule,
    MatTableModule,
    FormsModule,
    NgxPaginationModule,
    NgIf,
  ],
  templateUrl: './alertetext.component.html',
  styleUrl: './alertetext.component.css'
})
export class AlertetextComponent implements OnInit{ 
  itemsPerPage:number=10;
  p:number=1;   
  alertetexts!: Alertetext[];
  constructor(private alertetextService: AlertetextService ) {  
    this.ngOnInit();  
    }

  ngOnInit() {
   this.alertetextService.findAll().subscribe({
   next:(response)=>{
        this.alertetexts = response;
      },
      error:()=>{
        console.log();
      },
                 
  })
  }
}
