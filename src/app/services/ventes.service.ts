import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Caisse } from '../models/caisse';
import { ventes } from '../models/ventes';


@Injectable({
	providedIn: 'root'
  })
export class ventesService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getVentes():Observable<any> {
		return this.http.get(this.URL + 'ventes')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'ventes')
	}
	getVente(id:Number): Observable<any>{
		return this.http.get(this.URL + 'ventes/' + id);
	}
	addVente(form: any): Observable<any>{
		return this.http.post(this.URL + 'ventes', form);
	}
	updateVente(form: ventes): Observable<any> {
		return this.http.put(this.URL + 'ventes/' + form.idVente, form);
	  }
}