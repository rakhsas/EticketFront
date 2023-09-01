import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: 'Workflow',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: WorkflowListComponent,
    data: {
      title: 'List Des Workflow',
    },
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Creer un Workflow',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
