import { Component, OnInit } from '@angular/core';
import { ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
type TableRow=[string,string,string];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users!:User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers(true).subscribe(resp=>{
      this.users=resp.data;
    });
  }
  imprimir(){
    PdfMakeWrapper.setFonts(pdfFonts);
   
    const pdf = new PdfMakeWrapper();
    const fecha = new Txt(this.getDate()).alignment('right').end;
    const title=new Txt('Lista de usuarios').alignment('center').bold().margin([50,50,50,0]).fontSize(18).end
    pdf.add(fecha);
    pdf.add(title);
    pdf.add(this.
      createTable());

    pdf.create().print();
  }

  createTable():ITable{
    return new Table(
      [
        ['Nombre', 'Email', 'Rol'],
        ...this.extractData()

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
  extractData():TableRow[]{
    return this.users.map((user)=>[user.name+' '+user.lastname,user.email,this.getRol(user.rol)]);
  }

  getDate():string{
    const tiempoTranscurrido:number = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    return hoy.toLocaleDateString();
  }

  getRol(rol :number):string{
    return (rol===1) ?'Admin':'Empleado';
  }
}
