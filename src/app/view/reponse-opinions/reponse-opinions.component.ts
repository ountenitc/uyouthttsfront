import { Component } from '@angular/core';
import { ReponseOpinionService } from '../../services/reponse-opinion.service';
import { ReponseOpinion } from '../../model/reponse-opinion';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Opinion } from '../../model/opinion';
import { OpinionService } from '../../services/opinion.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-reponse-opinions',
  standalone: true,
  imports: [
    FormsModule,
    NgFor, 
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  templateUrl: './reponse-opinions.component.html',
  styleUrl: './reponse-opinions.component.css'
})
export class ReponseOpinionsComponent {

  itemsPerPage:number=10;
  p:number=1;
  searchText:string="";
  opinionResponse!: ReponseOpinion[];
  opinionResponse1!: ReponseOpinion[];
  opinionResponse2!: ReponseOpinion[];
  opinions!:Opinion[];
  constructor(public opinionResponseService: ReponseOpinionService, private opinionService: OpinionService ) {  
    this.ngOnInit();  
    }

  ngOnInit() {
   this.opinionResponseService.findAll().subscribe({
   next:(response)=>{console.log(response)
        this.opinionResponse = response;
        this.opinionResponse1 = response;
        this.opinionResponse2 = response;
      },
      error:()=>{
        console.log("ok");
      },
                 
  })

  this.opinionService.findAll().subscribe({
    next:(response)=>{
      this.opinions=response as Opinion[];
      console.log("opinion", response)
    }
  })
  }

  filtrer(){    
    if(this.searchText){
     const filterValue = this.searchText
     this.opinionResponse=this.opinionResponse1.filter(function(item){
       return (item.reponseopfr)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.reponseopmr)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.opinionResponse=this.opinionResponse2;
    }
   }

   delete(element:ReponseOpinion){
    this.opinionResponseService.delete(Number(element.idropfrmr)).subscribe({
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

   selectOpinion(opinion:Opinion){

   }

   actualiser(){
    this.opinionResponseService.findAll().subscribe({
      next:(response)=>{
           this.opinionResponse = response;
           this.opinionResponse1 = response;
           this.opinionResponse2 = response;
         },
         error:()=>{
           console.log();
         },
                    
     })
   }

}
