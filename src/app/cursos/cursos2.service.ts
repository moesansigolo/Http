import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { CrudServices } from './../shared/crud-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudServices<Curso> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
