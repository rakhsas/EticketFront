import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Art } from '../models/art';


@Injectable({
	providedIn: 'root'
  })
export class artService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getArts():Observable<any> {
		return this.http.get(this.URL + 'arts')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'arts')
	}
	getArt(id:Number): Observable<any>{
		return this.http.get(this.URL + 'arts/' + id);
	}
	addArt(form: Art): Observable<any>{
		return this.http.post(this.URL + 'arts', form);
	}
	updateArt(form: Art): Observable<any> {
		return this.http.put(this.URL + 'arts/' + form.idart, form);
	}
}