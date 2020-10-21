import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { PosServicesService } from '../pos-services.service';
import { PageDataService } from '../../../@core/utils/page-data.service';
import { PosClientConfig } from '../../../@core/data/pos-client-config';
import { ItemDetail, Discount, GRNItemSummary, Units } from '../../../@core/utils/models';


@Component({
  selector: 'ngx-sales-item-conf',
  templateUrl: './sales-item-conf.component.html',
  styleUrls: ['./sales-item-conf.component.scss']
})
export class SalesItemConfComponent implements OnInit {

  @Input() itemDetail: ItemDetail;
  selectedGrn:number[]=[0];
  grnSelected:any;
  discounts:Map<number,any[]> = new Map();
  sellingUnit:any;
  units:Units[];
  posClientConfig: PosClientConfig;
  qty:number=1;
  itemDiscounts:Discount[];
  sellingPrice: number;
  
  constructor(
    protected ref: NbDialogRef<SalesItemConfComponent>,
    private posServie: PosServicesService,
    private pds: PageDataService
  ) {
    this.grnSelected=function(index,$event){
      //if(this.selectedGrn.length>1){
      if('td'==$event.target.localName){  
      console.log($event);
        if(this.isGrnSelected(index)){
          this.selectedGrn.splice(this.selectedGrn.indexOf(index),1);
        }else{
          this.selectedGrn.push(index);
        }
      }
    }
  }

  ngOnInit(): void {
    console.log(this.itemDetail);
    this.sellingPrice = this.itemDetail.itemPrice?.pricePerUnit
    this.itemDetail.grnItemAvailableDtos.forEach(gi=>{
      let discountsArray = [...gi.grnItemDiscounts];
      this.discounts.set(gi.grnItemId,discountsArray);
    });
    this.units = [...this.itemDetail.sellableUnits];
    this.sellingUnit = this.units[0];
    this.pds.currentPosClientConfig.subscribe(cc=>{
      this.posClientConfig = cc;
    });
    this.itemDiscounts = [...this.itemDetail.itemDiscount];
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    let configuredItem:any;
    configuredItem = {
      'discounts': this.discounts,
      'preferedGrnIndex': this.selectedGrn,
      'qty':this.qty,
      'unit':this.sellingUnit
    }
    this.ref.close(configuredItem);
  }

  selectUnSelect(grnItem,discount ,$event){
    console.log($event);
    $event.stopPropagation();
    if(this.isSelected(grnItem, discount)){
      this.discounts.get(grnItem.grnItemId)
      .splice(this.discounts.get(grnItem.grnItemId).indexOf(discount),1);
    }else{
      this.discounts.get(grnItem.grnItemId).push(discount);
    }
    
  }

  isSelected(grnItem, discount){
    return this.discounts.get(grnItem.grnItemId).find(d=>d.discountsId == discount.discountsId);
  }

  isGrnSelected(index){
    return this.selectedGrn.indexOf(index)!=-1;
  }

  QtyOrUnitChange(){
    console.log(this.qty+"  "+this.sellingUnit.unitsCode);
    if(this.qty<0 || this.sellingUnit==undefined){
      this.sellingUnit = this.units[0];
      this.qty = 1;
    }

    //check whether Item can be purchased
    if(!this.canPurchaseItem(this.qty, this.sellingUnit, this.itemDetail.grnItemsSummary)){
      this.qty = this.itemDetail.grnItemsSummary.itemAvailableQty;
      this.sellingUnit = this.units.find(u=>u.unitsId == this.itemDetail.grnItemsSummary.unitDto.unitsId)[0];
    }

    if(this.grnSelected && this.grnSelected.length>1){
      this.grnSelected.sort((a,b)=>{return a-b});
    }

    this.generateSalesItem();

  }
  generateSalesItem() {
    //let salesItem:SalesItem[]
  }
  canPurchaseItem(qty: number, sellingUnit: any, grnItemsSummary: GRNItemSummary) {
    return qty<=this.posServie.getMappedQty(grnItemsSummary.itemAvailableQty, sellingUnit, grnItemsSummary.unitDto);
  }

  selectUnSelectItemDiscount(itemDiscount){
    if(this.isSelectedItemDiscount(itemDiscount)){
      this.itemDiscounts.splice(this.itemDiscounts.indexOf(itemDiscount),1);
    }else{
      this.itemDiscounts.push(itemDiscount);
    }
  }

  isSelectedItemDiscount(itmDsct){
    if(this.itemDiscounts && this.itemDiscounts.length>0){
      return this.itemDiscounts.find(itemDiscount=>itemDiscount.discountsId==itmDsct.discountsId);
    }
    return false;
  }

}
