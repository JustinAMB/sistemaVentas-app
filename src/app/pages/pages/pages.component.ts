import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  get auth():User{
    return this.authService.user;
  }
  constructor(private authService:AuthService,private responsive:ResponsiveService) { }
  get tam():boolean{
    return window.innerWidth<768;
  }
  get navbar():boolean{
    return this.responsive.navbar;
  }
  ngOnInit(): void {
  }

}
