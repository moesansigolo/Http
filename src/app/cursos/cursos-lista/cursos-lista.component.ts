import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import {  empty, Observable, pipe, Subject } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[] | undefined;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();


  constructor(
    private service: CursosService,
    // private bsModalService: BsModalService
    private alertService: AlertModalService
    ) { }

  ngOnInit() {
    // this.service.list().subscribe(dados => this.cursos = dados);
    this.onRefresh();

  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true)
        this.handleError();
        return empty();
      })
    );

    this.service.list().subscribe(
      dados => {
        console.log(dados);
      },
      error => console.error(error),
      () => console.log('Observable completo!')
    );
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.bsModalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.'
  }

}

