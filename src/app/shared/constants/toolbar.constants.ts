export const ITEMS_TABS_LIST = [
    { title: 'Summary', icon: 'icon-dotlist', content: "", component: "Summary" },
    { title: 'Data', icon: 'icon-components', content: "", component: "Data" },
    { title: 'Details', icon: 'icon-info-circle', content: "", component: "Details", divider: "true" },
    { title: 'Compare', icon: 'icon-compare', content: "", component: "Compare" },
    { title: 'Template', icon: 'icon-template', content: "", component: "Template" },
    { title: 'Capture', icon: 'icon-capture', content: "", component: "Screenshot" },
    { title: 'Share', icon: 'icon-partage', content: "", component: "Share" },
    { title: 'Export', icon: 'icon-export-solid', content: "", component: "Export" },
    { title: 'Tags', icon: 'icon-tag', content: "", component: "Tags" },
    { title: 'Help', icon: 'icon-help-filled', content: "", component: "Help" },
];

export const  VOCABULARIES_OPTIONS = {
    dropdownItems: [
      { title: 'Edit vocabulary', divider: false, action: 'update' },
      { title: 'Delete vocabulary', divider: false, action: 'delete' }
    ],
    button: { icon: 'icon-options-horizontal', style: 'btn-icon-only circle', title: "Options" }
  }

  export const RULE_OPTIONS = {
    dropdownItems: [
      { title: 'Duplicate rule', divider: false, action:'duplicate' },
      { title: 'Delete rule', divider: false, action:'delete' }
    ],
    button: { icon: 'icon-options', style: 'btn-icon-only circle', title: "Options" }
  }