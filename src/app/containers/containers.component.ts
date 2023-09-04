import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
	selector: 'app-containers',
	templateUrl: './containers.component.html',
	styleUrls: ['./containers.component.css']
})

export class ContainersComponent {
	title = 'eticket-front';
	currentPath: string = '';
	pageTitle: string = '';
	status: boolean = false;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private cdr: ChangeDetectorRef) {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		).subscribe(() => {
			this.pageTitle = this.getPageTitle(this.activatedRoute.root);
			this.currentPath = this.getCurrentPath(this.activatedRoute.root);
			this.cdr.detectChanges();
		});
	}
	addToggle() {
		this.status = !this.status;
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
