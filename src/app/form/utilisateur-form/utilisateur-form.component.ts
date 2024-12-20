import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../../model/utilisateur';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-utilisateur-form',
  standalone: true,
  imports: [
    FormsModule,    
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './utilisateur-form.component.html',
  styleUrl: './utilisateur-form.component.css'
})
export class UtilisateurFormComponent implements OnInit{
  constructor(
    private userService: UtilisateurService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  userForm!: FormGroup 
 
  user:Utilisateur={};
  userId!:number;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })

    if(this.route.snapshot.params['id']){
      this.userId=this.route.snapshot.params['id'] as number
      if(this.userId){
        this.getUser(this.userId);
      }
    }
  }

  getUser(id:number){
    this.userService.find(id).subscribe({
      next:(response)=>{
        this.user=response as Utilisateur;
        this.userForm.patchValue({
          username: this.user.username,
          password: this.user.password,
          role: this.user.role
        })
      }
    })
  }

  getInfo(){
    this.user.username = this.userForm.value.username;
    this.user.password = this.userForm.value.password;
    this.user.role = this.userForm.value.role;
    console.log("user :", this.user) 
  }
  create() {
    if (this.userForm.valid) {        
      this.getInfo();   
      this.userService.createUser(this.user).subscribe({
        next: () => {
          alert("Enregistrement effectué avec succès.")  
          this.router.navigateByUrl("administration/Utilisateur")         
        },
        error: (err) => {
          if(err.status==200 || err.status==201 || err.status==202){
            alert("Enregistrement effectué avec succès.")  
            this.router.navigateByUrl("administration/Utilisateur")  
          }else{
            alert("Echec de l'enrégistrement");
          }
        },
        
      })
      
    }else{
      alert("Formulaire invalide")
    }
  }

  addUser(){
    if(this.userId){
      this.update();
    }else{
      this.create();
    }
  }

  update(){
    if (this.userForm.valid) {   
      this.getInfo();   
      this.userService.update(this.userId,this.user).subscribe({
        next: () => {
          alert("Mise à jour effectué avec succès.")  
          this.router.navigateByUrl("administration/Utilisateur")       
        },
        error: (err) => {
          if(err.status==200 || err.status==201 || err.status==202){
            alert("Mise à jour effectué avec succès.")  
            this.router.navigateByUrl("administration/Utilisateur")  
          }else{
            alert("Echec de la mise à jour");
          }
        },
        
      })
      
    }
  }


  onReset(): void {
    this.userForm.reset();
  }

}
