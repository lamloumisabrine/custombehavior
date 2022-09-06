import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcpUiComponentModule, ComponentProviderOptions, GraphModule } from 'acp-ui-component';
import { GraphStudioNodeComponent } from './components/graph-studio-node/graph-studio-node.component';
import { GraphStudioLabelComponent } from './components/graph-studio-label/graph-studio-label.component';
import { GraphStudioLinkComponent } from './components/graph-studio-link/graph-studio-link.component';
import { GraphStudioPortComponent } from './components/graph-studio-port/graph-studio-port.component';
import { ConditionComposerComponent } from 'src/app/shared/components/condition-composer/condition-composer.component';
import { SharedModule } from 'src/app/shared/shared.module';


const GHWorkflowTheme: ComponentProviderOptions[] = [
  {
    type: 'node',
    component: GraphStudioNodeComponent,
    namespace: 'graph-studio',
  },
  {
    type: 'port',
    component: GraphStudioPortComponent,
    namespace: 'graph-studio',
  },
  {
    type: 'link',
    component: GraphStudioLinkComponent,
    namespace: 'graph-studio',
  },
  {
    type: 'label',
    component: GraphStudioLabelComponent,
    namespace: 'graph-studio',
  },
];

const COMPONENTS = [
  GraphStudioNodeComponent,
  GraphStudioPortComponent,
  GraphStudioLinkComponent,
  GraphStudioLabelComponent,
  

];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [SharedModule,CommonModule, GraphModule.withComponents(GHWorkflowTheme), AcpUiComponentModule],
    exports: [...COMPONENTS, GraphModule],
    schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class GraphStudioTheme {

  
}
