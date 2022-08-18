import { Ruleset } from "../ruleset/ruleset.model";
import { PolicySet } from "./policy-set.model";

/**
 * this model combine the policy and the triggering rule with its conditions
 */
export class PolicyTriggeringRuleset {

    policySet?: PolicySet;

    triggeringRuleset?: Ruleset;

    policyId?: string;

    constructor() {
        this.policySet = new PolicySet();
        this.triggeringRuleset = new Ruleset();
    }
}