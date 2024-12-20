import { Component } from '@angular/core';
import { Fulltext } from '../../model/fulltext';
import { FulltextService } from '../../services/fulltext.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FulltextFormComponent } from '../../form/fulltext-form/fulltext-form.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-fulltext',
  standalone: true,
  imports: [
    NgFor, 
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './fulltext.component.html',
  styleUrl: './fulltext.component.css'
})
export class FulltextComponent {

  itemsPerPage:number=10;
  p:number=1;
  searchText:any;
  fulltexts!: Fulltext[];
  fulltextsFiltrer!: Fulltext[];
  fulltextsInit!: Fulltext[];
  fulltextsFiltre!: Fulltext[];
  constructor(public fulltextService: FulltextService ) {  
    this.ngOnInit();  
    }

  ngOnInit() {
   this.fulltextService.findAll().subscribe({
   next:(response)=>{
        this.fulltexts = response;
        this.fulltextsInit = response;
        this.fulltextsFiltre = response;
      },
      error:()=>{
        console.log();
      },
                 
  })
  }

  filtrer(){    
    if(this.searchText){
     const filterValue = this.searchText
     this.fulltexts=this.fulltextsFiltre.filter(function(item){
       return (item.sttextefr)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.sttextemr)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.fulltexts=this.fulltextsInit;
    }
   }


   delete(element:Fulltext){
    this.fulltextService.delete(Number(element.idstoriefrmr)).subscribe({
      next:()=>{
        alert("Suppression réussie")
        this.actualiser()
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
    this.fulltextService.findAll().subscribe({
      next:(response)=>{
           this.fulltexts = response;
           this.fulltextsInit = response;
           this.fulltextsFiltre = response;
         },
         error:()=>{
           console.log();
         },
                    
     })
   }

}
export const routes: Routes = [
  {path:'AddFulltext', component:FulltextFormComponent},
];
export class AppRoutingModule { }
