import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-data-pagination',
  templateUrl: './data-pagination.component.html',
  styleUrls: ['./data-pagination.component.scss']
})
export class DataPaginationComponent implements OnInit, OnChanges {

  @Input() page:number=1;
  @Input() pageSize:number = 15;
  @Input() collectionSize:number;
  @Input() showSizeSelection:boolean=true;
  @Output() paginationChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){

  }

  getPage(page:number){
    this.page=page;
    this.paginationChanged.emit({
      page:this.page<0?0:this.page-1,
      pageSize:this.pageSize
    });
  }

  loadForPage(value){
    this.page=1;
    this.pageSize=value;
    this.paginationChanged.emit({
      page:this.page<0?0:this.page-1,
      pageSize:this.pageSize
    });
  }

}
