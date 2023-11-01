import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService,
		) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if ( this.authService.isAuthenticated() )
			return true;
		else {
			this.router.navigate(['login']);
			return false;
		}
	}
}