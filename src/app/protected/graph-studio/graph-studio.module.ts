import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcpUiComponentModule, ComponentProviderOptions, GraphModule } from 'acp-ui-component';
import { GraphStudioNodeComponent } from './components/graph-studio-node/graph-studio-node.component';
import { GraphStudioLabelComponent } from './components/graph-studio-label/graph-studio-label.component';
import { GraphStudioLinkComponent } from './components/graph-studio-link/graph-studio-link.component';
import { GraphStudioPortComponent } from './components/graph-studio-port/graph-studio-port.component';


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
  imports: [CommonModule, GraphModule.withComponents(GHWorkflowTheme),AcpUiComponentModule],
  entryComponents: [...COMPONENTS],
  exports: [...COMPONENTS, GraphModule],
})
export class GraphStudioTheme {

  
}
