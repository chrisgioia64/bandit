import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  // baseUrl : string = "http://bandit-env-5.eba-f2jzcegz.us-east-1.elasticbeanstalk.com:8080/";
  baseUrl : string = "http://localhost:8080/";

  baseHeaders : HttpHeaders = new HttpHeaders().set('Cache-Control', 'no-cache');
  
  // baseUrl : string = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  getExperiments() {
    let path = "getExperiments";
    let url = this.baseUrl + path;
    return this.http.get<any>(url, {  headers: this.baseHeaders })
  }

  getExperimentById(id : number) {
    let path = "getExperimentById/";
    let url = this.baseUrl + path + id;
    
    return this.http.get<any>(url, {  headers: this.baseHeaders })
  }

}
