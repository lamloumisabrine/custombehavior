import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ITEMS_TABS_LIST, RULE_OPTIONS, VOCABULARIES_OPTIONS } from '../../constants/toolbar.constants';
import { deepCopy } from 'src/app/core/services/deep-copy';
import { VocabularyService } from 'src/app/core/services/vocabulary.service';
import { Rule } from 'src/app/models/ruleset/rule.model';
import { Vocabulary } from 'src/app/models/vocabulary/vocabulary.model';
import { staticValues, toastIcons } from '../../constants/static-values.constants';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RulesetUtilsService } from 'src/app/core/services/ruleset-utils.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { AlertService,  ModalService, ToastService } from 'acp-ui-component';
import { UtilsService } from 'src/app/core/services/utils.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { Alert } from 'acp-ui-component/lib/modules/alert/models/alert.model';
import { messages } from '../../constants/messages.constant';
import { PolicyUtilsService } from 'src/app/core/services/policy-utils.service';
import { GraphStudioNodeModel } from 'src/app/protected/graph-studio/models/graph-studio-node.model';
import { GraphStudioPortModel } from 'src/app/protected/graph-studio/models/graph-studio-port.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnChanges {

  @Input() itemType: 'ruleset' | 'policy' | 'query' | undefined;

  /**
   * parent item the selected Item
   */
  @Input() parentItem: any;
  /**
   * selected item could be ruleset, policy, query ...
   */
  @Input() selectedItem: any;
  /**
   * if true toolbar will be open
   * else closed
   */
  @Input() hideShowToolbar = true;
  /**
   * List of inputs
   */
  inputs: Vocabulary[] = [];
  /**
   * list of outputs
   */
  outputs: Vocabulary[] = [];
  /**
   * list of locals
   */
  locals: Vocabulary[] = [];
  /**
   * new added rule
   */
  newRule: Rule | any;

  /**
   * emit toolbar hide and show value
   */
  @Output() hideShowToolbarChange = new EventEmitter();

  @Output() selectedItemChange = new EventEmitter();

  @Output() action = new EventEmitter();

  @Output() parentItemChange = new EventEmitter();

  //#region const items
  itemsTabsList = ITEMS_TABS_LIST;



  vocabulariesOptions = VOCABULARIES_OPTIONS
  //#endregion

  //#region filter list
  hideShowSearchRuleInput: boolean = false;
  hideShowSearchVocabInput: boolean = false;
  searchRule: string = "";
  searchVocab: string = "";
  //#endregion

  /**
   * Vocabulary formular source
   */
  formVocabSource: 'new' | 'update' = 'new';
  vocabularyObject: Vocabulary = new Vocabulary();
  @ViewChild('formVocabRef', { static: false }) formVocabRef!: NgbPopover;

  alertConfig: Alert = new Object();
 


  /**
   * template reference of vocabulary modal
   */
  modalVocabularyTemplateRef!: TemplateRef<any>;

  constructor(
    private vocabularyService: VocabularyService,
    private rulesetUtilsService: RulesetUtilsService,
    private toastService: ToastService,
    private utilsService: UtilsService,
    private sharedService: SharedService,
    private alertService: AlertService,
    private modalService: ModalService,
    private httpClient: HttpClient,
    private policyUtilsService: PolicyUtilsService) {

      this.getScreen();
     }
     screenJson : any
    ngOnInit(){}
     get fields() : any{
      return this._fields
    }
    set fields(fields :any){
      this._fields = fields;
    }
    _fields :any;
    private getScreen() {
      this.httpClient.get("/assets/data.json").subscribe((screen: any) => {
        this.screenJson = screen;
        this.fields = this.screenJson.field;
        
      });
    }
    field :any
    onBlockDrag(e: DragEvent,field :any) {
      this.field = field;
      const type = (e.target as HTMLElement).getAttribute('data-type');
      if (e.dataTransfer && type) {
        e.dataTransfer.setData('type', type);
      }
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedItem) {
      switch (this.itemType) {
        case staticValues.POLICY:
          [this.inputs, this.outputs, this.locals] = this.vocabularyService.setInputsOutputsLocalsVocabularies(this.selectedItem.content?.vocabularies);
          break;
        case staticValues.RULESET:
          [this.inputs, this.outputs, this.locals] = this.vocabularyService.setInputsOutputsLocalsVocabularies(this.parentItem.content?.vocabularies);
          this.rules = this.selectedItem.rules;
          break;
        default:
          break;
      }
    }
  }

  get ruleOptions() {
    return this.status == false ? RULE_OPTIONS : [];
  }

  get status(): any {
    if (this.itemType === staticValues.RULESET) {
      return this.parentItem.status === staticValues.DRAFT ? false : true;
    } else if (this.itemType === staticValues.POLICY) {
      return this.selectedItem.status === staticValues.DRAFT ? false : true;
    } else {
      return false;
    }
  }

  get rules(): Rule[] {
    if (this.selectedItem) {
      return this.selectedItem.rules;
    } else {
      return [];
    }
  }

  set rules(rules) {
    this.selectedItem.rules = rules;
  }

  get itemTabsList(): any {
    if (this.itemType === staticValues.RULESET) {
      return this.itemsTabsList;
    }
    else if (this.itemType === staticValues.POLICY) {
      // TODO: find solution to replace for loop
      let tabItemList = [];
      for (let i = 0; i < this.itemsTabsList.length; i++) {
        if (this.itemsTabsList[i].component !== 'Summary') {
          tabItemList.push(this.itemsTabsList[i])
        }
      }
      return tabItemList;
    }
  }

  get vocabularies() {
    switch (this.itemType) {
      case staticValues.POLICY:
        [this.inputs, this.outputs, this.locals] = this.vocabularyService.setInputsOutputsLocalsVocabularies(this.selectedItem.content?.vocabularies);
        return this.selectedItem.content.vocabularies;
      case staticValues.RULESET:
        [this.inputs, this.outputs, this.locals] = this.vocabularyService.setInputsOutputsLocalsVocabularies(this.parentItem.content.vocabularies);
        return this.parentItem.content.vocabularies;
    }
  }

  openCloseToolbar() {
    this.hideShowToolbar = !this.hideShowToolbar
    this.hideShowToolbarChange.emit(this.hideShowToolbar);
  }

  /**
   * add not saved rule to ruleset
   */
  public addRule() {
    this.createNewRuleObject();
    if (this.newRule) {
      this.selectedItem.rules.unshift(this.newRule);
    }
  }

  /**
   * initialize new rule object
   * @private
   */
  createNewRuleObject(): void {
    this.newRule = new Rule();
    this.newRule = {
      name: "Rule name",
      description: "No content yet",
      state: true,
      then: []
    };
  }

  /**
   * remove rule from rules list by index
   * @private
   */
  private removeRule(selectedRuleIndex: number): void {
    this.selectedItem.rules.splice(selectedRuleIndex, 1);
    this.toastService.notify('success', messages.SUCCESS_RULE_DELETE, toastIcons.DELETE);
  }

  /**
   * duplicate selected rule by index
   * @private
   */
  private duplicateRule(selectedRuleIndex: number): void {
    let ruleCopy = deepCopy(this.selectedItem.rules[selectedRuleIndex]);
    ruleCopy.state = true;
    this.selectedItem.rules.unshift(ruleCopy);
  }

  /**
   * set selected rule by index
   * if true their is existing rule
   * else not existing rule
   * @private
   */
  selectRule(selectedRuleIndex: number): boolean {
    if (this.selectedItem.rules[selectedRuleIndex]) {
      this.rulesetUtilsService.selectedRule = this.selectedItem.rules[selectedRuleIndex];
      return true;
    } else {
      return false;
    }
  }

  ruleStateTitle(rule: any) {
    if (rule.state && rule.state === true) {
      return "Not Saved"
    } else {
      return "";
    }
  }

  setState(rule: any) {
    if (!rule.state || rule.state === false) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * apply action on selected rule
   * @param object object action
   * @param selectedRuleIndex selected rule index
   */
  getSelectedObjectFromRuleDropdown(object: any, selectedRuleIndex: number) {
    if (object.action === staticValues.DELETE) {
      this.openRuleDeleteAlert(selectedRuleIndex);
    }
    else if (object.action === staticValues.DUPLICATE) {
      this.duplicateRule(selectedRuleIndex);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rules, event.previousIndex, event.currentIndex);
  }

  /**
 * Add or Update vocabulary to policy
 * @param action tiggered cloud be to add new vocabulary or to update existing one
 * @param formVocabTemplateRef template reference of vocabulary form
 */
  addOrUpdateVocabulary(action: 'new' | 'update') {
    if (action === 'new') {
      this.vocabularyObject.id = this.utilsService.guidGenerator();
      this.pushVocabToList();
      this.vocabularies.push(this.vocabularyObject);
      this.vocabularyObject = new Vocabulary();
    }
    else if (action === 'update') {
      for (let i = 0; i < this.vocabularies.length; i++) {
        if (this.vocabularies[i].id === this.vocabularyObject.id) {
          this.vocabularies[i] = this.vocabularyObject;
          break;
        }
      }
    }
  }


  getSelectedAction(selectedItem: Vocabulary, element: any) {
    if (element.action === 'update') {
      this.vocabularyService.vocabularyModalReference = this.modalService.openModal(this.modalVocabularyTemplateRef, this.policyUtilsService.modalSmOptions);
      this.setSelectedVocabulary(selectedItem, 'update', selectedItem.source!);
    }
    else if (element.action === 'delete') {
      this.removeVocabularyFromList(selectedItem);
    }
  }

  openModalVocabulary() {
    this.formVocabSource = 'new';
    this.vocabularyObject = new Vocabulary();
    this.vocabularyService.vocabularyModalReference = this.modalService.openModal(this.modalVocabularyTemplateRef, this.policyUtilsService.modalSmOptions);
  }

  /**
   * Set selected Vocabulary could be new or to update
   * @param vocabulary selected
   * @param source tiggered cloud be to add new vocabulary or to update existing one
   * @param type of vocabulary
   */
  setSelectedVocabulary(vocabulary: Vocabulary, source: 'new' | 'update', type: 'input' | 'output' | 'local') {
    this.formVocabSource = source;
    this.vocabularyObject = new Vocabulary();
    if (source === 'new') {
      this.vocabularyObject.source = type;
    }
    else {
      this.vocabularyObject = deepCopy(vocabulary);
    }
  }

  private removeVocabularyFromList(selectedItem: any) {
    const index = this.vocabularies.findIndex((vocab: { id: string | undefined; }) => vocab.id === selectedItem.id);
    let isChecked = this.checkIfUsedVocabulary(this.vocabularies[index]);
    if (isChecked === undefined) {
      this.openVocabularyDeleteAlert(index);
    } else {
      this.toastService.notify('error', messages.ERROR_USED_VOCABULARY, toastIcons.ERROR);
    }
  }

  removeVocabulary(vocabulary: Vocabulary) {
    let vocabularies = [];
    const index = this.vocabularies.findIndex((vocab: { id: string | undefined; }) => vocab.id === vocabulary.id);
    this.vocabularies.splice(index, 1);
    switch (this.itemType) {
      case staticValues.POLICY:
        vocabularies = this.selectedItem.content.vocabularies;
        break;
      case staticValues.RULESET:
        vocabularies = this.parentItem.content?.vocabularies;
        break;
      default:
        break;
    }
  }
  /**
   * "Check if the vocabulary is used in the rule's when clause."
   * </code>
   * @param {Vocabulary} vocabulary 
   * @returns a boolean or undefined.
   */
  checkIfUsedVocabulary(vocabulary: Vocabulary): false | any {
    switch (this.itemType) {
      case staticValues.POLICY:
        let isChecked;
        for (let i = 0; i < this.selectedItem.content.rulesets.length; i++) {
          for (let j = 0; j < this.selectedItem.content.rulesets[i].rules.length; j++) {
            if (this.selectedItem.content.rulesets[i].rules[j].when) {
              if (this.utilsService.checkIfUsedVocabulary(vocabulary, this.selectedItem.content.rulesets[i].rules[j]) === false) {
                isChecked = false;
                break;
              }
            }
          }
          if (isChecked === false) {
            return false
          }
        }
        break;
      case staticValues.RULESET:
        for (let i = 0; i < this.selectedItem.rules.length; i++) {
          return this.utilsService.checkIfUsedVocabulary(vocabulary, this.selectedItem.rules[i]);
        }
        break;

      default:
        break;
    }

  }

  private pushVocabToList() {
    switch (this.vocabularyObject.source) {
      case staticValues.INPUT:
        this.inputs.push(this.vocabularyObject);
        break;
      case staticValues.OUTPUT:
        this.outputs.push(this.vocabularyObject);
        break;
      case staticValues.LOCAL:
        this.locals.push(this.vocabularyObject);
        break;

      default:
        break;
    }
  }

  addItem() {
      this.action.emit('addNode')
    }
  

  openRuleDeleteAlert(selectedRuleIndex: number) {
    this.alertConfig = this.sharedService.setAlertValues(this.selectedItem.rules[selectedRuleIndex], this.alertConfig, staticValues.RULE);
    this.alertService.open(this.alertConfig!);
    this.getAlertConfirmationValue(selectedRuleIndex, staticValues.RULE);
  }

  getAlertConfirmationValue(selectedItemIndex: any, itemType: "vocabulary" | 'rule') {
    let selectedItemIndexTemp = selectedItemIndex;
    this.alertService.on<boolean>().subscribe((confirmationResponse: any) => {
      if (confirmationResponse) {
        switch (itemType) {
          case staticValues.RULE:
            this.removeRule(selectedItemIndexTemp);
            let isExistingRule = this.selectRule(0);
            // if false add new rule and select it
            if (!isExistingRule) {
              this.addRule();
              this.selectRule(0);
            }
            break;
          case staticValues.VOCABULARY:
            this.removeVocabulary(this.vocabularies[selectedItemIndex]);
            this.toastService.notify('success', messages.SUCCESS_VOCABULARY_DELETE, toastIcons.SUCCESS);
            break;

            break;
          default:
            break;
        }
      } else {
      }
    })


  }

  /**
   *  set modal template reference
   * @param {TemplateRef<any>} templateRef : template reference of modal
   * @public
   */
  getVocabularyTemplateRef(templateRef: TemplateRef<any>) {
    this.modalVocabularyTemplateRef = templateRef;
  }

  /**
   * If the itemType is POLICY, return true if the selectedItem's status is not 'draft'. If the
   * itemType is RULESET, return true if the parentItem's status is not 'draft'. Otherwise,
   * return false.
   * @returns The return value is a boolean.
   */
  get getItemStatus(): boolean {
    switch (this.itemType) {
      case staticValues.POLICY:
        return this.selectedItem?.status === 'draft' ? false : true;
      case staticValues.RULESET:
        return this.parentItem?.status === 'draft' ? false : true;
      default:
        return false;
    }
  }

  openVocabularyDeleteAlert(selectedVocabularyIndex: number) {
    this.alertConfig = this.sharedService.setAlertValues(this.vocabularies[selectedVocabularyIndex], this.alertConfig, staticValues.VOCABULARY);
    this.alertService.open(this.alertConfig!);
    this.getAlertConfirmationValue(selectedVocabularyIndex, staticValues.VOCABULARY);
  }
}
