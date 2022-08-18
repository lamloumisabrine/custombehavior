import { DataType } from "src/app/models/data-type.enum";

export const staticValues = {
    STRING_PATTERN: "^-?[_a-zA-Z0-9- ]+$",
    INPUT: "input",
    OUTPUT: "output",
    LOCAL: "local",
    DRAFT: "draft",
    PUBLISHED: "published",
    DEPLOYED: "deployed",
    AND: "and",
    OR: "or",
    VALUE: "value",
    RULE: "rule",
    DELETE: 'delete',
    DUPLICATE: 'duplicate',
    NEW: 'new',
    ASSERT: 'assert',
    RULESET: "ruleset",
    QUERY: "query",
    POLICY: "policy",
    DATAFLOW: "dataflow",
    VOCABULARY: "vocabulary",
    TRIGGERING: "triggering",
    POLICY_LOG: "PolicyLog",
    LOG_VIEW: "logView",
    POLICY_SET: "policySet",
    TRIGGERING_POLICY: "triggeringPolicy",
    PUBLISH: "publish",
    SAVE: "save",
} as const;

export const policyTypes = {
    PRICING: "pricing",
    START_WF: "swf",
    DELEGATION: "delegation",
    COMPLIANCE: "compliance",
    AD_HOC: "adhoc",
    UNDERWRITING: "underwriting",
    EXCEPTION: "ceh",
    ACCOUTING_SCHEMA: "accounting",
} as const;

export const policyTypesLabel = {
    PRICING: "Pricing",
    START_WF: "Start workflow",
    DELEGATION: "Delegation",
    COMPLIANCE: "Compliance",
    AD_HOC: "AD-HOC",
    UNDERWRITING: "Underwriting",
    EXCEPTION: "Exception",
    ACCOUTING_SCHEMA: "Accounting schema",
} as const;

export const staticActions = {
    ADD_CONDITION: "addCondition",
    ADD_GROUP: "addGroup",
    ADD_PREDICATE: "addPredicate",
    REMOVE_COMPARE: "removeCompare"
} as const;

export const ACTIONS_INTERVAL = [
    { title: 'Add predicate', action: staticActions.ADD_PREDICATE },
    { title: 'Add condition', action: staticActions.ADD_CONDITION }
]

export const positions = {
    LEFT: "left",
    RIGHT: "right",
    MIDDLE: "middle"
}

export const vocabulariesIcons = {
    NUMBER: 'icon-number',
    BOOLEAN: 'icon-switch',
    TEXT: 'icon-vocabulary',
    RANGE: 'icon-dots',
    TABLE: 'icon-table'
}

export const policyTypesIcon = {
    PRICING: "icon-pricetags",
    START_WF: "icon-workflow",
    DELEGATION: "icon-delegation",
    COMPLIANCE: "icon-compliance",
    AD_HOC: "icon-ad-hoc",
    UNDERWRITING: "icon-underwriting",
    EXCEPTION: "icon-exception",
    ACCOUTING_SCHEMA: "icon-schema",
} as const;

export const vocabularyTypes = [
    { value: DataType.NUMBER, label: "Number", disabled: false, selected: false, hidden: false, icon: 'icon-number' },
    { value: DataType.TEXT, label: "String", disabled: false, selected: false, hidden: false, icon: 'icon-vocabulary' },
    { value: DataType.BOOLEAN, label: "Boolean", disabled: false, selected: false, hidden: false, icon: 'icon-switch' },
    { value: DataType.DATE, label: "Date", disabled: false, selected: false, hidden: false, icon: 'icon-calendar' },
    { value: DataType.TABLE, label: "Table", disabled: false, selected: false, hidden: false, icon: 'icon-table' },
    { value: DataType.RANGE, label: "Range", disabled: false, selected: false, hidden: false, icon: 'icon-list' }
]

export const columnTableTypes = [
    { value: DataType.TEXT, label: "String", disabled: false, selected: false, hidden: false },
    { value: DataType.NUMBER, label: "Number", disabled: false, selected: false, hidden: false },
    { value: DataType.DATE, label: "Date", disabled: false, selected: false, hidden: false },
    { value: DataType.BOOLEAN, label: "Boolean", disabled: false, selected: false, hidden: false }
]

export const booleans = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
]

export const customErrorHandling = {
    BLOCKING: "blocking",
    DEVIATION: "deviation",
    OPTIONAL: "optional"
} as const;

export const toastIcons = {
    ERROR: 'icon-alert-triangle-outline',
    WARNING: 'icon-alert-line',
    SUCCESS: 'icon-check-all',
    INFO: 'icon-info-circle',
    DUPLICATE : 'icon-duplicate',
    DELETE : 'icon-delete'
}