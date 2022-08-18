import { LeftHandSide } from "./left-hand-side.model";

export class Component {
    
    componentId?:string;

    componentDisplay?:string;
    
    componentType?: 'field' | 'fieldset' | 'grid' | 'compositgroup';
    lhs : LeftHandSide[];
    constructor(){
        this.lhs = [];
}
}