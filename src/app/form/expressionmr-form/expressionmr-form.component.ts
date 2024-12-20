import { Component, OnInit } from '@angular/core';
import { ExpressionfrService } from '../../services/expressionfr.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpressionmrService } from '../../services/expressionmr.service';
import { Expressionfr } from '../../model/expressionfr';
import { Expressionmr } from '../../model/expressionmr';
import { NgFor } from '@angular/common';
import { Langue } from '../../model/langue';
import { LangueService } from '../../services/langue.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expressionmr-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './expressionmr-form.component.html',
  styleUrl: './expressionmr-form.component.css'
})
export class ExpressionmrFormComponent implements OnInit{
  constructor(
    private expressionfrService: ExpressionfrService,
    private formBuilder: FormBuilder,
    private expressionmrService: ExpressionmrService,
    private langueService: LangueService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  expressionmrForm: FormGroup = new FormGroup({
    formecritmr: new FormControl(''),
    formprononcemr: new FormControl(''),
    idlangue: new FormControl(''),
    idmefr: new FormControl(''),
    expressionfr: new FormControl(''),
    formprononcefr: new FormControl(''),
  });
  expressionfrs: Expressionfr[]=[];
  //expressionfr!: Expressionfr;
  langue!:Langue;
  langues: Langue[]=[];
  expressionmr: Expressionmr= new Expressionmr();
  expressionfr: Expressionfr=new Expressionfr();
  expressionId!:number;
  
  ngOnInit(): void {
    this.expressionmrForm = this.formBuilder.group({
      formecritmr: ['', Validators.required],
      formprononcemr: [''],
      idlangue: [''],
      idmefr: [''],
      expressionfr:[''],
      formprononcefr:['']
    })
    this.expressionfrService.findAll().subscribe({
      next:(response)=>{
        this.expressionfrs = response;
      },
      error:()=>{
        console.log();
      },
              
    });
    this.langueService.findAll().subscribe({
      next:(response)=>{
        this.langues = response;
      },
      error:()=>{
        console.log();
      },
              
    });

    if(this.route.snapshot.params['id']){
      this.expressionId=this.route.snapshot.params['id'] as number;
      if(this.expressionId){
        this.getExperssion(this.expressionId)
      }
    }
  }

  getExperssion(id:number){
    this.expressionmrService.find(id).subscribe({
      next:(response)=>{
        this.expressionmr=response;
        this.expressionfr=response.idmefr as Expressionfr
        this.expressionmrForm.patchValue({
          formecritmr: this.expressionmr.formecritmr,
          formprononcemr:this.expressionmr.formprononcemr,
          idlangue: this.expressionmr.idlangue,
          expressionfr:this.expressionfr.formeecrite,
          formprononcefr:this.expressionfr.formprononce
        })
      }
    })
  }

  getInfo(){
    this.expressionmr.formecritmr = this.expressionmrForm.value.formecritmr;
      this.expressionmr.formprononcemr = this.expressionmrForm.value.formprononcemr;
      this.expressionmr.idlangue = this.expressionmrForm.value.idlangue;
      this.expressionfr.formeecrite=this.expressionmrForm.value.expressionfr
      this.expressionfr.formprononce=this.expressionmrForm.value.formprononcefr
  }

  create() {
     if (this.expressionmrForm.valid) {
      this.getInfo();      
      this.expressionfrService.craete(this.expressionfr).subscribe({
        next: (response)=>{
          this.expressionmr.idmefr =response
          this.expressionmrService.craete(this.expressionmr).subscribe({
            next: (response) => {
              this.expressionmr = response;
              console.log(response);
              alert("Enregistrement effectué avec succès.") 
              this.router.navigateByUrl('administration/Expressionmr')         
            },
            error: (err) => {
              alert("Echec de l'enrégistrement de mr")
            },        
          })
        },
        error:(err)=>{
           alert("Echec de l'enrégistrement de fr")
         /* if(err.status===200 || err.status===201 || err.status===202){
            console.log("erreur ....")
            this.expressionmrService.craete(this.expressionmr).subscribe({
              next: (response) => {
                this.expressionmr = response;
                console.log(response);
                alert("Enregistrement effectué avec succès.")          
              },
              error: (err) => {                
                console.log("erreur mr ",err);
              },        
            })     
          }else{
            console.log("erreur mf ",err)
          } */
          
        }
      })
            
    }
    this.onReset();
  }

  addExpressionmr(){
    if(this.expressionId){
      this.update();
    }else{
      this.create();
    }
  }


  update(){
    this.getInfo();
    this.expressionfrService.update(Number(this.expressionfr.idmefr), this.expressionfr).subscribe({
      next:(response) =>{
        this.expressionmr.idmefr=response;
        this.expressionmrService.update(this.expressionId,this.expressionmr).subscribe({
          next:() =>{
            alert("Succès de la mise à jour");
            this.router.navigateByUrl('administration/Expressionmr') 
          },
          error:(err) =>{
            if(err.status==200 || err.status==201 || err.status==202){
              alert("Succès de la mise à jour");
              this.router.navigateByUrl('administration/Expressionmr') 
            }else{
              alert("Echec de la mise à jour");
            }
          }
        })
      }
    })
  }

  onReset(): void {
    this.expressionmrForm.reset();
  }

  comparefr(et1: Expressionfr, et2: Expressionfr): boolean {
    return et1 && et2 ? et1.idmefr === et2.idmefr : et1 === et2;
  }

  compareLang(et1: Langue, et2: Langue): boolean {
    return et1 && et2 ? et1.idlangue === et2.idlangue : et1 === et2;
  }
}
