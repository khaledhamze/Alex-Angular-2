import { Component, OnInit } from '@angular/core';
import { exhaustMap } from 'rxjs/operators';
import { IEmployee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ModalService } from '../../shared/modal/modal.service';
@Component({
  selector: 'ems-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  searchTerm = '';
  employees: IEmployee[] = [];
  employee: IEmployee;
  modalTitle;

  constructor(private modalService: ModalService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  openEmployeeModal() {
    this.modalTitle = 'Add';
    this.modalService.openPopup();
    this.employee = <IEmployee>{};
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(_employees => {
      this.employees = Object.assign([], _employees);
    });
  }

  editEmployee(employeeId: number) {
    this.modalTitle = 'Update';
    this.modalService.openPopup();
    this.employeeService.getEmployeeById(employeeId).subscribe(_employee => {
      this.employee = _employee;
    });
  }

  deleteEmployee(employee: IEmployee) {
    const isConfirm = confirm(`are you sure want to delete Employee: ${employee.fName} ? `);
    if (isConfirm) {
      this.employeeService.deleteEmployee(employee.id).pipe(
        exhaustMap(() => {
          return this.employeeService.getAllEmployees()
        })
      ).subscribe(_employees => {
        this.employees = _employees;
      });
    }
  }

  employeeEmitter() {
    setTimeout(() => {
      this.getEmployees();
    });
  }

  valueChange(data: string) {
    this.searchTerm = data;
  }
}
