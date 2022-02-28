import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DepartmentListComponent } from './components/department/department-list/department-list.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: 'employees', component: EmployeeListComponent,
    loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'departments', component: DepartmentListComponent,
    loadChildren: () => import('./components/department/department.module').then(m => m.DepartmentModule)
  },
  { path: 'contactus', component: ContactusComponent },
  { path: '', redirectTo: 'employees', pathMatch: "full" },
  { path: '**', redirectTo: 'employees' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
