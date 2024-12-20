import { Component, OnInit } from '@angular/core';
import { ExpressionfrService } from '../../services/expressionfr.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Expressionfr } from '../../model/expressionfr';
import { AlphabetfrService } from '../../services/alphabetfr.service';
import { Alphabetfr } from '../../model/alphabetfr';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-expressionfr-form',
  standalone: true,
  imports: [    
    FormsModule,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './expressionfr-form.component.html',
  styleUrl: './expressionfr-form.component.css'
})
export class ExpressionfrFormComponent implements OnInit{

  constructor(
    private expressionfrService: ExpressionfrService,
    private formBuilder: FormBuilder,
    private alphabetfrService: AlphabetfrService,
  ) { }

  epressionfrForm: FormGroup = new FormGroup({
    formeecrite: new FormControl(''),
    formprononce: new FormControl(''),
    idalph: new FormControl(''),
  });
  alphabetfrs: Alphabetfr[]=[];
  alphabetfr!: Alphabetfr;
  expressionfr: Expressionfr= new Expressionfr();

  
  ngOnInit(): void {
    this.epressionfrForm = this.formBuilder.group({
      formeecrite: ['', Validators.required],
      formprononce: [''],
      idalph: [''],
    })
    this.alphabetfrService.findAll().subscribe({
      next:(response)=>{
        this.alphabetfrs = response;
      },
      error:()=>{
        console.log();
      },
              
    });
  }


  addExpressionfr() {
   //  if (this.epressionfrForm.valid) {
      this.expressionfr.formeecrite = this.epressionfrForm.value.formeecrite;
      this.expressionfr.formprononce = this.epressionfrForm.value.formprononce;
      this.expressionfr.idalph = this.epressionfrForm.value.idalph;
      console.log(this.expressionfr.formeecrite) 
      this.expressionfrService.craete(this.expressionfr).subscribe({
        next: () => {
          alert("Enregistrement effectué avec succès.")          
        },
        error: () => {
          console.log();
        },        
      })      
   // }
    this.onReset();
  }
  onReset(): void {
    this.epressionfrForm.reset();
  }
  compareLetre(lette1:Alphabetfr, lette2:Alphabetfr): boolean {
return lette1 && lette2 ? lette1.idalph === lette2.idalph : lette1===lette2;
  }
}
