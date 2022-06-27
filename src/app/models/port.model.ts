export class Port {
    id?: string;
    targets: string[] = [];
    constructor() {
        this.targets = [];
    }
}