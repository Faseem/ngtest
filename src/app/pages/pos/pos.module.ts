import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { InventryComponent } from './inventry/inventry.component';
import { GrnComponent } from './grn/grn.component';
import { StockComponent } from './stock/stock.component';
import { ReportsComponent } from './reports/reports.component';
import { POSComponent } from './pos.component';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbDialogModule,
  NbWindowModule,
  NbTabsetModule,
  NbPopoverModule,
  NbTooltipModule,
} from '@nebular/theme';
import { SearchBarModule } from '../../@core/search-bar/search-bar.module';
import { DataPaginationModule } from '../../@core/data-pagination/data-pagination.module';
import { SalesItemConfComponent } from './sales-item-conf/sales-item-conf.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { ModalOverlaysRoutingModule } from '../modal-overlays/modal-overlays-routing.module';


@NgModule({
  declarations: [
    POSComponent,
    InventryComponent,
     GrnComponent, 
     StockComponent, 
     ReportsComponent, 
     SalesItemConfComponent],
  entryComponents: [
    SalesItemConfComponent
  ],
  imports: [
  CommonModule,
  PosRoutingModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  SearchBarModule,
  DataPaginationModule,
  FormsModule,
  ThemeModule,
  ModalOverlaysRoutingModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCardModule,
  NbCheckboxModule,
  NbTabsetModule,
  NbPopoverModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule,
  ]
})
export class PosModule { }
