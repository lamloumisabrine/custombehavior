import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ProtectedModule } from '../protected/protected.module';
import { PublicModule } from '../public/public.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ProtectedModule,
    PublicModule
  ]
})
export class CoreModule {

  /**

   * ensure that the CoreModule is imported only once

   * @param parentModule

   * @Optional indicate that a dependency is optional. If the dependency is left blank, then the null value is injected.

   * @SkipSelf tells Angular's dependency injection mechanism that resolution of this dependency should start from the parent injector.

   */

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

    if (parentModule) {

      throw new Error('CoreModule is already loaded.');

    }

  }



}
