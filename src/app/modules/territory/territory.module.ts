import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { TerritoryNode } from './adapters/territory-node';
import { ShowTerritoriesComponent } from './pages/show-territories/show-territories.component';
import { TerritoryCardComponent } from './pages/territory-card/territory-card.component';
import { TerritoryDetailsComponent } from './pages/territory-details/territory-details.component';
import { TerritoryFormComponent } from './pages/territory-form/territory-form.component';
import { TerritoryService } from './services/territory.service';
import { TerritoryRoutingModule } from './territory-routing.module';

@NgModule({
  declarations: [ShowTerritoriesComponent],
  imports: [
    CommonModule,
    TerritoryRoutingModule,
    TerritoryCardComponent,
    TerritoryDetailsComponent,
    TerritoryFormComponent,
    HttpClientModule,
  ],
  providers: [{ useClass: TerritoryNode, provide: TerritoryService }],
})
export class TerritoryModule {}
