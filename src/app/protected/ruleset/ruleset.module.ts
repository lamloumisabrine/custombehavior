import { NgModule } from '@angular/core';
import { RulesetRoutingModule } from './ruleset-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RulesetComponent } from './ruleset.component';
import { AcpUiComponentModule } from 'acp-ui-component';
import { CompareComponent } from './components/compare/compare.component';
import { ConditionComponent } from './components/condition/condition.component';



@NgModule({
  declarations: [
    RulesetComponent,
    CompareComponent,
    ConditionComponent
  ],
  imports: [
    SharedModule,
    RulesetRoutingModule,
    AcpUiComponentModule
  ]
})
export class RulesetModule { }
