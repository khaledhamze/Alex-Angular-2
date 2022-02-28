import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IDepartment } from 'src/app/models/department.model';
import { IEmployee } from 'src/app/models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UniqueIdService } from 'src/app/services/unique-id.service';
import { ModalService } from '../shared/modal/modal.service';

@Component({
  selector: 'ems-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnChanges {

  eForm: FormGroup;
  submitted = false;
  departments: Observable<IDepartment[]>;
  @Input()
  employee: IEmployee;
  @Output()
  employeeEmitter = new EventEmitter();
  validationMessage;

  constructor(private formBuilder: FormBuilder,
    private modalService: ModalService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private uniqueIdService: UniqueIdService) { }

  ngOnInit(): void {
    this.eForm = this.formBuilder.group({
      id: [''],
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      country: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['male', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      acceptTerms: [true, [Validators.required]]
    });

    this.getDepartments();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.employee?.id) {
      this.eForm.setValue(this.employee);
    } else {
      this.setFormInitValues();
    }
  }

  get f() {
    return this.eForm.controls;
  }

  async saveEmployee() {
    this.submitted = true;
    if (this.eForm.invalid) {
      return;
    }
    const employeeInfo: IEmployee[] = await this.employeeService.getEmployeeDetailsByFNameAndLName(this.eForm.controls['fName'].value, this.eForm.controls['lName'].value).toPromise();

    if (this.employee?.id) {
      if (employeeInfo.length > 1) {
        this.validationMessage = 'Employee already exists..!';
        return;
      }
      this.employeeService.updateEmployee(this.eForm.value).subscribe(response => {
        this.resetFormAndEmitEvent();
      });
    } else {
      if (employeeInfo.length) {
        this.validationMessage = 'Employee already exists..!';
        return;
      }
      this.eForm.value['id'] = this.uniqueIdService.getUniqueId();
      this.employeeService.saveEmployee(this.eForm.value).subscribe(response => {
        this.resetFormAndEmitEvent();
      });
    }
    this.modalService.closePopup();
  }

  resetForm() {
    this.submitted = false;
    this.eForm.reset();
  }

  resetFormAndEmitEvent() {
    this.resetForm();
    this.validationMessage = '';
    this.employeeEmitter.emit();
  }

  getDepartments() {
    this.departments = this.departmentService.getAllDepartments();
  }

  setFormInitValues() {
    this.eForm?.setValue({
      id: '',
      fName: '',
      lName: '',
      country: '',
      gender: 'male',
      dob: '',
      email: '',
      department: '',
      acceptTerms: ''
    });
  }

}
