import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private URL: string;
  constructor( private http: HttpClient ) {
    this.URL = environment.apiURL;
  }
  getWorkflows():Observable<any>{
    return this.http.get(this.URL + 'workflow/getworkflow');
  }
  getData():Observable<any>{
    return this.http.get(this.URL + 'workflow/getworkflow');
  }
  getWorkflow(id: Number): Observable<any>{
    return this.http.get(this.URL + 'workflow/' + id);
  }
  addWorkflow(form: any):Observable<any>{
    return this.http.post(this.URL + 'workflow/save', form);
  }
}
