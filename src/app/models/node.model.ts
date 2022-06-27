import { Port } from "./port.model";

export class Node {

    x: number;
    y: number;

    ports: Port[];

    constructor() {
        this.x = 500;
        this.y = 500;
        this.ports = [];
    }
}