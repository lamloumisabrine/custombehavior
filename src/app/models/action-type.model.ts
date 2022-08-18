import { Action } from "./ruleset/action.model";

export class Actiontype {


    actionTypeId?:string;
    actionTypeDisplay?:string;
    actionTypeShortName?:string;
    actions : Action[];

    constructor(){
        this.actions = [];
    }
}