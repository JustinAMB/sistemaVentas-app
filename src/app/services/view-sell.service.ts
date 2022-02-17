import { Injectable } from '@angular/core';
import { ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { Sell } from '../interfaces/sell';
import { SellDetail } from '../interfaces/sell-detail';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';
type TableRow=[string,string,number,number,number];
@Injectable({
  providedIn: 'root'
})
export class ViewSellService {

  constructor(private productService: ProductService) { }
  imprimir(sell:Sell,details:SellDetail[]){
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();
    const fecha = new Txt(this.getDate(sell.created!)).alignment('right').end;
    const title=new Txt('Venta N°'+sell.id).alignment('center').bold().margin([50,50,50,0]).fontSize(18).end
    pdf.add(fecha);
    pdf.add(title);
    pdf.add(this.
      createTable(details));

    pdf.create().print();
  }
  extractData(details:SellDetail[]):TableRow[]{
    return details.map((detail:SellDetail)=>[...this.getInfoProduct(detail.product),detail.priceUnit,detail.quantity,detail.priceUnit*detail.quantity]);
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
    ).alignment('center').margin([90,20,0,0]).end;
  }
  getDate(fecha:Date):string{
    
    return fecha.toLocaleDateString();
  }
  getInfoProduct(id:number):[string,string]{
    this.productService.getProduct(id).subscribe(resp=>{
      const product=resp.data as Product;
      return [product.barcode,product.name];
    });
    return ['',''];
  }
}
