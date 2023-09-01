import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClavierService {
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'clavier')
	}
	getClavier(id:Number): Observable<any>{
		return this.http.get(this.URL + 'clavier/' + id);
	}
	addClavier(form: any): Observable<any>{
		return this.http.post(this.URL + 'clavier', form);
	}
}
