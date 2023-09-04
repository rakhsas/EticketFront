import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtListComponent } from './art-list/art-list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ArtListComponent,
    data: {
      title: 'iste des Arts',
    },
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Creer un Art',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtRoutingModule { }
