export class UserProfile{
    username?:string;
    firstName?:string;
    lastName?:string;
    email?:string;
    fullName?:string;
    attributes?:Attribute
}

export class Attribute{
    clientId:string[];
    userId:string[];
    clientName:string[];
}

export class PosClientConfig{
    posClientCofigId: number;
    clientId: number;
    openSalesItemCofPopUp:boolean;
    showBuyingPriceInPopUp:boolean;
    showBuyingPriceInInventry:boolean;
}

export class UnitsMapper{
    unitsMapperId: number;
    baseUnits: Units;
    mappedUnit: Units;
    qtyOfMappedUnitForBase: number;
    unitsMapperClientId: number;
    unitsMapperCreatedBy: number;
    unitsMapperCreatedTime:Date;
    unitsMapperUpdatedBy;
    unitsMapperUpdatedTime:Date;
}

export class Units{
    unitsId:number;
    unitsCode:string;
    unitsDescription:string;
    unitsClientId:number;
    unitsCreatedBy:number;
    unitsCreatedTime:Date;
    unitsUpdatedTime:Date;
    unitsUpdatedBy:number;
}

export class Discount{
    discountsId: number;
    itemId: number;
    grnItemId: number;
    discountType: DiscountType;
    discountMaxAmount:number;
    minAmountToQualify: number;
    discountStartDate:Date;
    discountEndDate:Date;
    discountStatus: DiscountStatus;
    discountPercentage:number;
    discountAmount:number;
    discountDetail:string;
    discountQualifyCheckUnit: Units
}

export enum DiscountStatus{
    ACTIVE, IN_ACTIVE
}

export enum DiscountType{
    ITEM_IN_GRN, ITEM, CUSTOMER, SUPPLIER, RANDOM
}


export class ItemDetail{
    itemId:number;
    itemClientId:number;
    brand: Brand;
    itemName:string;
    itemDescription:string;
    itemCreatedBy:number;
    itemCreatedDate: Date;
    itemUpdatedBy:number;
    temUpdatedDate: Date;
    itemIsStockedBatchWise:boolean;
    categoryList:Category[];
    grnItemAvailableDtos: GrnItemAvailable[];
    grnItemsSummary: GRNItemSummary;
    itemDiscount: Discount[];
    sellableUnits: Units[];
    itemPrice:ItemPrice;
    itemIsSoledBatchWise:boolean;
}

export class ItemPrice{
    itemPriceId: number;
    clientId: number;
    priceMeasuredUnit: Units;
    pricePerUnit: number;
    createdBy: number;
    createdDate:Date;
    updatedBy: number;
    updatedDate: Date;
}

export class Brand{
    brandId: number;
    brandName: number;
    brandDescription:string;
    brandCreatedBy: number;
    brandCreatedDate: Date;
    brandUpdatedDate: Date;
    brandUpdatedBy: number;
    clientId: number;
}

export class Category{
    categoryId: number;
    categoryName: string;
    categoryDescription:string;
    categoryCreatedBy:number;
    categoryCreatedDate: Date;
    categoryUpdatedBy:number;
    categoryUpdatedDate: Date;
    clientId: number;
}

export class GrnItemAvailable{
    grnItemId: number;
    grn: GRN;
    buyingUnit:Units;
    grnItemClientId: number;
    grnItemBarcode: Barcode;
    grnItemQty: number;
    grnItemDiscountPercentage: number;
    grnItemDiscountPrice: number;
    grnItemBuyingPrice: number;
    grnItemNetPrice: number;
    grnItemPerUnitBuyingPrice: number;
    grnItemPerUnitSellingPrice: number;
    grnItemManDate: Date;
    grnItemExpDate: Date;
    soldQty: number;
    availableQty: number;
    grnItemDiscounts: Discount[];
    grnItemPrice:GRNItemPrice;
}

export class GRNItemPrice{
    grnItemPriceId: number;
    clientId: number;
    grnItemPriceMeasuredUnit: Units;
    pricePerUnit: number;
    createdBy: number;
    createdDate:Date;
    updatedBy: number;
    updatedDate:Date;
}

export class GRN{
    grnId:number;
    grnClientId:number;
    grnSupplierId:number;
    grnCreatedBy:number;
    grnCreatedDate: Date;
    grnTotalItemCount: number;
    grnTotalPrice: number;
    grnTotalNetPrice: number;
    grnTotalDiscountPrice: number;
    grnTotalDiscountPercentage: number;
    grnUpdatedBy: number;
    grnUpdatedDate: Date;
}

export class Item{

}

export class Barcode{
    barcodeId: number;
    barcodeValue:string;
    barcodeCreatedTime:Date;
    barcodeCreatedBy: number;
    clientId: number;
    barcodeUpdatedTime:Date;
    barcodeUpdatedBy: number;
}

export class GRNItemSummary{
    itemAvailableQty: number;
    unitDto: Units;
}

export class SalesItem{
    grn: GRN;
    qty: number;
    sellingPrice: number;
    perUnitSellingPrice: number;
    perUnitDiscount: number;
    discountAmount: number;
}