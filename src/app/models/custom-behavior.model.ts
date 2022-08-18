import { Condition } from "./condition.model";

export class Custombehavior {

    CustomBehaviorID? :string;
    
    CustomBehaviorShortName : string | undefined;

    conditions : Condition[];

    constructor(){
        this.conditions = [];
    }
}