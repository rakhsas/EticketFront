import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Caisse } from '../models/caisse';

export interface WeatherResponse {
latitude: number;
longitude: number;
time: Date[];
temperature_2m: number[];
hourly: string[];
}

@Injectable({
	providedIn: 'root'
  })


export class dashboardService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getData():Observable<any> {
		return this.http.get<WeatherResponse>("https://api.open-meteo.com/v1/forecast?latitude=34.0132&longitude=-6.8326&hourly=temperature_2m");
	}
	getAbonnements():Observable<any> {
		return this.http.get(this.URL + 'abonnement');
	}
}