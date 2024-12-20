import { NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnInit{

  constructor(private route : Router){}
  nomUser:String="";

  ngOnInit(): void {
    this.nomUser=sessionStorage.getItem("login") as String;
  }

  ngAfterViewInit(): void {
    this.initializeSidebarToggle()
   
  }

  initializeSidebarToggle(): void {
    const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
    if (toggleSidebarBtn) {
      toggleSidebarBtn.addEventListener('click', () => {
        document.getElementById("body")?.classList.toggle('toggle-sidebar');
      });
    }
  }

  logout(){
   // sessionStorage.clear()
    this.route.navigateByUrl('login');
  }

}
