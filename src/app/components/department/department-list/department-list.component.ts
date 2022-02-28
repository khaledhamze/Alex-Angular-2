import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { exhaustMap } from 'rxjs/operators';
import { IDepartment } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { UniqueIdService } from 'src/app/services/unique-id.service';

@Component({
  selector: 'ems-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

  constructor(private departmentServie: DepartmentService, private uniqueIdService: UniqueIdService) { }
  departmentName = '';
  departments: IDepartment[] = [];
  rowIndex = -1;
  selectedDepartment: IDepartment;
  searchTerm = '';
  validationMessagae;
  @ViewChild('eForm') eForm: NgForm;

  ngOnInit(): void {
    this.getAllDepartments();
  }

  async addDepartment() {
    if (!this.eForm.valid) {
      return;
    }

    const departmentDetails = await this.departmentServie.getDepartmentDetailsByDepartmentName(this.departmentName).toPromise();

    if (departmentDetails.length) {
      this.validationMessagae = 'Department name already exists..!'
      return;
    }
    const department: IDepartment = {
      id: this.uniqueIdService.getUniqueId(),
      name: this.departmentName
    };
    this.departmentServie.addDepartment(department).pipe(
      exhaustMap(() => {
        return this.departmentServie.getAllDepartments();
      })
    ).subscribe(_departments => {
      this.departments = _departments;      
      this.eForm.resetForm();
      this.validationMessagae = '';
    });
  }

  getAllDepartments() {
    return this.departmentServie.getAllDepartments().subscribe(_departments => {
      this.departments = _departments;
    });
  }

  deleteDepartment(department: IDepartment) {
    const isConfirmed = confirm(`Are you sure want to delete department: ${department.name} ?`);
    if (isConfirmed) {
      this.departmentServie.deleteDepartment(department.id).pipe(
        exhaustMap(() => {
          return this.departmentServie.getAllDepartments()
        })
      ).subscribe(response => {
        this.departments = response;
      })
    }
  }

  editDepartment(index: number) {
    this.rowIndex = index;
    this.selectedDepartment = Object.assign({}, this.departments[index]);
  }

  cancelRow(index: number) {
    this.rowIndex = -1;
    this.departments[index] = this.selectedDepartment;
  }

  updateDepartment(department: IDepartment, index: number) {   
    this.departmentServie.updateDepartment(department).pipe(
      exhaustMap(() => {
        return this.departmentServie.getAllDepartments();
      })
    ).subscribe(_departments => {
      this.departments = _departments;
      this.rowIndex = -1
    });
  }

  valueChange(data: string) {
    this.searchTerm = data;
  }

}
