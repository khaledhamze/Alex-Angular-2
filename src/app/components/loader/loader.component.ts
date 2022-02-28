import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'ems-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe(isShow => {
      console.log('loader:', isShow);
      this.loading = isShow;
    });
  }

  ngOnInit(): void {
  }

}
