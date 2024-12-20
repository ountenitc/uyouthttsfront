import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpinionService } from '../../services/opinion.service';
import { LangueService } from '../../services/langue.service';
import { Langue } from '../../model/langue';
import { Opinion } from '../../model/opinion';
import { NgFor, NgIf } from '@angular/common';
import { DoctextService } from '../../services/doctext.service';
import { Doctext } from '../../model/doctext';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-opinion-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './opinion-form.component.html',
  styleUrl: './opinion-form.component.css'
})
export class OpinionFormComponent implements OnInit{

  optextfr!:string;
  optextemr!:string;
  textfr!: String;
  textmr!: String;
  langues: Langue[]=[];
  langue!: Langue;
  audio:boolean=false;
  texteAudio!:String;
  opinion:Opinion={};
  doctext:Doctext[]=[];
  iddoctext:any;
 // updateOpinion:Opinion={}
  opinionId!:number;

  formOpinion!:FormGroup;
  constructor(private fb : FormBuilder,
    public opnionService : OpinionService,
    private langueService: LangueService,
    private docService : DoctextService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.formOpinion=this.fb.group({
      optextefr: ['', Validators.required],
      optextemr: ['', Validators.required],
     // opaudiomr: ['', Validators.required],
      iddoctext: ['', Validators.required],
    })

    this.langueService.findAll().subscribe({
      next:(response)=>{
        this.langues = response;
      },
      error:()=>{
        console.log();
      },
              
    });

    this.docService.findAll().subscribe({
      next:(response)=>{
        this.doctext=response;
      }
    })

    if(this.route.snapshot.params['id']){
      this.opinionId=this.route.snapshot.params['id'] as number
      if(this.opinionId){
        this.getOpinion(this.opinionId);
      }
    }

  }

  getOpinion(id:number){
    this.opnionService.getOpinion(id).subscribe({
      next:(response)=>{
        this.opinion=response as Opinion
        this.formOpinion.patchValue({
          optextefr: this.opinion.optextefr,
          optextemr: this.opinion.optextemr,
          //opaudiomr: this.opinion.opaudiomr,
          iddoctext: this.opinion.iddoctext,
        })
      }
    })
  }

  getInfo(){
    this.opinion.optextefr = this.formOpinion.value.optextefr;    
    this.opinion.optextemr = this.formOpinion.value.optextemr; 
    this.opinion.iddoctext= this.formOpinion.value.iddoctext;
    if(this.texteAudio){
      this.opinion.opaudiomr= this.texteAudio;
    }
    
  }

  create() {
    if (this.formOpinion.valid) {
      this.getInfo();  
      console.log("Enregistrement") 
      this.opnionService.save(this.opinion).subscribe({
        next: () => {
          alert("Enregistrement effectué avec succès.") 
          this.router.navigateByUrl('administration/opinion')         
        },
        error: (err) => {
          if(err.status==200 ||err.status==201 || err.status==202){
            alert("Enregistrement effectué avec succès.")
            this.audio=false;
            this.router.navigateByUrl('administration/opinion') 
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
    this.opnionService.update(this.opinionId, this.opinion).subscribe({
      next:(response)=>{
          if(response!=null && response.iddoctext){
            this.router.navigateByUrl('administration/opinion')
          }
      },
      error:()=>{
        alert("Echec de la modification")
      }
    })
  }

  addOpinion(){
    console.log("initaliser")
    if(!this.opinionId){
      console.log("create")
      this.create();
    }else{
      console.log("update")
      this.update();
    }
  }

  traduire(){
    this.textfr = this.formOpinion.value.optextefr.toLowerCase();  
    this.opnionService.traduire(this.textfr).subscribe({
      next: (response) => {
            this.textmr = response.textLangue as String; 
            this.formOpinion.controls["optextemr"].setValue(response.textLangue as String)
            console.log("response :",this.textmr); 
      },
      error: (err) => {
        if(err.status==200 ||err.status==201 || err.status==202){
          this.formOpinion.controls["optextemr"].setValue(err.error.text);
        }else{
          alert("erreur");
        }
      },      
    })    
  }

  lireAudio(){    
    this.optextfr = this.formOpinion.value.optextemr; 
    if(this.optextfr){       
        this.opnionService.lireTexte(this.optextfr).subscribe({
          next:(response)=>{
            console.log("texte :",response)
            this.texteAudio=response.nomaudio as String
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
    this.formOpinion.reset();
    this.audio=false;
  }
  compareDoc(et1: Doctext, et2: Doctext): boolean {
    return et1 && et2 ? et1.iddoctext === et2.iddoctext : et1 === et2;
  }

}
