import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CBApiService {


readonly CustombehaviorUrl = "https://localhost:44320/";

  constructor(private http: HttpClient) { }

  getActionTypeList(): Observable<any[]> {
    return this.http.get<any>(this.CustombehaviorUrl + "/ActionType/GetActionType");
  }
  
  
}
