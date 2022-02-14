import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellDetail } from 'src/app/interfaces/sell-detail';
import { SellDetailsService } from 'src/app/services/sell-details.service';
import { SellService } from 'src/app/services/sell.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  correo!:string;

  
  constructor(private sellService:SellService,private detailsService:SellDetailsService) { }

  ngOnInit(): void {
  }
  get total():number{
    return this.detailsService.total;
  }

  comprar(){	
    this.sellService.addSell(1,this.total,this.correo,this.detailsService.details).subscribe((resp)=>{
      Swal.fire('Compra realizada','','success');

    });

  }

}
