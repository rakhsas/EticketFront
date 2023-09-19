import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable} from 'rxjs';
import { User } from '../models/user';
import { encaissement } from '../models/encaissement';

@Injectable({
  providedIn: 'root'
})
export class EncaissementService {

  private URL: string
  constructor(private http: HttpClient,
  ) {
	this.URL = environment.apiURL;
  }
  // login(form:User):Observable<any>{
  //   return this.http.post(this.URL + 'api/auth/login', form);
  // }
  // register(form:register):Observable<any> {
  //   return this.http.post(this.URL + 'api/auth/register', form );
  // }
  getData(): Observable<any> {
	  return this.http.get(this.URL + 'encaissements');
  }
  getEncaissements(): Observable<any> {
	  return this.http.get(this.URL + 'encaissements');
  }
  getEncaissement(id: Number): Observable<any> {
	  return this.http.get(this.URL + 'encaissements/' + id);
  }
  addEncaissement(form: any): Observable<any> {
	  return this.http.post(this.URL + 'encaissements', form);
  }
  updateEncaissement(form: encaissement): Observable<any> {
    return this.http.put(this.URL + 'encaissements/' + form.idEncaissement, form);
  }

}
