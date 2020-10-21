import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfService } from '../../@core/utils/app-conf.service';
import { Discount, DiscountStatus, Units, UnitsMapper } from '../../@core/utils/models';
import { PageDataService } from '../../@core/utils/page-data.service';

@Injectable({
  providedIn: 'root'
})
export class PosServicesService {
  

  private posServiceUrl:string = AppConfService.startupStrings.posServiceUrl;
  constructor(
    private http: HttpClient,
    private pds:PageDataService
  ) { }

  getAvailableItems(itemName:string=''):Observable<any>{
    let params = new HttpParams().set("searchPhase", itemName);
    return this.http.get(
      `${this.posServiceUrl}/grn-available-items/search-items`, {params:params}
    );
  }

  getItemGRNDetails(itemId: any) {
    return this.http.get(
      `${this.posServiceUrl}/grn-available-items/`+itemId
    );
  }

  getUnitMappers():Observable<any>{
    return this.http.get(
      `${this.posServiceUrl}/units-mappers`
    );
  }

  isDiscountApplicable(discount: Discount, qty:number, unit:Units){
    if(
      //status check
      (discount.discountStatus = DiscountStatus.ACTIVE) &&
      //start date check
      (
        discount.discountStartDate == null ||
        discount.discountStartDate == undefined ||
        discount.discountStartDate <= new Date()
      ) &&
      //end date check
      (
        discount.discountEndDate == null ||
        discount.discountEndDate == undefined ||
        discount.discountEndDate > new Date()
      ) &&
      //min amount to qualify check
      (
        discount.minAmountToQualify == null ||
        discount.minAmountToQualify == undefined ||
        discount.minAmountToQualify == 0 ||
        //this.isMinAmountAchieved(qty, unit, discount.discountQualifyCheckUnit, discount.minAmountToQualify)
        qty>this.getMappedQty(discount.minAmountToQualify, unit, discount.discountQualifyCheckUnit)
      )
    ){
      return true;
    }else{
      return false;
    }
  }

  isMinAmountAchieved(qty: number, unit: Units, discountQualifyCheckUnit: Units, minAmountToQualify: number): boolean {
    if(qty>this.getMappedQty(minAmountToQualify, unit, discountQualifyCheckUnit)){
      return true;
    }else{
      return false;
    }
  }
  getMappedQty(qty, toUnit: Units, baseUnit: Units) {
    if(toUnit.unitsId == baseUnit.unitsId){
      return qty;
    }else{
      this.pds.currentUnitMappers.subscribe((um:UnitsMapper[])=>{
        if(um && um.length>0){
          let umFoundArray = um.filter(umf=>
              (umf.baseUnits.unitsId == baseUnit.unitsId) &&
              (umf.mappedUnit.unitsId == toUnit.unitsId)
            );
          if(umFoundArray && umFoundArray.length==1){
            return qty/(umFoundArray[0].qtyOfMappedUnitForBase);
          }else{
            let umFoundArray = um.filter(umf=>
              (umf.baseUnits.unitsId == toUnit.unitsId) &&
              (umf.mappedUnit.unitsId == baseUnit.unitsId)
            );
            if(umFoundArray && umFoundArray.length==1){
              return qty*(umFoundArray[0].qtyOfMappedUnitForBase);
            }else{
              return 0;
            }
          } 
        }
      });
    }
  }
}
