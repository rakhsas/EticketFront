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
	@Input() status?: boolean;
	@Output() toggleStatus: EventEmitter<void> = new EventEmitter<void>();
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private cdr: ChangeDetectorRef
	) {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		  ).subscribe(() => {
			this.pageTitle = this.getPageTitle(this.activatedRoute.root);
			this.cdr.detectChanges();
		  });
	}
	ngOnInit(): void {

	}
	private getPageTitle(route: ActivatedRoute): string {
		while (route.firstChild) {
			route = route.firstChild;
		}
		return route.snapshot.data['title'] || 'Dashboard'; // Use 'Dashboard' as default
	}
}
