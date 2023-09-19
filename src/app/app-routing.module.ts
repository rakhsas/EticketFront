import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UserModule } from './views/user/user.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContainersComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
      ,
      {
        path: 'user',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
      },
      {
        path: 'Departement',
        loadChildren: () => import('./views/departement/departement.module').then(m => m.DepartementModule)
      },
      {
        path: 'Profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'Caisse',
        loadChildren: () => import('./views/caisses/caisses.module').then(m => m.CaissesModule)
      },
      {
        path: 'Workflow',
        loadChildren: () => import('./views/workflow/workflow.module').then(m => m.WorkflowModule)
      },
      {
        path: 'Art',
        loadChildren: () => import('./views/art/art.module').then(m => m.ArtModule)
      },
      {
        path: 'Hist',
        loadChildren: () => import('./views/hist/hist.module').then(m => m.HistModule)
      },
      {
        path: 'Clavier',
        loadChildren: () => import('./views/clavier/clavier.module').then(m => m.ClavierModule)
      },
      {
        path: 'Client',
        loadChildren: () => import('./views/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'Encaissement',
        loadChildren: () => import('./views/encaissement/encaissement.module').then(m => m.EncaissementModule)
      },
      {
        path: 'Vente',
        loadChildren: () => import('./views/ventes/ventes.module').then(m => m.VentesModule)
      }
    ]
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
