import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Caisse } from '../models/caisse';


@Injectable({
	providedIn: 'root'
  })
export class modePaiementService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getModePaiements():Observable<any> {
		return this.http.get(this.URL + 'modePaiements')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'modePaiements')
	}
	getModePaiement(id:Number): Observable<any>{
		return this.http.get(this.URL + 'modePaiements/' + id);
	}
	addModePaiement(form: any): Observable<any>{
		return this.http.post(this.URL + 'modePaiements', form);
	}
	updateModePaiement(form: Caisse): Observable<any> {
		return this.http.put(this.URL + 'modePaiements/' + form.caisseId, form);
	  }
}