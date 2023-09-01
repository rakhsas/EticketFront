import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
  })
export class departementService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getDepartements():Observable<any> {
		return this.http.get(this.URL + 'departement')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'departement')
	}
	getDepartement(id: Number): Observable<any> {
		return this.http.get(this.URL + 'departements/' + id);
	}
	addDepartement(form: any): Observable<any> {
		return this.http.post(this.URL + 'departement', form);
	}
}