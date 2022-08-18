import { Compare } from "./compare.model";
import { Action } from "./ruleset/action.model";
export class Condition {
  [x: string]: any;

   
    conditionId?: string;
    
    conditionDisplay?:string;

    parentID?:string;

    logicalOperator?: string;

    notOperator?: boolean;


   custombehaviorId?:string;
   

    compares: Compare[];
    conditions : Condition[];
    actions: Action[];
    constructor(){
      this.compares = [];
      this.conditions = [];
      this.actions=[];
    }
}