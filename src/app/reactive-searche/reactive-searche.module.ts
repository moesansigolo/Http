import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveSearcheRoutingModule } from './reactive-searche-routing.module';
import { LibSearchComponent } from './lib-search/lib-search.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveSearcheRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveSearcheModule { }
