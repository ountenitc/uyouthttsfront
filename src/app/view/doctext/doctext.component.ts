import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Doctext } from '../../model/doctext';
import { DoctextService } from '../../services/doctext.service';
import { RouterModule, Routes } from '@angular/router';
import { DoctextFormComponent } from '../../form/doctext-form/doctext-form.component';
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
  templateUrl: './doctext.component.html',
  styleUrl: './doctext.component.css'
})
export class DoctextComponent {

  itemsPerPage:number=10;
  p:number=1;
  searchText:string="";
  doctexts!: Doctext[];
  doctexts1!: Doctext[];
  doctexts2!: Doctext[];
  constructor(private doctextService: DoctextService ) {  
    this.ngOnInit();  
    }

  ngOnInit() {
   this.doctextService.findAll().subscribe({
   next:(response)=>{
        this.doctexts = response;
        this.doctexts1 = response;
        this.doctexts2 = response;
        console.log(response)
      },
      error:()=>{
        console.log();
      },
                 
  })
  }

  filtrer(){    
    if(this.searchText){
     const filterValue = this.searchText
     this.doctexts=this.doctexts1.filter(function(item){
       return (item.titrefrdoc)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.audiotitremrdoc)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.titremrdoc)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.doctexts=this.doctexts2;
    }
   }


   delete(element:Doctext){
    this.doctextService.delete(Number(element.iddoctext)).subscribe({
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
    this.doctextService.findAll().subscribe({
      next:(response)=>{
           this.doctexts = response;
           this.doctexts1 = response;
           this.doctexts2 = response;
           console.log(response)
         },
         error:()=>{
           console.log();
         },
                    
     })
   }
}
export const routes: Routes = [
    {path:'AddDoctext', component:DoctextFormComponent},
  ];
  export class AppRoutingModule { }
  