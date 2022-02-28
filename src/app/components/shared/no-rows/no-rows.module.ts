import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoRowsComponent } from './no-rows.component';



@NgModule({
  declarations: [
    NoRowsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NoRowsComponent
  ]
})
export class NoRowsModule { }
