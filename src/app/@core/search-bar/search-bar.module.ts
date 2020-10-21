import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar.component';



@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTypeaheadModule
  ],
  exports:[SearchBarComponent]
})
export class SearchBarModule { }
