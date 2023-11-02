import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'territory',
    loadChildren: () =>
      import('../modules/territory/territory.module').then(
        m => m.TerritoryModule
      ),
  },
  {
    path: '**',
    data: { title: 'Página no encontrada' },
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
