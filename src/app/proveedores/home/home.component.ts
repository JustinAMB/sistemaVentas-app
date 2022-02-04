import { Component, OnInit } from '@angular/core';
import { ITable, PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { Person } from 'src/app/interfaces/person';
import { PersonService } from 'src/app/services/person.service';


interface PersonData{

  name:string;
  address:string;
  phone:string;
  email:string;

}

type TableRow=[string,string,string,string];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  persons!:PersonData[];
  constructor(private personService:PersonService) { }

  ngOnInit(): void {
    this.personService.getPersons(1,true).subscribe(resp=>{
      if(resp.ok===true) {
        this.persons=resp.data.map(({name,lastname,address,phone,email}:Person)=>({name:name+' '+lastname,address,phone,email}));
      }
    });
    
  }

  imprimir(): void{
   
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();

    pdf.add(this.
      createTable());

    pdf.create().open();
  }
  createTable():ITable{
    return new Table(
      [
        ['Nombre', 'Email', 'Telefono', 'Direccion'],
        ...this.extractData(this.persons)

      ]
    ).end;
  }

  extractData(data:PersonData[]):TableRow[]{
    return data.map((person:PersonData)=>[person.name,person.email,person.phone,person.address]);
  }
}
