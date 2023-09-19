import { Component } from '@angular/core';

export const ROUTES = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'bi bi-grid',

  },
  {
    path: 'user',
    title: 'Utilisateurs',
    icon: 'bi bi-people',
    children: [
      { path: 'list', title: 'All Users', icon: 'bi bi-person-lines-fill' }, // This corresponds to /dashboard/user/get
      { path: 'add', title: 'Create User',icon: 'bi bi-person-plus' }, // This corresponds to /dashboard/user/add
    ]
  },
  {
    path: 'Departement',
    title: 'Departement',
    icon: 'bi bi-archive',
    children: [
      { path: 'list', title: 'Liste Des Departements', icon: 'bi bi-list'},
      { path: 'add', title: 'Create Departement', icon: 'bi bi-plus-square-fill'},
    ]
  },
  {
    path: 'Profile',
    title: 'Profile',
    icon: 'bi bi-pie-chart',
    children: [
      { path: 'list', title: 'Liste Des Profiles', icon: 'bi bi-list'},
      { path: 'add', title: 'Creer Un Profile', icon: 'bi bi-plus-square-fill'},
    ]
  },
  {
    path: 'Caisse',
    title: 'Caisse',
    icon: 'bi bi-box',
    children: [
      { path: 'list', title: 'Liste Des Caisses', icon: 'bi bi-list'},
      { path: 'add', title: 'Creer une caisse', icon: 'bi bi-plus-square-fill'}
    ]
  },
  {
    path: 'Workflow',
    title: 'Workflow',
    icon: 'bi bi-hdd-network',
    children: [
      { path: 'list', title: 'Liste Des Workflow', icon: 'bi bi-list'},
      { path: 'add', title: 'Creer Un Workflow', icon: 'bi bi-plus-square-fill'},
    ]
  },
  {
    path: 'Art',
    title: 'Art',
    icon: 'bi bi-file-earmark-medical',
    children: [
      { path: 'list', title: 'Liste Des Articles', icon: 'bi bi-list'},
      { path: 'add', title: 'Creer Un Article', icon: 'bi bi-plus-square-fill'},
    ]
  },
  {
    path: 'Hist',
    title: 'Hist',
    icon: 'bi bi-hourglass-top',
    children: [
      { path: 'list', title: 'Liste Des Hist', icon: 'bi bi-list'},
      { path: 'add', title: 'Creer un Hist', icon: 'bi bi-plus-square-fill'}
    ]
  },
  {
    path: 'Clavier',
    title: 'Clavier',
    icon: 'bi bi-keyboard',
    children: [
      { path: 'list', title: 'Liste Des Claviers', icon: 'bi bi-list'},
      { path: 'add', title: 'Ajouter Une Clavier', icon: 'bi bi-plus-square-fill'}
    ]
  },
  {
    path: 'Client',
    title: 'Client',
    icon: 'bi bi-keyboard',
    children: [
      { path: 'list', title: 'Liste Des Clients', icon: 'bi bi-list'},
      { path: 'add', title: 'Ajouter Un Client', icon: 'bi bi-plus-square-fill'}
    ]
  },
  {
    path: 'Encaissement',
    title: 'Encaissement',
    icon: 'bi bi-keyboard',
    children: [
      { path: 'list', title: 'Liste Des Encaissement', icon: 'bi bi-list'},
      { path: 'add', title: 'Ajouter Un Encaissement', icon: 'bi bi-plus-square-fill'}
    ]
  },
  {
    path: 'Vente',
    title: 'Ventes',
    icon: 'bi bi-person',
    children: [
      // { path: 'list', title: 'Liste Des Encaissement', icon: 'bi bi-list'},
      { path: 'add', title: 'Ajouter Vente', icon: 'bi bi-plus-square-fill'}
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
  selectedMenuItem: string | null = null; // Initialize with null as no item is selected initially
  hoveredMenuItem: string | null = null;
  // Function to handle menu item selection
  selectMenuItem(menuPath: string) {
    this.selectedMenuItem = menuPath;
  }
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
