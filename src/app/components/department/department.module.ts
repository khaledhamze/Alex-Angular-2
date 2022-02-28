import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentListComponent } from './department-list/department-list.component';
import { SearchModule } from '../shared/search/search.module';
import { FormsModule } from '@angular/forms';
import { NoRowsModule } from '../shared/no-rows/no-rows.module';


@NgModule({
  declarations: [
    DepartmentListComponent
  ],
  imports: [
    CommonModule,
    SearchModule,
    FormsModule,
    NoRowsModule
  ]
})
export class DepartmentModule { }
