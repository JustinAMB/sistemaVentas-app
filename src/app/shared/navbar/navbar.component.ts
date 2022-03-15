import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router,private responsive:ResponsiveService) { }
  get navbar():boolean{
    return this.responsive.navbar;
  }
  ngOnInit(): void {
  }

  navegar(ruta:string){
    this.router.navigate([ruta]);
  }
  cambiarNavbar(){
    this.responsive.navbar=!this.responsive.navbar;
  }


  get tam():boolean{
    if(window.innerWidth>=768){
      this.cambiarNavbar();
    }
    return window.innerWidth<768;
  }
}
