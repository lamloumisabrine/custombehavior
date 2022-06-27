import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ComponentProviderOptions, GraphModule } from 'acp-ui-component';
import { GraphStudioLabelComponent } from '../graph-studio/components/graph-studio-label/graph-studio-label.component';
import { GraphStudioLinkComponent } from '../graph-studio/components/graph-studio-link/graph-studio-link.component';
import { GraphStudioNodeComponent } from '../graph-studio/components/graph-studio-node/graph-studio-node.component';
import { GraphStudioPortComponent } from '../graph-studio/components/graph-studio-port/graph-studio-port.component';

const DEFAULTS: ComponentProviderOptions[] = [
  {
    type: 'node',
    component: GraphStudioNodeComponent,
  },
  {
    type: 'port',
    component: GraphStudioPortComponent,
  },
  {
    type: 'link',
    component: GraphStudioLinkComponent,
  },
  {
    type: 'label',
    component: GraphStudioLabelComponent,
  },
];
@NgModule({
  declarations: [
    HomeComponent,
    
  ],
  imports: [
    SharedModule,
    DragDropModule,
    BrowserModule,
    HttpClientModule,
    GraphModule.withComponents(DEFAULTS)
 
  ]
})
export class HomeModule { }
