import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
  })
export class typeDepartementService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getTypeDepartements():Observable<any> {
		return this.http.get(this.URL + 'typeDepartements')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'typeDepartements')
	}
	getTypeDepartement(id: Number): Observable<any> {
		return this.http.get(this.URL + 'typeDepartements/' + id);
	}
	addTypeDepartement(form: any): Observable<any> {
		return this.http.post(this.URL + 'typeDepartements', form);
	}
}