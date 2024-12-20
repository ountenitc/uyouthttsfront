import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OpinionService } from '../../services/opinion.service';
import { Opinion } from '../../model/opinion';
import { ReponseOpinionService } from '../../services/reponse-opinion.service';
import { ReponseOpinion } from '../../model/reponse-opinion';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [
    NgFor, 
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css'
})
export class QuestionnaireComponent implements OnInit{


  listeOpinion:Opinion[]=[];
  listeOpinonReponse: ReponseOpinion[]=[];
  constructor(public opinionService : OpinionService,private opinionReponseService : ReponseOpinionService){}

  ngOnInit(): void {
    this.opinionService.findAll().subscribe({
      next:(response)=>{
        this.listeOpinion=response as Opinion[];
      }
    })

    /* if(this.listeOpinonReponse!==null){
      console.log("reponse:", this.listeOpinonReponse)
      this.indice=" (cliquer pour réinitialiser le tableau)"
    } */
  }

  getReponseOpinion(id:any){
    this.opinionReponseService.findByOpinion(Number(id)).subscribe({
      next:(response)=>{
        this.listeOpinonReponse=response as ReponseOpinion[];
      }
    })
  }

  reinitialiser(){
    this.listeOpinonReponse= [];
  }

}
