import { Action } from "./action.model";
import { Condition } from "../condition.model";

export class Rule  {

  id? : string;
  /**
   * Rule description
   */
  description?: string;
  
  /**
    * List of conditions
    */
  when?: Condition;
  /**
   * List of actions
   */
  then?: Action[];
  /**
   * check rule saved or not
   * in frontend only
   */
  state? :boolean
  constructor() {
    this.description = ""
    this.then = [];
  }
}