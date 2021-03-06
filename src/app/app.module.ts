
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AcpUiComponentModule, ComponentProviderOptions, DefaultLabelComponent, DefaultLinkComponent, DefaultNodeComponent, DefaultPortComponent, DiagramComponent, DiagramEngine, GraphModule } from 'acp-ui-component';
import { AppComponent } from './app.component';
import { HomeComponent } from './protected/home/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { RulesetComponent } from './protected/ruleset/ruleset.component';
const appRoutes: Routes = [
  { path: 'protected/home', component: HomeComponent },
  {path:'protected/ruleset', component:RulesetComponent}


  ];

@NgModule({
  declarations: [
    AppComponent
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
    CoreModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
