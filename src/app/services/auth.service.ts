import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, throwIfEmpty } from 'rxjs';
import { environment } from 'src/environments/environment';
import { auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL + 'utilisateurs/';
	}

  connect(form: any) :Observable<any> {
    return this.http
    .post (this.URL + 'connexion', form.value)
    .pipe (
      catchError(
        (error : HttpErrorResponse) => {
          if (error.status === 404)
            return throwError("User Not Found");
          return throwError("User Not Found");
        }
      )
    )
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('user');
    return (token) ? true : false;
  }
}
