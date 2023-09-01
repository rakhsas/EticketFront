import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Profil } from '../models/profil';


@Injectable({
	providedIn: 'root'
  })
export class profileService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getProfiles():Observable<any> {
		return this.http.get(this.URL + 'profil/getProfils')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'profil/getProfils')
	}
	getProfile(id: Number): Observable<any> {
		return this.http.get(this.URL + 'profil/' + id);
	}
	addProfile(form: any): Observable<any> {
		return this.http.post(this.URL + 'profil/save', form);
	}
	updateProfile(form: Profil): Observable<any> {
		return this.http.put(this.URL + 'profil/update/' + form.profilId, form);
	  }
}