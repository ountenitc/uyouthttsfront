import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReponseOpinionService } from '../../services/reponse-opinion.service';
import { LangueService } from '../../services/langue.service';
import { OpinionService } from '../../services/opinion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReponseOpinion } from '../../model/reponse-opinion';
import { Langue } from '../../model/langue';
import { Opinion } from '../../model/opinion';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-reponse-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './reponse-form.component.html',
  styleUrl: './reponse-form.component.css'
})
export class ReponseFormComponent {

  opReponsetextfr!:string;
  opReponsetextemr!:string;
  reponseopfr!: String;
  reponseopmr!: String;
  langues: Langue[]=[];
  langue!: Langue;
  audio:boolean=false;
  texteAudio!:String;
  opinionReponse:ReponseOpinion={};
  opinionsReponse:ReponseOpinion[]=[];
  opinions:Opinion[]=[];
  idopinionfrmr:any;
 // updateOpinion:Opinion={}
  opinionReponseId!:number;

  formOpinionReponse!:FormGroup;
  constructor(private fb : FormBuilder,
    public opnionReponseService : ReponseOpinionService,
    private langueService: LangueService,
    private opinionService : OpinionService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.formOpinionReponse=this.fb.group({
        reponseopfr: ['', Validators.required],
        reponseopmr: ['', Validators.required],
        audioreponsemr: [''],
        idopinionfrmr: ['', Validators.required],
    })

    this.langueService.findAll().subscribe({
      next:(response)=>{
        this.langues = response;
      },
      error:()=>{
        console.log();
      },
              
    });

    this.opinionService.findAll().subscribe({
      next:(response)=>{
        this.opinions=response;
      }
    })

    if(this.route.snapshot.params['id']){
      this.opinionReponseId=this.route.snapshot.params['id'] as number
      if(this.opinionReponseId){
        this.getOpinion(this.opinionReponseId);
      }
    }

  }

  getOpinion(id:number){
    this.opnionReponseService.getOpinion(id).subscribe({
      next:(response)=>{
        this.opinionReponse=response as ReponseOpinion
        this.formOpinionReponse.patchValue({
          reponseopfr: this.opinionReponse.reponseopfr,
          reponseopmr: this.opinionReponse.reponseopmr,
          audioreponsemr: this.opinionReponse.audioreponsemr,
          idopinionfrmr: this.opinionReponse.idopinionfrmr,
        })
      }
    })
  }

  getInfo(){
    this.opinionReponse.reponseopfr = this.formOpinionReponse.value.reponseopfr;    
    this.opinionReponse.reponseopmr = this.formOpinionReponse.value.reponseopmr; 
    this.opinionReponse.idopinionfrmr= this.formOpinionReponse.value.idopinionfrmr;
    if(this.texteAudio){
      this.opinionReponse.audioreponsemr= this.texteAudio;
    }
    
  }

  create() {
    console.log(this.formOpinionReponse)
    if (this.formOpinionReponse.valid) {
      this.getInfo();  
      console.log("Enregistrement") 
      this.opnionReponseService.save(this.opinionReponse).subscribe({
        next: () => {
          alert("Enregistrement effectué avec succès.") 
          this.router.navigateByUrl('administration/ReponseOpinion')         
        },
        error: (err) => {
          if(err.status==200 ||err.status==201 || err.status==202){
            alert("Enregistrement effectué avec succès.")
            this.audio=false;
            this.router.navigateByUrl('administration/ReponseOpinion') 
           }else{
            alert("Echec de l'enrégistrement");
          }
        },        
      })      
    }else{
      alert("problème")
    }
    //this.onReset();
    //this.audio=false;
  }

  update(){
    this.getInfo();
    this.opnionReponseService.update(this.opinionReponseId, this.opinionReponse).subscribe({
      next:(response)=>{
          if(response!=null && response.idopinionfrmr){
            this.router.navigateByUrl('administration/ReponseOpinion')
          }
      },
      error:()=>{
        alert("Echec de la modification")
      }
    })
  }

  addOpinion(){
    console.log("initaliser")
    if(!this.opinionReponseId){
      console.log("create")
      this.create();
    }else{
      console.log("update")
      this.update();
    }
  }

  traduire(){
    this.reponseopfr = this.formOpinionReponse.value.reponseopfr.toLowerCase();  
    this.opnionReponseService.traduire(this.reponseopfr).subscribe({
      next: (response) => {
            this.reponseopmr = response.textLangue as String; 
            this.formOpinionReponse.controls["reponseopmr"].setValue(response.textLangue as String)
            console.log("response :",this.reponseopmr); 
      },
      error: (err) => {
        if(err.status==200 ||err.status==201 || err.status==202){
          this.formOpinionReponse.controls["reponseopmr"].setValue(err.error.text);
        }else{
          alert("erreur");
        }
      },      
    })    
  }

  lireAudio(){    
    this.opReponsetextfr = this.formOpinionReponse.value.reponseopmr; 
    if(this.opReponsetextfr){       
        this.opnionReponseService.lireTexte(this.opReponsetextfr).subscribe({
          next:(response)=>{
            console.log("texte :",response)
            this.texteAudio=response.nomaudio as String;
            //this.formOpinion.controls["staudiomr"].setValue(response)
            this.audio=true;  
          },
          error:(err)=>{
            if(err.status==200 ||err.status==201 || err.status==202){
              this.texteAudio=err.error.text
              console.log("texte :",err.error.text)
            //  this.formOpinion.controls["staudiomr"].setValue(err.error.text);
              this.audio=true;  
            }else{
              alert("erreur");
            }
          }
        })
      }
  }

  onReset(): void {
    this.formOpinionReponse.reset();
    this.audio=false;
  }
  compareDoc(et1: ReponseOpinion, et2: ReponseOpinion): boolean {
    return et1 && et2 ? et1.idropfrmr === et2.idropfrmr : et1 === et2;
  }

}
