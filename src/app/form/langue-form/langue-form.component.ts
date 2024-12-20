import { Component, OnInit } from '@angular/core';
import { LangueService } from '../../services/langue.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Langue } from '../../model/langue';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-langue-form',
  standalone: true,
  imports: [
    FormsModule,    
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './langue-form.component.html',
  styleUrl: './langue-form.component.css'
})
export class LangueFormComponent implements OnInit{
  constructor(
    private langueService: LangueService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  langueForm: FormGroup = new FormGroup({
    libcatdoc: new FormControl(''),
  });
 
  langue: Langue= new Langue();
  langueId!:number;

  ngOnInit(): void {
    this.langueForm = this.formBuilder.group({
      liblangue: ['', Validators.required],
      appelationethnie: [''],
      payslangue: [''],
      regionlangue: [''],
      nombrelocuteur: [''],
    })

    if(this.route.snapshot.params['id']){
      this.langueId=this.route.snapshot.params['id'] as number
      if(this.langueId){
        this.getLangue(this.langueId);
      }
    }
  }

  getLangue(id:number){
    this.langueService.find(id).subscribe({
      next:(response)=>{
        this.langue=response as Langue;
        this.langueForm.patchValue({
          liblangue: this.langue.liblangue,
          appelationethnie: this.langue.appelationethnie,
          payslangue: this.langue.payslangue,
          regionlangue: this.langue.regionlangue,
          nombrelocuteur: this.langue.nombrelocuteur,
        })
      }
    })
  }

  getInfo(){
    this.langue.liblangue = this.langueForm.value.liblangue;
      this.langue.appelationethnie = this.langueForm.value.appelationethnie;
      this.langue.payslangue = this.langueForm.value.payslangue;
      this.langue.regionlangue = this.langueForm.value.regionlangue;
      this.langue.nombrelocuteur = this.langueForm.value.nombrelocuteur;
  }
  create() {
    if (this.langueForm.valid) {   
      this.getInfo();   
      this.langueService.create(this.langue).subscribe({
        next: () => {
          alert("Enregistrement effectué avec succès.")  
          this.router.navigateByUrl("administration/Langue")         
        },
        error: (err) => {
          if(err.status==200 || err.status==201 || err.status==202){
            alert("Enregistrement effectué avec succès.")  
            this.router.navigateByUrl("administration/Langue")  
          }else{
            alert("Echec de l'enrégistrement");
          }
        },
        
      })
      
    }
    this.onReset();
  }

  addLangue(){
    if(this.langueId){
      this.update();
    }else{
      this.create();
    }
  }

  update(){
    if (this.langueForm.valid) {   
      this.getInfo();   
      this.langueService.update(this.langueId,this.langue).subscribe({
        next: () => {
          alert("Mise à jour effectué avec succès.")  
          this.router.navigateByUrl("administration/Langue")       
        },
        error: (err) => {
          if(err.status==200 || err.status==201 || err.status==202){
            alert("Mise à jour effectué avec succès.")  
            this.router.navigateByUrl("administration/Langue")  
          }else{
            alert("Echec de la mise à jour");
          }
        },
        
      })
      
    }
  }


  onReset(): void {
    this.langueForm.reset();
  }
  
}
