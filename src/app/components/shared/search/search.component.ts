import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ems-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output()
  dataChange = new EventEmitter();
  name = '';
  constructor() { }

  ngOnInit(): void {
  }

  valueChange(data: Event) {
    console.log('from ', data);
    this.dataChange.emit(data);
  }

}
