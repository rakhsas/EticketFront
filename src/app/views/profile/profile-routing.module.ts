import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileListeComponent } from './profile-liste/profile-liste.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: 'Profile',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ProfileListeComponent,
    data: {
      title: 'Profile List',
    },
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Creer Un Profile',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
