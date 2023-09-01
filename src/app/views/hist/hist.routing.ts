import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistListComponent } from './hist-list/hist-list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: 'Hist',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: HistListComponent,
    data: {
      title: 'Hist List',
    },
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Creer un hist',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistRoutingModule { }
