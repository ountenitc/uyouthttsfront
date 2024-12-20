import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Utilisateur } from '../../model/utilisateur';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [
    NgFor, 
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit{

  itemsPerPage:number=10;
  p:number=1;
  searchText:any;
  usersFiltrer!: Utilisateur[];
  usersInit!: Utilisateur[];
  usersFiltre!: Utilisateur[];
  users:Utilisateur[]=[];

  constructor(private userService : UtilisateurService,){}

  ngOnInit(): void {

    this.userService.getListeUser().subscribe({
      next:(response)=>{
        console.log("user :", response)
        this.users=response as Utilisateur[];
        this.usersFiltre=response as Utilisateur[];
        this.usersInit=response as Utilisateur[];
      }
    })
    
  }



  delete(item:Utilisateur){

  }

  filtrer(){    
    if(this.searchText){
     const filterValue = this.searchText
     this.users=this.usersFiltre.filter(function(item){
       return (item.username)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) || (item.role)?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()) })
    
    }else{
     this.users=this.usersInit;
    }
   }

}
