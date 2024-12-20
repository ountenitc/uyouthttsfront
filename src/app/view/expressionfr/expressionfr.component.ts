import { Component } from '@angular/core';
import { Expressionfr } from '../../model/expressionfr';
import { ExpressionfrService } from '../../services/expressionfr.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExpressionfrFormComponent } from '../../form/expressionfr-form/expressionfr-form.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-expressionfr',
  standalone: true,
  imports: [
    NgFor, 
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './expressionfr.component.html',
  styleUrl: './expressionfr.component.css'
})
export class ExpressionfrComponent {

  itemsPerPage:number=10;
  p:number=1;
  searchText:string="";
  expressionfrs!: Expressionfr[];
  expressionfrs1!: Expressionfr[];
  expressionfrs2!: Expressionfr[];
  constructor(private expressionfrService: ExpressionfrService ) {  
    this.ngOnInit();  
    }

  ngOnInit() {
   this.expressionfrService.findAll().subscribe({
   next:(response)=>{
        this.expressionfrs = response;
        this.expressionfrs1 = response;
        this.expressionfrs2 = response;
      },
      error:()=>{
        console.log();
      },
                 
  })
  }

  filtrer(){    
    if(this.searchText){
     const filterValue = this.searchText
     this.expressionfrs=this.expressionfrs1.filter(function(item){
       return (item.formeecrite)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.formprononce)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.expressionfrs=this.expressionfrs2;
    }
   }
}
export const routes: Routes = [
  {path:'AddExpressionfr', component:ExpressionfrFormComponent},
];
export class AppRoutingModule { }
