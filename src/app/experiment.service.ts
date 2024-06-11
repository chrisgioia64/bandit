import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  baseUrl : string = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  getExperiments() {
    let path = "getExperiments";
    let url = this.baseUrl + path;
    return this.http.get<any>(url)
  }

  getExperimentById(id : number) {
    let path = "getExperimentById/";
    let url = this.baseUrl + path + id;
    return this.http.get<any>(url);
  }

}
