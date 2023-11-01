import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	model = new auth();
	errorMessage: string = null;
	year: any;
	constructor(
		private authService: AuthService,
		private router: Router
		) {
			this.year = (new Date()).getFullYear()
		}
	onSubmit(form: any) {
		this.authService.connect(form).subscribe(
		  (response) => {
			console.log('Response', response);
			localStorage.setItem('user', JSON.stringify(response));
			this.router.navigate(['/dashboard']);
		  },
		  (error) => {
			console.log('Error', error);
			this.errorMessage = error;
		  }
		);
	  }
	  
}
