import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { NameFilterPipe } from './pipes/name.pipe';


@NgModule({
  declarations: [
    SearchComponent,
    NameFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    SearchComponent,
    NameFilterPipe
  ] 
})
export class SearchModule { }
