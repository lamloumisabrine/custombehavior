import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcpUiComponentModule } from 'acp-ui-component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConditionComposerComponent } from './components/condition-composer/condition-composer.component';
import { ConditionComponent } from './components/condition/condition.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { IconTypePipe } from './pipes/icon-type.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';




@NgModule({
  declarations: [
    ConditionComponent,
    ConditionComposerComponent,
    ToolbarComponent,
    IconTypePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AcpUiComponentModule,
    DragDropModule,
    NgbModule,

  ],
  exports: [
    CommonModule,
    AcpUiComponentModule,
    ConditionComponent,
    ConditionComposerComponent,
    ToolbarComponent
  ]
})
export class SharedModule { }
