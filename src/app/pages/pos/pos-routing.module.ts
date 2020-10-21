import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { POSComponent } from './pos.component';
import { InventryComponent } from './inventry/inventry.component';
import { GrnComponent } from './grn/grn.component';
import { StockComponent } from './stock/stock.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [{
  path: '',
  component: POSComponent,
  children: [
    {
      path: 'inventry',
      component: InventryComponent,
    },
    {
      path: 'grn',
      component: GrnComponent,
    },
    {
      path: 'stock',
      component: StockComponent,
    },
    {
      path: 'report',
      component: ReportsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
