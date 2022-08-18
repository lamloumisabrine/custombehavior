import { Component } from "../component.model";
import { Assert } from "./assert.model";

export class Action {

   actionid?: string;

   actionDisplay?:string ;

   value?: string ;
    
    actionTypeId?: string;

    componentId? :string;

    conditionId?:string;
    components : Component[];

    constructor(){
        this.components = [];
    }
   

}