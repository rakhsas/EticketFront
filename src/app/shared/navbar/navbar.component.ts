import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	NgZone,
	Output,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	pageTitle: string = '';
	currentPath: string = '';
	@Input() status?: boolean;
	@Output() toggleStatus: EventEmitter<void> = new EventEmitter<void>();
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private cdr: ChangeDetectorRef,
	) {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		).subscribe(() => {
			this.pageTitle = this.getPageTitle(this.activatedRoute.root);
			this.currentPath = this.getCurrentPath(this.activatedRoute.root);
			// console.log(this.currentPath)
			this.cdr.detectChanges();
		});
	}
	ngOnInit(): void {

	}
	logout() {
		if (localStorage.getItem('user'))
			localStorage.removeItem('user');
		this.router.navigate(['/login'])
	}
	private getPageTitle(route: ActivatedRoute): string {
		let currentRoute = route;
		while (currentRoute.firstChild) {
		  currentRoute = currentRoute.firstChild;
		}
		return currentRoute.snapshot.data['title'] || 'Dashboard';
	}
	private getCurrentPath(route: ActivatedRoute): string {
		const segments: string[] = [];
		while (route) {
		  segments.push(...route.snapshot.url.map(segment => segment.path));
		  route = route.firstChild;
		}
		return `/${segments.join('/')}`;
	  }
}
