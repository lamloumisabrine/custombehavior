import { staticValues } from "src/app/shared/constants/static-values.constants";
import { GridVocabulary } from "./grid-vocabulary.model";

export class Vocabulary  {

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
    type?: 'text' | 'number' | 'boolean' | 'range' | 'table' | 'date';
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
  id: string | undefined;

    constructor() {
      
    }
}