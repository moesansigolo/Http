import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CursosService } from '../cursos.service';
import { Curso } from './../curso';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso>{
  constructor(private service: CursosService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    if (!route.params && route.params['id']) {
      return this.service.loadById(route.paramMap.get('id'))

    }
    return this.service.loadById(route.paramMap.get('id'));
  }

}


