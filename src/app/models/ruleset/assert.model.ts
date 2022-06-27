import { ActionHandSide } from "./action-hand-side.model";

export class Assert {

    /**
     * left hand side value
     */
    leftHandSide?: ActionHandSide;
    /**
     * right hand side value
     */
    rightHandSide?: ActionHandSide;

    constructor(){
        this.leftHandSide = new ActionHandSide();
        this.rightHandSide = new ActionHandSide();
    }
}