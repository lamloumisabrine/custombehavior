import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  onChangeScreen:BehaviorSubject<any>=new BehaviorSubject({})
  onChangeComponents:BehaviorSubject<any>=new BehaviorSubject([])
  onChangeAction:BehaviorSubject<any>=new BehaviorSubject("")

  constructor() { }
  getScreen(data:any):Observable<any>{
    this.onChangeScreen.next(data)
    return this.onChangeScreen.asObservable()
  }
  getComponents(data:any):Observable<any>{
    this.onChangeComponents.next(data)
    return this.onChangeComponents.asObservable()
  }
  getAction(data:any):Observable<any>{
    console.log(data)
    this.onChangeAction.next(data)
    return this.onChangeAction.asObservable()
  }
}
