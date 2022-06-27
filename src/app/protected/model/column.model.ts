export class Column {
    static getWidth() {
      throw new Error('Method not implemented.');
    }
    constructor(public name: string, 
                public tasks: string[]) 
    {}
  }