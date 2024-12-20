import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlphabetfrService } from '../../services/alphabetfr.service';
import { Alphabetfr } from '../../model/alphabetfr';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alphabetfr-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './alphabetfr-form.component.html',
  styleUrl: './alphabetfr-form.component.css'
})
export class AlphabetfrFormComponent implements OnInit {

  constructor(
    private alphabetService: AlphabetfrService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  alphabetForm: FormGroup = new FormGroup({
    lettre: new FormControl(''),
    phonetalph: new FormControl(''),
  });
 
  alphabet: Alphabetfr={};
  alphaId!:number;

  ngOnInit(): void {
    this.alphabetForm = this.formBuilder.group({
      lettre: ['', Validators.required],
      phonetalph: [''],
    })

    if(this.route.snapshot.params["id"]){
      this.alphaId=this.route.snapshot.params["id"] as number;
      this.getAlpha(this.alphaId);
    }
  }

  getAlpha(id:number){
    this.alphabetService.find(this.alphaId).subscribe({
      next:(response)=>{
        this.alphabet=response;
        this.alphabetForm.patchValue({
          lettre: this.alphabet.lettre,
          phonetalph: this.alphabet.phonetalph,
        })
      }
    })
  }
  create() {
    if (this.alphabetForm.valid) {
      console.log("form : ",this.alphabetForm.value.lettre);
      this.alphabet.lettre = this.alphabetForm.value.lettre.toLowerCase();
      this.alphabet.phonetalph = this.alphabetForm.value.phonetalph.toLowerCase();
      
      this.alphabetService.craete(this.alphabet).subscribe({
        next: () => {
          alert("Enregistrement effectué avec succès.")
          this.router.navigateByUrl("administration/Alphabet")            
        },
        error: (err) => {
          if(err.status==200 || err.status==201 || err.status==202){
            alert("Mise à jour réussie.") 
            this.router.navigateByUrl("administration/Alphabet")  
          }else{
            alert("Echec de la mise à jour")
          }
        },
        
      })
      
    }
    this.onReset();
  }

  update(){
    if (this.alphabetForm.valid){
      this.alphabet.lettre = this.alphabetForm.value.lettre.toC;
      this.alphabet.phonetalph = this.alphabetForm.value.phonetalph;
      this.alphabetService.update(this.alphaId,this.alphabet).subscribe({
        next:()=>{
          alert("Enrégistrement réussi");
          this.router.navigateByUrl("administration/Alphabet")  
        },
        error:(err)=>{
          if(err.status==200 || err.status==201 || err.status==202){
            alert("Mise à jour réussie.") 
            this.router.navigateByUrl("administration/Alphabet")    
          }else{
            alert("Echec de la mise à jour")
          }
        }
      })
    }
  }

  addAlphabet(){
    if(this.alphaId){
      this.update();
    }else{
      this.create();
    }
  }


  onReset(): void {
    this.alphabetForm.reset();
  }
  
}
