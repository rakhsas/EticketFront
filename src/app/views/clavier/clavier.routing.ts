import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClavierlistComponent } from './clavierlist/clavierlist.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ClavierlistComponent,
    data: {
      title: 'Clavier List',
    },
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Clavier List',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClavierRoutingModule { }
