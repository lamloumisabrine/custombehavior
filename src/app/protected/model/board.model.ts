import { Column } from "./column.model";


export class Board {
    getWidth() {
      throw new Error('Method not implemented.');
    }
    find(arg0: (collib: { name: string; }) => boolean) {
      throw new Error('Method not implemented.');
    }
    constructor(public name: string, 
                public columns: Column[]) 
    {}
}