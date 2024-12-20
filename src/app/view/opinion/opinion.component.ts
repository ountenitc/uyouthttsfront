import { Component } from '@angular/core';
import { Opinion } from '../../model/opinion';
import { OpinionService } from '../../services/opinion.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-opinion',
  standalone: true,
  imports: [
    NgFor, 
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './opinion.component.html',
  styleUrl: './opinion.component.css'
})
export class OpinionComponent {

  itemsPerPage:number=10;
  p:number=1;
  searchText:string="";
  opinions!: Opinion[];
  opinions1!: Opinion[];
  opinions2!: Opinion[];
  constructor(public opinionService: OpinionService ) {  
    this.ngOnInit();  
    }

  ngOnInit() {
   this.opinionService.findAll().subscribe({
   next:(response)=>{
        this.opinions = response;
        this.opinions1 = response;
        this.opinions2 = response;
      },
      error:()=>{
        console.log();
      },
                 
  })
  }

  filtrer(){    
    if(this.searchText){
     const filterValue = this.searchText
     this.opinions=this.opinions1.filter(function(item){
       return (item.optextefr)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.optextemr)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.opinions=this.opinions2;
    }
   }

   delete(element:Opinion){
    this.opinionService.delete(Number(element.idopinionfrmr)).subscribe({
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
    this.opinionService.findAll().subscribe({
      next:(response)=>{
           this.opinions = response;
           this.opinions1 = response;
           this.opinions2 = response;
         },
         error:()=>{
           console.log();
         },
                    
     })
   }

}
