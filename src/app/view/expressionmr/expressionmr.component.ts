import { Component } from '@angular/core';
import { Expressionmr } from '../../model/expressionmr';
import { ExpressionmrService } from '../../services/expressionmr.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExpressionmrFormComponent } from '../../form/expressionmr-form/expressionmr-form.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-expressionmr',
  standalone: true,
  imports: [
    NgFor, 
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './expressionmr.component.html',
  styleUrl: './expressionmr.component.css'
})
export class ExpressionmrComponent {

  itemsPerPage:number=10;
  p:number=1;
  expressionmrs: Expressionmr[]=[];
  expressionmrs1: Expressionmr[]=[];
  expressionmrs2: Expressionmr[]=[];
  searchText:String="";
  constructor(private expressionmrService: ExpressionmrService ) {  
    this.ngOnInit();  
    }

  ngOnInit() {
   this.expressionmrService.findAll().subscribe({
   next:(response)=>{
    console.log("expressionMr :", response);
        this.expressionmrs = response;
        this.expressionmrs1 = response;
        this.expressionmrs2 = response;
      },
      error:()=>{
        console.log();
      },
                 
  })
  }

  filtrer(){   
    if(this.searchText){
     const filterValue = this.searchText
     this.expressionmrs=this.expressionmrs1.filter(function(item){
       return (item.formecritmr)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.formprononcemr)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.idmefr?.formeecrite)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.idlangue?.liblangue)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.expressionmrs=this.expressionmrs2;
    }
   }


   delete(element:Expressionmr){
    this.expressionmrService.delete(Number(element.idmemr)).subscribe({
      next:()=>{
        alert("Suppression réussie")
       this.actualiser();
      },
      error:(err)=> {
        if(err.status==200 || err.status==201 || err.status==202){
          alert("Suppression réussie")
          this.actualiser();
        }else{
          alert("Echec de la suppression")
        }
        
      },
    })
   }

   actualiser(){
    this.expressionmrService.findAll().subscribe({
      next:(response)=>{
           this.expressionmrs = response;
         },
         error:()=>{
           console.log();
         },
                    
     })
   }
}
export const routes: Routes = [
  {path:'AddExpressionmr', component:ExpressionmrFormComponent},
];
export class AppRoutingModule { }
