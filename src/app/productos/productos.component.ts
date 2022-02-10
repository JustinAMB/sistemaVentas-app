import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 
type TableRow=[string,string,number,number];
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  products!:Product[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(resp=>{
      this.products=resp.data;
    });
  }


  imprimir(){
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();
    const fecha = new Txt(this.getDate()).alignment('right').end;
    const title=new Txt('Lista de productos').alignment('center').bold().margin([50,50,50,0]).fontSize(18).end
    pdf.add(fecha);
    pdf.add(title);
    pdf.add(this.
      createTable());

    pdf.create().print();
  }
  extractData():TableRow[]{
    return this.products.map((product)=>[product.barcode,product.name,product.price,product.inventary_min]);
  }
  createTable():ITable{
    return new Table(
      [
        ['Codigo', 'Nombre', 'precio', 'inventario minimo'],
        ...this.extractData()

      ]
    ).layout(
      {
        fillColor:(rowIndex:number | undefined,node:any,columnIndex:number | undefined):string =>{
          const row:number=Number(""+rowIndex);
          return (row%2==0) ? '#CCCCCC' : '';
        },
        
      }
    ).alignment('center').margin([25,25]).end;
  }
  getDate():string{
    const tiempoTranscurrido:number = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    return hoy.toLocaleDateString();
  }
}
