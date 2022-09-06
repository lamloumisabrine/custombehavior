
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AcpUiComponentModule, ComponentProviderOptions, DefaultLabelComponent, DefaultLinkComponent, DefaultNodeComponent, DefaultPortComponent, DiagramComponent, DiagramEngine, GraphModule } from 'acp-ui-component';
import { AppComponent } from './app.component';
import { HomeComponent } from './protected/home/home/home.component';
import { GraphStudioNodeComponent } from './protected/graph-studio/components/graph-studio-node/graph-studio-node.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ToastOptions } from 'acp-ui-component/lib/modules/toast/models/toast-config.model';
const appRoutes: Routes = [
  { path: 'protected/home', component: HomeComponent },
  ];


  const customToastOptions: ToastOptions = {
    position: {
      horizontal: {
        position: 'left',
        distance: 12,
      },
      vertical: {
        position: 'top',
        distance: 12,
        gap: 10,
      },
    },
    behaviour: {
      autoHide: 400,
      onClick: false,
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease',
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50,
      },
      shift: {
        speed: 300,
        easing: 'ease',
      },
      overlap: 150,
    },
  };

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AcpUiComponentModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    SharedModule,
    CoreModule,
 
  

    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule { }
