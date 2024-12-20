import { Component, OnInit } from '@angular/core';
import { FulltextService } from '../../services/fulltext.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fulltext } from '../../model/fulltext';
import { NgFor, NgIf } from '@angular/common';
import { LangueService } from '../../services/langue.service';
import { Langue } from '../../model/langue';
import { DoctextService } from '../../services/doctext.service';
import { Doctext } from '../../model/doctext';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-fulltext-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './fulltext-form.component.html',
  styleUrl: './fulltext-form.component.css'
})
export class FulltextFormComponent implements OnInit{

  sttextemr!:string;
  constructor(
    public fulltextService: FulltextService,
    private formBuilder: FormBuilder,
    private langueService: LangueService,
    private docService : DoctextService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  fulltextForm: FormGroup = new FormGroup({
    sttextefr: new FormControl(''),
    //staudiomr: new FormControl(''),
    sttextemr: new FormControl(''),
    iddoctext: new FormControl(''),
  });
 
  fulltext: Fulltext= new Fulltext();
  textfr!: String;
  textmr!: String;
  langues: Langue[]=[];
  langue!: Langue;
  audio:boolean=false;
  texteAudio!:String;
  doctext:Doctext[]=[];
  iddoctext : any;
  fullId!:number;

  ngOnInit(): void {
    this.fulltextForm = this.formBuilder.group({
      sttextefr: ['', Validators.required],
     // staudiomr: ['', Validators.required],
      sttextemr: ['', Validators.required],
      iddoctext:['', Validators.required]
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
      this.fullId=this.route.snapshot.params['id'] as number
      if(this.fullId){
        this.getFull(this.fullId)
      }
    }
  }


  getInfo(){
    this.fulltext.sttextefr = this.fulltextForm.value.sttextefr;    
      this.fulltext.sttextemr = this.fulltextForm.value.sttextemr; 
      this.fulltext.iddoctext=this.fulltextForm.value.iddoctext;  
      this.fulltext.staudiomr=this.texteAudio;
  }

  getFull(id:number){
    this.fulltextService.find(id).subscribe({
      next:(response)=>{
        this.fulltext=response as Fulltext
        this.fulltextForm.patchValue({
          sttextefr: this.fulltext.sttextefr,
          sttextemr: this.fulltext.sttextemr,
          iddoctext: this.fulltext.iddoctext
        })
      }
    })
  }


  create() {
    if (this.fulltextForm.valid) {
         this.getInfo();
      this.fulltextService.create(this.fulltext).subscribe({
        next: () => {
          alert("Enregistrement effectué avec succès.") 
          this.audio=false; 
          this.router.navigateByUrl('administration/Fulltext')       
        },
        error: (err) => {
          if(err.status==200 ||err.status==201 || err.status==202){
            alert("Enregistrement effectué avec succès.")
            this.audio=false;
            this.router.navigateByUrl('administration/Fulltext')
           }else{
            alert("Echec de l'enrégistrement");
          }
        },        
      })      
    }

    //this.onReset();
    
  }

  update(){
    if (this.fulltextForm.valid){
      this.getInfo();
      this.fulltextService.update(this.fullId,this.fulltext).subscribe({
        next:(response)=>{
          if(response!=null && response.idstoriefrmr){
            this.router.navigateByUrl('administration/Fulltext')
          }
        },
        error:(err)=>{
          if(err.status==200 ||err.status==201 || err.status==202){
            alert("Mise à jour effectuée avec succès.")
            this.audio=false;
            this.router.navigateByUrl('administration/Fulltext')
           }else{
            alert("Echec de la modification.");
          }
          
        }
      })
    }
  }

  addFulltext(){
    if(!this.fullId){
      this.create();
    }else{
      this.update();
    }
  }


  traduire(){
    this.textfr = this.fulltextForm.value.sttextefr.toLowerCase();  
    console.log(this.textfr)      
    this.texteAudio="";
    this.fulltextService.traduire(this.textfr).subscribe({
      next: (response) => {
            this.textmr = response.textLangue as String; 
            this.fulltextForm.controls["sttextemr"].setValue(response.textLangue as String)
            console.log("response :",response); 
            if(response.lienaudio){
              this.texteAudio=response.lienaudio;
              this.audio=true;
            }
      },
      error: (err) => {
        if(err.status==200 ||err.status==201 || err.status==202){
          //this.sttextemr=err.error.text
          this.fulltextForm.controls["sttextemr"].setValue(err.error.text);
        }else{
          alert("erreur");
        }
      },      
    })    
  }

  lireAudio(){    
    this.sttextemr = this.fulltextForm.value.sttextemr; 
    if(this.sttextemr){
        this.fulltextService.lireTexte(this.sttextemr).subscribe({
          next:(response)=>{
            this.audio=true;
            console.log("texte :",response)
            this.texteAudio=response.nomaudio as String
            //this.fulltextForm.controls["staudiomr"].setValue(response)
          },
          error:(err)=>{
            if(err.status==200 ||err.status==201 || err.status==202){
              this.audio=true;
              this.texteAudio=err.error.text
              console.log("texte :",err.error.text)
              //this.fulltextForm.controls["staudiomr"].setValue(err.error.text);
            }else{
              alert("erreur");
            }
          }
        })
      }
  }

  onReset(): void {
    this.fulltextForm.reset();
    this.audio=false;
  }

  compareDoc(et1: Doctext, et2: Doctext): boolean {
    return et1 && et2 ? et1.iddoctext === et2.iddoctext : et1 === et2;
  }
  
}
