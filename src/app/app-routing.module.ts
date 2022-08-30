import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'busca-reativa'
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then(u => u.UploadFileModule)
  },
  {
    path: 'busca-reativa',
    loadChildren: () => import('./reactive-searche/reactive-searche.module').then(u => u.ReactiveSearcheModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

