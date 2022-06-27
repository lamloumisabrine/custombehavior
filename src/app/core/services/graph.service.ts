import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  nodeIds = {
    rulesetId : undefined,
    nodeId: undefined
  }
  sourceTarget = {
    source: undefined,
    target: undefined
  }
  public selectedNode : BehaviorSubject<any> = new BehaviorSubject(Object);
  public deleteNode : BehaviorSubject<any> = new BehaviorSubject(this.nodeIds);
  public deleteLink : BehaviorSubject<any> = new BehaviorSubject(Object);
  
}
