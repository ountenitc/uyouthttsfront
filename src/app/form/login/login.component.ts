import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Connexion } from '../../model/connexion';
import { Utilisateur } from '../../model/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,    
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  constructor(private formbuilder: FormBuilder,
    private apiUser : UtilisateurService,
    private route : Router,){}

  formLogin !: FormGroup;
  hide = true;
  users : Utilisateur={};
  erreur : string='';
  connexion:Connexion={};

  ngOnInit():void{

    this.formLogin=this.formbuilder.group({
     // emailUtilisateur: new FormControl('', [Validators.email, Validators.required ]),
     username: new FormControl('', [Validators.required ]),
      password: new FormControl('', [Validators.required, Validators.min(12) ])
    })

  }

  getUtilisateurLogin(){
    let username=this.formLogin.value.username;
    let password=this.formLogin.value.password;
     if(username == "admin" && password=="rigo"){
      this.route.navigateByUrl('administration')
     }else{
        this.erreur="Login ou mot de passe incorrect"
     }
   


    // this.connexion.username=this.formLogin.value.username;
    // this.connexion.password=this.formLogin.value.password;
    
    // console.log(this.connexion)
  /*   this.apiUser.userLogin(this.connexion).subscribe({
      next : (response)=>{
        console.log("response",response)      
          if(response.user!=null ){
            this.route.navigateByUrl('administration')
          }     
          else {
            this.erreur="Votre mot de passe ou l'adresse mail est incorrect"
          }                   
      },
      error : (err)=>{
          this.erreur="Votre email ou mot de passe est incorrect"
          
      }
    }) */
  }

  log(){
    this.route.navigateByUrl('nav-bar')
  }

  reinitialiser(){
    this.route.navigateByUrl('modification')
  }

 /*  motdepasseOublier(){
    this.dialog.open(MotDePasseOublierComponent,{
      minWidth:'30%',
      maxWidth:'100%'
    })
  } */

  login(){
    this.route.navigateByUrl("administration")
  }

}
