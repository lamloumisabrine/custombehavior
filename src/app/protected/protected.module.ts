import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GraphStudioTheme } from './graph-studio/graph-studio.module';
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [
  ],
  imports: [
    HomeModule,
    SharedModule,
    GraphStudioTheme
    
    
  ],
})
export class ProtectedModule { }
