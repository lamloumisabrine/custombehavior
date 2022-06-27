import { Compare } from "./compare.model";
export class Condition {
  [x: string]: any;

   
    conditionId?: string;
    
    conditionDisplay?:string;

    parentID?:string;

    logicalOperator?: string;
  
   custombehaviorId?:string;

    compares: Compare[];
    conditions : Condition[];
    constructor(){
      this.compares = [];
      this.conditions = [];
    }
}