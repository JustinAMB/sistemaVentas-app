import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.css']
})
export class FormProveedorComponent implements OnInit {
  id!:number;

  constructor(
    private fb:FormBuilder,
    private personService:PersonService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      console.log('editar2');
      return;
    }
    console.log('editar');
    this.activatedRoute.params.pipe(
      tap(params=>{this.id=Number(params['id'])}),
      switchMap(({ id }) =>this.personService.getPerson(this.id))
    ).subscribe(resp=>{
      console.log(resp);
    });
  }

}
