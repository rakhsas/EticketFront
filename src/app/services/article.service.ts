import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Art } from '../models/art';
import { article } from '../models/article';


@Injectable({
	providedIn: 'root'
  })
export class articleService{
	URL: string;
	constructor( private http: HttpClient ) {
		this.URL = environment.apiURL;
	}
	getArticles():Observable<any> {
		return this.http.get(this.URL + 'articles')
	}
	getData():Observable<any> {
		return this.http.get(this.URL + 'articles')
	}
	getArticle(id:Number): Observable<any>{
		return this.http.get(this.URL + 'articles/' + id);
	}
	addArticle(form: article): Observable<any>{
		return this.http.post(this.URL + 'articles', form);
	}
	updateArticles(form: article): Observable<any> {
		return this.http.put(this.URL + 'articles/' + form.idArticle, form);
	}
}