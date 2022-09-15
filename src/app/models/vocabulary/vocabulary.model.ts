import { staticValues } from "src/app/shared/constants/static-values.constants";
import { BaseEntity } from "../base-entity.model";
import { DataType } from "../data-type.enum";

import { GridVocabulary } from "./grid-vocabulary.model";

export class Vocabulary extends BaseEntity {

    /**
     * Vocabulary index
     */
    index?: number;
    /**
     * Vocabulary description
     */
    description?: string;
    /**
     * Vocabulary type
     */
    type!: 'text' | 'number' | 'boolean' | 'range' | 'table' | 'date';
    /**
     * Vocabulary source
     */
    source?: 'input' | 'output' | 'local';
    /**
     * Vocabulary value
     */
    value?: string;
    /**
     * Vocabulary values if type is range
     */
    rangeValues?: any[];
    /**
     * vocabulary icon in fronend only
     */
    icon?: string;

    /* `grid` is a property of Vocabulary class. It is used to store the grid information. */
    grid: GridVocabulary | undefined;

    /**
     * name or title
     */
    // override name?: string;
    constructor() {
        super();
        this.name = "";
        this.description = "";
        this.type = DataType.TEXT
        this.source = staticValues.INPUT;
        this.rangeValues = [];
    }
}