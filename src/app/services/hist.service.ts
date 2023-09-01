import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HistGesaur } from '../models/histgesaur';


@Injectable({
	providedIn: 'root'
  })
export class HistService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getHists():Observable<any> {
		return this.http.get(this.URL + 'histgesaur')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'histgesaur')
	}
	getHist(id:Number): Observable<any>{
		return this.http.get(this.URL + 'histgesaur/' + id);
	}
	addHist(form: any): Observable<any>{
		return this.http.post(this.URL + 'histgesaur', form);
	}
	updateHist(form: HistGesaur): Observable<any> {
		return this.http.put(this.URL + 'histgesaur/' + form.nligne, form);
	}
}