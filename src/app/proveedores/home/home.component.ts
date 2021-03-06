import { Component, OnInit } from '@angular/core';
import { ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { Person } from 'src/app/interfaces/person';

import { PersonService } from 'src/app/services/person.service';
type TableRow=[string,string,string,string];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  persons!:Person[];
  load:boolean=true;
  constructor(private personService:PersonService) { }

  ngOnInit(): void {
    this.personService.getPersons(1,true).subscribe(resp=>{
      if(resp.ok===true) {
        this.persons=resp.data;
        this.load=false;
      }
    });
    
  }

  imprimir(): void{
   
    PdfMakeWrapper.setFonts(pdfFonts);
    console.log(this.extractData(this.persons));
    const pdf = new PdfMakeWrapper();
    const fecha = new Txt(this.getDate()).alignment('right').end;
    const title=new Txt('Lista de proveedores').alignment('center').bold().margin([50,50,50,0]).fontSize(18).end
    pdf.add(fecha);
    pdf.add(title);
    pdf.add(this.
      createTable());

    pdf.create().print();
  }
  createTable():ITable{
    return new Table(
      [
        ['Nombre', 'Email', 'Telefono', 'Direccion'],
        ...this.extractData(this.persons)

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

  extractData(data:Person[]):TableRow[]{
    return data.map((person:Person)=>[person.name+' '+person.lastname,person.email,person.phone,person.address]);
  }

  getDate():string{
    const tiempoTranscurrido:number = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    return hoy.toLocaleDateString();
  }
}
