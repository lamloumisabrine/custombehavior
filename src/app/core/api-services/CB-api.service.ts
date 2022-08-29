import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Custombehavior } from 'src/app/models/custom-behavior.model';

@Injectable({
  providedIn: 'root'
})
export class CBApiService {


readonly CustombehaviorUrl = "https://localhost:44320/";

  constructor(private http: HttpClient) { }
 /** 
  @param {string} customBehaviorID
  @returns
*/
  getActionTypeList(): Observable<any[]> {
    return this.http.get<any>(this.CustombehaviorUrl + "api/ActionType/GetActionType");
  }

 
  getLHS(): Observable<any[]>{
    return this.http.get<any>(this.CustombehaviorUrl+"api/LHS/GetLHSs")
  }
  
  updateCondition (id:number|string,data:any){
    return this.http.put(this.CustombehaviorUrl +"api/Conditions/UpdateCondition/${ConditionID}",data);
  }

  updateAction (id:number|string,data:any){
    return this.http.put(this.CustombehaviorUrl +"api/Action/UpdateAction/${ActionID}",data);
  }

  getConditionsList():Observable<any[]>{
    return this.http.get<any>(this.CustombehaviorUrl + "api/Conditions/GetConditions");
  }
  getConditionsbyCustomBehavior(customBehaviorID:string):Observable<{}>{
    return this.http.get<any>(this.CustombehaviorUrl +"api/Conditions/GetConditionsByCustomBehavior/{CustomBehaviorID}"+customBehaviorID);
  }

  addCondition (data :any){
  return this.http.post (this.CustombehaviorUrl +"api/Conditions/AddCondition",data)
  }

  addAction (data:any){
  return this.http.post (this.CustombehaviorUrl +"api/Action/AddAction" ,data)
  }

  addcompare (data:any){
  return this.http.post(this.CustombehaviorUrl +"/api/Compare/GetCompare" , data)
  }

  addLHS (data:any) {
  return this.http.post (this.CustombehaviorUrl +"api/LHS/AddLHS" , data)
  } 

  addRHS(data:any){
  return this.http.post (this.CustombehaviorUrl +"api/RHS/AddRHS" , data)
  }

}
