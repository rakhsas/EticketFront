import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaisseListComponent } from './caisse-list/caisse-list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: CaisseListComponent,
    data: {
      title: 'List des Caisses',
    },
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Creer Une Caisse',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaissesRoutingModule { }
