import { BaseEntity } from "../base-entity.model";
import { Node } from "../node.model";
import { Vocabulary } from "../vocabulary/vocabulary.model";
import { Rule } from "./rule.model";

export class Ruleset extends BaseEntity {

    /**
     * Ruleset description
     */
    description?: string;
    /**
     * List of rules composing the ruleset
     */
    rules: Rule[];
    /**
     * List of outputs
     */
    outputs: Vocabulary[];
    /**
     * Ruleset execution priority
     */
    priority: number | undefined;

    node: Node;

    /**
     * Ruleset output type
     */
    outputType? : string;
    
    constructor() {
        super();
        this.description = ""
        this.rules = [];
        this.outputs = [];
        this.node = new Node()
    }
}