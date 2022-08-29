import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { Cursos2Service } from '../cursos2.service';
import { CursosService } from '../cursos.service';


@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  preserveWhitespaces: true
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false

  constructor(
    private fb: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    //INDO NO SERVIDOR E BUSCANDO DADOS
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const curso$ = this.service.loadById(id);
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    //INDO NO SERVIDOR BUSCANDO DADOS CODIGO REFATORADO
    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.service.loadById(id))
    // )
    // .subscribe(curso => this.updateForm(curso));

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field: string){
    return this.form.get(field)?.errors;
  }

  onSubmit(){
    this.submitted = true
    console.log(this.form.value)
    if(this.form.valid){
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso!'
      let mesgError = 'erro ao tentar criar o curso'
      if (this.form.value.id){
        msgSuccess = 'Curso atualizado com sucesso!';
        mesgError = 'Erro ao tentar atualizar curso.';

      }

      this.service.save(this.form.value).subscribe(
        success => { this.modal.showAlertSuccess(msgSuccess)
          this.location.back();
        },
          error => {this.modal.showAlertDanger(mesgError)},
      )

      // if(this.form.value.id){
      //   this.service.update(this.form.value).subscribe(
      //     success => {
      //       this.modal.showAlertSuccess('Curso atualizado com sucesso')
      //       this.location.back();
      //     },
      //     error => this.modal.showAlertDanger('Erro ao tentar atualizar curso'),
      //     () => console.log('update completo')
      //   )
      // }else {
      //    this.service.create(this.form.value).subscribe(
      //     success => {
      //        this.modal.showAlertSuccess('Curso adicionado com sucesso')
      //        this.location.back();
      //      },
      //      error => this.modal.showAlertDanger('Erro ao tentar criar curso'),
      //      () => console.log('request completo')
      //    );
      //  }

    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();

  }

}
