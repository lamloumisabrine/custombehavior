import { HandSide } from "./hand-side.model";
import { LeftHandSide } from "./left-hand-side.model";
import { RightHandSide } from "./right-hand-side.model";

export class Compare {

 
    compareid?: string;
   
    operator?: string;
  
    leftHandSide?: HandSide;
  
    rightHandSide?: HandSide;
    
    notOperator?: boolean;

 
    conditionId?: string;
    lhs : LeftHandSide[];
    rhs : RightHandSide[];

    constructor(){
        this.leftHandSide=new HandSide()
        this.rightHandSide=new HandSide()
        this.lhs = [];
        this.rhs = [];
    }
}