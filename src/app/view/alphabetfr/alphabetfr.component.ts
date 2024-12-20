import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Alphabetfr } from '../../model/alphabetfr';
import { AlphabetfrService } from '../../services/alphabetfr.service';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { AlphabetfrFormComponent } from '../../form/alphabetfr-form/alphabetfr-form.component';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-alphabetfr',
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
  templateUrl: './alphabetfr.component.html',
  styleUrl: './alphabetfr.component.css'
})
export class AlphabetfrComponent implements OnInit{
  
  itemsPerPage:number=10;
  p:number=1;
  searchText:string="";
  alphabetfrs!: Alphabetfr[];
  alphabetfrs1!: Alphabetfr[];
  alphabetfrs2!: Alphabetfr[];
  dataSource = new MatTableDataSource<Alphabetfr, MatPaginator>(this.alphabetfrs);
  displayedColumns:String[] = ['id','lettre','phonetique',]
  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator;
  constructor(private alphabetService: AlphabetfrService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator,
    this.alphabetService.findAll().subscribe({
      next:(response)=>{ 
        this.alphabetfrs = response;
        this.alphabetfrs1 = response;
        this.alphabetfrs2 = response;
      },
      error:()=>{
        console.log();
      },
              
    });
  }

  filtrer(){    
    if(this.searchText){
     const filterValue = this.searchText
     this.alphabetfrs=this.alphabetfrs1.filter(function(item){
       return (item.lettre)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.phonetalph)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.alphabetfrs=this.alphabetfrs2;
    }
   }

   delete(element:Alphabetfr){
    this.alphabetService.delete(Number(element.idalph)).subscribe({
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
    this.alphabetService.findAll().subscribe({
      next:(response)=>{ 
        this.alphabetfrs = response;
        this.alphabetfrs1 = response;
        this.alphabetfrs2 = response;
      },
      error:()=>{
        console.log();
      },
              
    });
   }
}

export const routes: Routes = [
  {path:'AddAlphabet', component:AlphabetfrFormComponent},
];
export class AppRoutingModule { }
