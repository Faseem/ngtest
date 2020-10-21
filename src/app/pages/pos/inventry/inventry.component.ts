import { Component, OnInit } from '@angular/core';
import { PosServicesService } from '../pos-services.service';
import { NbDialogService } from '@nebular/theme';
import { SalesItemConfComponent } from '../sales-item-conf/sales-item-conf.component';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PageDataService } from '../../../@core/utils/page-data.service';

@Component({
  selector: 'ngx-inventry',
  templateUrl: './inventry.component.html',
  styleUrls: ['./inventry.component.scss']
})
export class InventryComponent implements OnInit {

  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  itemSearchFunction = (searchTerm:string)=>{
    return this.posServie.getAvailableItems(searchTerm);
  };

  unitMappers:any[];

  pageSize:number=15;
  totalElements:number=150;
  

  constructor(
    private dialogService: NbDialogService,
    private posServie: PosServicesService,
    private pds:PageDataService
  ) { }

  ngOnInit(): void {
    this.pds.currentUnitMappers.subscribe(um=>{
      this.unitMappers  = um;
    });
  }

  searchByText($event){
    console.log("Returned"+event);
    this.posServie.getItemGRNDetails($event.itemId)
    .subscribe(id=>{
      var itemSelected:any={
        'itemDetail':id
      }

      this.dialogService.open(
        SalesItemConfComponent,
        {
          context: itemSelected,
          closeOnBackdropClick: false,
        }
      ).onClose.subscribe(ci =>{
        /*'discounts': this.discounts,
        'preferedGrnIndex': this.selectedGrn,
        'qty':this.qty,
        'unit':this.sellingUnit */
        console.log(ci);
        this.prepareInvoiceItemAndAdd(id, ci);
      });
    });
  }

  prepareInvoiceItemAndAdd(itemDetail, itemConfig){
    this.getGRNItems(itemDetail, itemConfig);
  }

  getGRNItems(itemDetail, itemConfig){
    /* if(itemDetail.grnItemAvailableDtos && itemDetail.grnItemAvailableDtos.length()>0){

    } */
  }
  paginationChanged(event){
    //this.pageNumber = event.page;
    this.pageSize = event.pageSize || this.pageSize;
    //this.loadData()
  }

}
