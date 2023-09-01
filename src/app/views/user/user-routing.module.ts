import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainersComponent } from 'src/app/containers/containers.component';
import { UsersListComponent } from './UsersList/UsersList.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: 'user',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: UsersListComponent,
    data: {
      title: 'User List',
    },
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Add User',
    },
  },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
