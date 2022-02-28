import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'ems-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input()
  modalTitle = '';

  @Output()
  saveEmitter = new EventEmitter();

  @Output()
  closeEmitter = new EventEmitter();

  isOpen = false;
  constructor(private modalServie: ModalService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.modalServie.modalSubscriber().subscribe(_isOpen => {
      this.isOpen = _isOpen;
    })
  }

  closeModal() {
    this.modalServie.closePopup();
    this.closeEmitter.emit();
  }

  save() {
    this.saveEmitter.emit();
  }

}
