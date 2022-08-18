import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicySetService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  POLICY_SET_PATH = "policySet";

  constructor(private http: HttpClient) { }

  /**
   * It returns an array of Policy objects.
   * @returns An array of Policy objects.
   */
  
}
