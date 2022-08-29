import { Cursos2Service } from './../cursos2.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import {  EMPTY, empty, Observable, pipe, Subject } from 'rxjs'
import { catchError, take, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[] | undefined;
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado!: Curso;


  constructor(
    // private service: CursosService,
    private service: Cursos2Service,
    private bsModalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
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

    // this.service.list().subscribe(
    //   dados => {
    //     console.log(dados);
    //   },
    //   error => console.error(error),
    //   () => console.log('Observable completo!')
    // );
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.bsModalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.'
  }

  onEdit(id: any){
    this.router.navigate(['editar', id], { relativeTo: this.route})
  }

  onDelete(curso: any){
    this.cursoSelecionado = curso;
    const result$ = this.alertService.showConfirm('confirmacão', 'Tem certeza que deseja remover esse curso?')
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();

      },
      error => {
        this.alertService.showAlertDanger('Erro ao tendar deletar o curso')

      }
    )
  }

  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao tendar deletar o curso')
        this.deleteModalRef.hide();
      }
    );
  }
  OnDeclineDelete(){
    this.deleteModalRef.hide();
  }

}

