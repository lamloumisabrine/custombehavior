import { ContextType } from "./context-type.enum";

export class TriggeringPolicy {

    triggeringPolicyId?: string;

    triggeringRuleId?: string;

    policyId? : string;

    type?: ContextType;

    constructor() {
    }
}