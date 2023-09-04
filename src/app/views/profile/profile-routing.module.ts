import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileListeComponent } from './profile-liste/profile-liste.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ProfileListeComponent,
    data: {
      title: 'List des profiles',
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
