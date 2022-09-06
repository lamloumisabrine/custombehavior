import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GraphStudioTheme } from './graph-studio/graph-studio.module';
import { HomeModule } from './home/home.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
  ],
  imports: [
    HomeModule,
    SharedModule,
    GraphStudioTheme,
    FormsModule
    
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ProtectedModule { }
