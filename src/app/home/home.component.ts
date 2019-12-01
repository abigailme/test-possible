import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  error: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  /*  this.dataService.sendGetRequest().subscribe((data: any[])=>{
      this.products = data;
    })  */
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  getParam(title:string, author:string) {
    this.error = null;
    this.products = null;
    if(title != "" || author != "") {
      this.dataService.sendGetRequestSearch(title, author).subscribe((data: any[])=>{
      this.products = data;
      }, error => {
        this.error = error;
        console.error(error);
      });
    } else {
      this.error = "Search fields are missing"
    }
  }


}
