import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPaginationComponent } from './data-pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DataPaginationComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[DataPaginationComponent]
})
export class DataPaginationModule { }
