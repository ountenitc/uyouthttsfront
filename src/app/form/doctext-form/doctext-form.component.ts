import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctextService } from '../../services/doctext.service';
import { Doctext } from '../../model/doctext';
import { CategoriedocService } from '../../services/categoriedoc.service';
import { Categoriedoc } from '../../model/categoriedoc';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctext-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './doctext-form.component.html',
  styleUrl: './doctext-form.component.css'
})
export class DoctextFormComponent implements OnInit {
  constructor(
    public doctextService: DoctextService,
    private formBuilder: FormBuilder,
    private categoriedocService: CategoriedocService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  doctextForm: FormGroup = new FormGroup({
    idcatdoc: new FormControl(''),
    titredoc: new FormControl(''),
    datedoc: new FormControl(''),
    opaudiomrtitredoc: new FormControl('')
  });

  doctext: Doctext = new Doctext();
  categoriedoc: Categoriedoc = new Categoriedoc();
  categoriedocs: Categoriedoc[] = [];
  docId!:number;
  titremrdoc!:String;
  titrefrdoc!:String;
  docmr!:String;
  texteAudio!:String;
  audio!:Boolean;

  ngOnInit(): void {
    this.doctextForm = this.formBuilder.group({
      datedoc: [Date],
      titrefrdoc: ['', Validators.required],
      titremrdoc: ['', Validators.required],   
      idcatdoc: ['']
    })
    this.categoriedocService.findAll().subscribe({
      next: (response) => {
        this.categoriedocs = response;
      },
      error: () => {
        console.log();
      },
    })

    if(this.route.snapshot.params["id"]){
      this.docId=this.route.snapshot.params["id"] as number;
      this.getDoc(this.docId);
    }
  }

  getInfo(){
    this.doctext.datedoc = this.doctextForm.value.datedoc;
    this.doctext.titrefrdoc = this.doctextForm.value.titrefrdoc;
    this.doctext.titremrdoc = this.doctextForm.value.titremrdoc;
    //this.doctext.audiotitremrdoc = this.doctextForm.value.audiotitremrdoc;
    this.doctext.idcatdoc = this.doctextForm.value.idcatdoc;
    if(this.texteAudio){
      this.doctext.audiotitremrdoc =this.texteAudio
    }
  }

  getDoc(id:number){
    this.doctextService.find(id).subscribe({
      next:(response)=>{
        this.doctext=response as Doctext;
        this.doctextForm.patchValue({
          datedoc: this.doctext.datedoc,
          titrefrdoc: this.doctext.titrefrdoc,
          titremrdoc: this.doctext.titremrdoc,     
        //  audiotitremrdoc: this.doctext.audiotitremrdoc,
          idcatdoc: this.doctext.idcatdoc
        })
      }
    })
  }

  create() {
    if (this.doctextForm.valid) {
      this.getInfo();
      this.doctextService.create(this.doctext).subscribe({
        next:()=>{
          alert("Enrégistrement réussi")
          this.router.navigateByUrl('administration/Doctext')
        },
        error:(err)=>{
          if(err.status==200 || err.status==201 || err.status==202){
            alert("Enrégistrement réussi");
            this.router.navigateByUrl('administration/Doctext')
          }else{
            alert("Echec de l'énregistrement")
          }          
        }
       })
    }
    this.onReset();
  }

  update(){
    this.doctextService.update(this.docId, this.doctext).subscribe({
      next:()=>{
        alert("Modification réussie")
        this.router.navigateByUrl('administration/Doctext')
      },
      error:(err)=>{
        if(err.status==200 || err.status==201 || err.status==202){
          alert("Modification réussie")
          this.router.navigateByUrl('administration/Doctext')
        }else{
          alert("Echec de la modification")
        }
      }
    })

  }
  addDoctext(){
    if(this.docId){
      this.update();
    }else{
      this.create();
    }

  }


  traduire(){
    this.titrefrdoc = this.doctextForm.value.titrefrdoc.toLowerCase();  
    this.doctextService.traduire(this.titrefrdoc).subscribe({
      next: (response) => {
            this.titremrdoc = response.textLangue as String; 
            this.doctextForm.controls["titremrdoc"].setValue(response.textLangue as String)
            console.log("response :",this.titremrdoc); 
      },
      error: (err) => {
        if(err.status==200 ||err.status==201 || err.status==202){
          this.doctextForm.controls["titremrdoc"].setValue(err.error.text);
        }else{
          alert("erreur");
        }
      },      
    })   
  }

  lireAudio(){    
    this.docmr = this.doctextForm.value.titremrdoc; 
    if(this.docmr){       
        this.doctextService.lireTexte(this.docmr).subscribe({
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
    this.doctextForm.reset();
  }

  compareDoc(et1: Categoriedoc, et2: Categoriedoc): boolean {
    return et1 && et2 ? et1.idcatdoc === et2.idcatdoc : et1 === et2;
  }
}
