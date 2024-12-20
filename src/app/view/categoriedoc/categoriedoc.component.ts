import { Component } from '@angular/core';
import { Categoriedoc } from '../../model/categoriedoc';
import { CategoriedocService } from '../../services/categoriedoc.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriedocFormComponent } from '../../form/categoriedoc-form/categoriedoc-form.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-categoriedoc',
  standalone: true,
  imports: [
    NgFor, 
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './categoriedoc.component.html',
  styleUrl: './categoriedoc.component.css'
})
export class CategoriedocComponent {

  itemsPerPage:number=10;
  p:number=1;
  searchText:string="";
  categoriedocs!: Categoriedoc[];
  categoriedocs1!: Categoriedoc[];
  categoriedocs2!: Categoriedoc[];
  constructor(private categoriedocService: CategoriedocService ) {  
    this.ngOnInit();  
    }

  ngOnInit() {
   this.categoriedocService.findAll().subscribe({
   next:(response)=>{
        this.categoriedocs = response;
        this.categoriedocs1 = response;
        this.categoriedocs2 = response;
      },
      error:()=>{
        console.log();
      },
                 
  })
  }

  filtrer(){    
    
    if(this.searchText){
      console.log(this.searchText)
     const filterValue = this.searchText
     this.categoriedocs=this.categoriedocs1.filter(function(item){
       return (item.libcatdoc)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.categoriedocs=this.categoriedocs2;
    }
   }

   delete(element:Categoriedoc){
    this.categoriedocService.delete(Number(element.idcatdoc)).subscribe({
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
    this.categoriedocService.findAll().subscribe({
      next:(response)=>{
           this.categoriedocs = response;
           this.categoriedocs1 = response;
           this.categoriedocs2 = response;
         },
         error:()=>{
           console.log();
         },
                    
     })
   }
}
export const routes: Routes = [
  {path:'AddCategoriedoc', component:CategoriedocFormComponent},
];
export class AppRoutingModule { }
