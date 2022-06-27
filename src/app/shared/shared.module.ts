import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcpUiComponentModule } from 'acp-ui-component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AcpUiComponentModule,
    NgbModule

  ],
  exports: [
    CommonModule,
    AcpUiComponentModule
  ]
})
export class SharedModule { }
