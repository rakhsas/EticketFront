import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement';
import { email } from '../models/email';


@Injectable({
	providedIn: 'root'
  })
export class emailService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	sendMail(form: any): Observable<string> {
		return this.http.post<string>(this.URL + 'email/send', form);
	}

}