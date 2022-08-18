export class HandSide {

    /**
     * Vocabulary indentifier
     */
    id?: string;
    /**
     * Vocabulary value
     */
    value?: string;
    /**
     * Vocabulary value
     */
    source?: string;
    

    type!: 'text' | 'number' | 'boolean' | 'range' | 'table' | 'date';

    constructor(){
    }
}