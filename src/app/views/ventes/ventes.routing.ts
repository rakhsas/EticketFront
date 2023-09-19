import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add',
    pathMatch: 'full',
  },
//   {
//     path: 'list',
//     component: UsersListComponent,
//     data: {
//       title: 'User List',
//     },
//   },
  {
    path: 'add',
    component: AddComponent
  },
  // Add more child routes as needed
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentesRoutingModule { }
