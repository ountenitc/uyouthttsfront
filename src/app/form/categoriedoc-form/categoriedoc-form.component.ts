import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriedocService } from '../../services/categoriedoc.service';
import { Categoriedoc } from '../../model/categoriedoc';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoriedoc-form',
  standalone: true,
  imports: [
    FormsModule,    
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './categoriedoc-form.component.html',
  styleUrl: './categoriedoc-form.component.css'
})
export class CategoriedocFormComponent implements OnInit{
  
  constructor(
    private categorieService: CategoriedocService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  categoriedocForm: FormGroup = new FormGroup({
    libcatdoc: new FormControl(''),
  });
 
  categoriedoc: Categoriedoc= new Categoriedoc();
  catId!:number;

  ngOnInit(): void {
    this.categoriedocForm = this.formBuilder.group({
      libcatdoc: ['', Validators.required],
    })

    if(this.route.snapshot.params["id"]){
      this.catId=this.route.snapshot.params["id"] as number;
      this.getCat(this.catId);
    }
  }


  getCat(id:number){
    this.categorieService.find(id).subscribe({
      next:(response)=>{
        this.categoriedoc=response as Categoriedoc;
        this.categoriedocForm.patchValue({
          libcatdoc: this.categoriedoc.libcatdoc
        })
      }
    })
  }

  create() {
    if (this.categoriedocForm.valid) {
      this.categoriedoc.libcatdoc = this.categoriedocForm.value.libcatdoc;      
      this.categorieService.create(this.categoriedoc).subscribe({
        next: () => {
          alert("Enregistrement effectué avec succès.") 
          this.router.navigateByUrl('administration/Categoriedoc')         
        },
        error: (err) => {
          if(err.status==200 || err.status==201 || err.status==202){
            alert("Enregistrement effectué avec succès.") 
            this.router.navigateByUrl('administration/Categoriedoc')  
          }else{
            alert("Echec de l'enrégistrement")
          }
        },
        
      })
      
    }
    this.onReset();
  }

  update(){
    if (this.categoriedocForm.valid) {
    this.categoriedoc.libcatdoc = this.categoriedocForm.value.libcatdoc;
    this.categorieService.update(this.catId, this.categoriedoc).subscribe({
      next:()=>{
        alert("Mise à jour réussie")
        this.router.navigateByUrl('administration/Categoriedoc')
      },
      error: (err) => {
        if(err.status==200 || err.status==201 || err.status==202){
          alert("Mise à jour réussie.") 
          this.router.navigateByUrl('administration/Categoriedoc') 
        }else{
          alert("Echec de la mise à jour")
        }
      }
    })
  }
  }

  addCategorie(){
    if(this.catId){
      this.update();
    }else{
      this.create();
    }
  }




  onReset(): void {
    this.categoriedocForm.reset();
  }
  
}
