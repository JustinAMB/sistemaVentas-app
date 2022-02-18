import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sell } from 'src/app/interfaces/sell';
import { SellService } from 'src/app/services/sell.service';

@Component({
  selector: 'app-lista-sells',
  templateUrl: './lista-sells.component.html',
  styleUrls: ['./lista-sells.component.css']
})
export class ListaSellsComponent implements OnInit {
  sells!:Sell[];
  load:boolean=true;
  constructor(private sellService: SellService, private router:Router) { }

  ngOnInit(): void {
    this.sellService.getSellsByDay().subscribe(resp=>{
      this.sells=resp.data;
      this.load=false;
    });

  }
  ver(id:number):void {
    this.router.navigate(['/caja/ver-detalle',id]);
  }
  getDate(fecha:Date):string{
    
    const hoy = new Date(fecha);
    return hoy.toLocaleString().split(',').join('');
  }
}
