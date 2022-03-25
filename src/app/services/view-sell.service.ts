import { Injectable } from '@angular/core';
import { ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { Sell } from '../interfaces/sell';
import { SellDetail } from '../interfaces/sell-detail';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';
type TableRow=[string,string,number,number,number];
type TableRowTotales=[string,number]
@Injectable({
  providedIn: 'root'
})
export class ViewSellService {

  constructor(private productService: ProductService) { }
  imprimir(sell:Sell,details:SellDetail[]){
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      
      fontSize: 10,
    });
    const  title=new Txt('Factura').alignment('center').bold().margin([0,10,0,10]).end;
    const fecha = new Txt(`Fecha: ${this.getDate(sell.created!)}`).alignment('left').margin([ 2,2,2,2]).end;
    const factura=new Txt(`Factura: ${sell.id}`).alignment('left').margin([ 2,2,2,2]).end;
    const separador=new Txt(`------------------------------------------------------------------------------`).end;
    pdf.pageSize('A6');
    pdf.add(title)
    pdf.add(fecha);
    pdf.add(factura);
    pdf.add(separador);
    const subtotal=sell.total/1.13;
   
    const subtotalLabel=new Txt(`SubTotal: ${this.myRound(subtotal,2)}`).alignment('right').margin([ 2,2,2,2]).end;
    const iva=new Txt(`Iva: ${this.myRound(sell.total-subtotal,2)}`).alignment('right').margin([ 2,2,2,2]).end;
    const total=new Txt(`Total: ${this.myRound(sell.total,2)}`).alignment('right').margin([ 2,2,2,2]).end;
    
    pdf.add(this.
      createTable(details));
      pdf.add(subtotalLabel);  
      pdf.add(iva);  
      pdf.add(total);  
    pdf.create().print();
  }
  extractData(details:SellDetail[]):TableRow[]{
    return details.map((detail:SellDetail)=>[...this.productService.getInfoProduct(detail.product),detail.priceUnit,detail.quantity,detail.priceUnit*detail.quantity]);
  }
  createTable(details:SellDetail[]):ITable{
    return new Table(
      [
        ['Codigo', 'Nombre', 'precio', 'cantidad', 'total'],
        ...this.extractData(details)

      ]
    ).layout(
      {
        fillColor:(rowIndex:number | undefined,node:any,columnIndex:number | undefined):string =>{
          const row:number=Number(""+rowIndex);
          return (row%2==0) ? '#CCCCCC' : '';
        },
        
      }
    ).alignment('center').end;
  }
  getDate(fecha:Date):string{
    
    const hoy = new Date(fecha);
    return hoy.toLocaleString().split(',').join('');
  }

  

   myRound(num:number, dec:number) :number{
    const exp = Math.pow(10, dec || 2); // 2 decimales por defecto
    return parseInt(`${num*exp}`, 10) / exp;
  }
}
