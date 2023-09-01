import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DepartementList } from './DepartementList/Departement.component';

const routes: Routes = [
  {
    path: 'Departement',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: DepartementList,
    data: {
      title: 'Departement List',
    },
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Add Departement',
    },
  },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementRoutingModule { }
