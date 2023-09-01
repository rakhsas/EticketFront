import { Component } from '@angular/core';

export const ROUTES = [
  {
    path: 'user',
    title: 'Utilisateurs',
    icon: 'fas fa-user me-2',
    children: [
      { path: 'list', title: 'All Users' }, // This corresponds to /dashboard/user/get
      { path: 'add', title: 'Create User' }, // This corresponds to /dashboard/user/add
    ]
  },
  {
    path: 'Departement',
    title: 'Departement',
    icon: 'fas fa-th-large me-2',
    children: [
      { path: 'list', title: 'Liste Des Departements'},
      { path: 'add', title: 'Create Departement'},
    ]
  },
  {
    path: 'Profile',
    title: 'Profile',
    icon: 'fas fa-th-large me-2',
    children: [
      { path: 'list', title: 'Liste Des Profiles'},
      { path: 'add', title: 'Creer Un Profile'},
    ]
  },
  {
    path: 'Caisse',
    title: 'Caisse',
    icon: 'fas fa-th-large me-2',
    children: [
      { path: 'list', title: 'Liste Des Caisses'},
      { path: 'add', title: 'Creer une caisse'}
    ]
  },
  {
    path: 'Workflow',
    title: 'Workflow',
    icon: 'fas fa-th-large me-2',
    children: [
      { path: 'list', title: 'Liste Des Workflow'},
      { path: 'add', title: 'Creer Un Workflow'},
    ]
  },
  {
    path: 'Art',
    title: 'Art',
    icon: 'fas fa-th-large me-2',
    children: [
      { path: 'list', title: 'Liste Des Articles'},
      { path: 'add', title: 'Creer Un Article'},
    ]
  },
  {
    path: 'Hist',
    title: 'Hist',
    icon: 'fas fa-th-large me-2',
    children: [
      { path: 'list', title: 'Liste Des Hist'},
      { path: 'add', title: 'Creer un Hist'}
    ]
  },
  {
    path: 'Clavier',
    title: 'Clavier',
    icon: 'fas fa-th-large me-2',
    children: [
      { path: 'list', title: 'Liste Des Claviers'},
      { path: 'add', title: 'Ajouter Une Clavier'}
    ]
  },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  menuItems!: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
