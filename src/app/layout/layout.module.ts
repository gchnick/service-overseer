import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiNavdrawerComponent } from '@nikosoftware/core-ui';
import { LayoutRoutingModule } from './layout.routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [LayoutComponent, NotFoundComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    RouterModule,
    UiNavdrawerComponent,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
