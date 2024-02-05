import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowTerritoriesComponent } from './pages/show-territories/show-territories.component';

const routes: Routes = [
  {
    path: '',
    component: ShowTerritoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerritoryRoutingModule {}
