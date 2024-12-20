import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { LangueService } from '../../services/langue.service';
import { Langue } from '../../model/langue';
import { RouterModule, Routes } from '@angular/router';
import { LangueFormComponent } from '../../form/langue-form/langue-form.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-langue',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,  
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './langue.component.html',
  styleUrl: './langue.component.css'
})
export class LangueComponent {

  itemsPerPage:number=10;
  p:number=1;
  searchText:string="";
  langues!: Langue[];
  langues1!: Langue[];
  langues2!: Langue[];
  constructor(private langueService: LangueService) {
    this.ngOnInit();
  }
  ngOnInit() {
    this.langueService.findAll().subscribe({
      next: (response) => {
        this.langues = response;
        this.langues1 = response;
        this.langues2 = response;
      },
      error: () => {
        console.log();
      },

    })
  }

  filtrer(){    
    if(this.searchText){
     const filterValue = this.searchText
     this.langues=this.langues1.filter(function(item){
       return (item.payslangue)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.appelationethnie)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.regionlangue)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.liblangue)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.langues=this.langues2;
    }
   }

   delete(element:Langue){
    this.langueService.delete(Number(element.idlangue)).subscribe({
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
    this.langueService.findAll().subscribe({
      next: (response) => {
        this.langues = response;
        this.langues1 = response;
        this.langues2 = response;
      },
      error: () => {
        console.log();
      },

    })
   }
}

