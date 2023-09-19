import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Caisse } from '../models/caisse';


@Injectable({
	providedIn: 'root'
  })
export class clientService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getClients():Observable<any> {
		return this.http.get(this.URL + 'clients')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'clients')
	}
	getClient(id:Number): Observable<any>{
		return this.http.get(this.URL + 'clients/' + id);
	}
	addClient(form: any): Observable<any>{
		return this.http.post(this.URL + 'clients', form);
	}
	updateClient(form: Caisse): Observable<any> {
		return this.http.put(this.URL + 'clients' + form.caisseId, form);
	  }
}