import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SearchModule } from '../shared/search/search.module';
import { ModalModule } from '../shared/modal/modal.module';
import { EmployeeComponent } from './employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoRowsModule } from '../shared/no-rows/no-rows.module';



@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    SearchModule,
    ModalModule,
    ReactiveFormsModule,
    NoRowsModule
  ]
})
export class EmployeeModule { }
