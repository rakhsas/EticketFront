import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Art } from '../models/art';


@Injectable({
	providedIn: 'root'
  })
export class categorieArticleService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getCategories():Observable<any> {
		return this.http.get(this.URL + 'categories')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'categories')
	}
	getCategorie(id:Number): Observable<any>{
		return this.http.get(this.URL + 'categories/' + id);
	}
	addCategorie(form: Art): Observable<any>{
		return this.http.post(this.URL + 'categories', form);
	}
	updateCategorie(form: Art): Observable<any> {
		return this.http.put(this.URL + 'categories/' + form.idart, form);
	}
}