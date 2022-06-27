import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RulesetUtilsService } from 'src/app/core/services/ruleset-utils.service';
import { Rule } from 'src/app/models/ruleset/rule.model';
import { Ruleset } from 'src/app/models/ruleset/ruleset.model';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Condition } from 'src/app/models/condition.model';
import { ACTIONS_INTERVAL, policyTypes, positions, staticActions, staticValues } from 'src/app/shared/constants/static-values.constants';
import { Compare } from 'src/app/models/compare.model';
import { HandSide } from 'src/app/models/hand-side.model';
import { STRING_OPERATORS } from 'src/app/shared/constants/operators.constant';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { deepCopy } from 'src/app/core/services/deep-copy';
import { Board } from '../model/board.model';
import { Column } from '../model/column.model';



@Component({
  selector: 'app-ruleset',
  templateUrl: './ruleset.component.html',
  styleUrls: ['./ruleset.component.scss']
})
export class RulesetComponent implements OnInit, AfterContentChecked {
  [x: string]: any;

  /**
   * if true toolbar will be open
   * else closed
   */
  isHiddenToolbar = true;
  /**
   * if true action dropdowns will visible
   * else closed
   */
  isHiddenActionDropdowns = false;

  /**
   * if true side panel will be open
   * else closed
   */
  isOpenSidePanel = false;
  /**
   * if false side panel will not be pinned
   * else pinned
   */
  isPinedPanel = false;
  /**
   * list of ruleset from policy
   */
  rulesetList: Ruleset[] = [];

  operators = STRING_OPERATORS;

  dropdownObject = {
    dropdownItems: [
      { title: 'Add condition', icon: '', divider: false, dropdownItemStyle: '', action: staticActions.ADD_CONDITION },
      { title: 'Add group', icon: '', divider: false, dropdownItemStyle: '', action: staticActions.ADD_GROUP },
    ],
    button: { icon: 'icon icon-add', style: 'btn btn-dark circle-sm' }
  }

  addCondition = {
    dropdownItems: [
      { title: 'Add condition', icon: '', divider: false, dropdownItemStyle: '', action: staticActions.ADD_CONDITION },
      { title: 'Add group', icon: '', divider: false, dropdownItemStyle: '', action: staticActions.ADD_GROUP },
    ],
    button: { icon: 'icon-add', style: 'btn-icon-only btn-outline-primary circle' }
  }

  intervalActions = ACTIONS_INTERVAL;

  options = {
    dropdownItems: [
      { title: 'Edit ruleset', icon: 'icon-edit', divider: false, },
      { title: 'Delete ruleset', icon: 'icon-delete', divider: false, dropdownItemStyle: '' }
    ],
    button: { icon: 'icon-options-horizontal', style: 'btn-icon-only btn-options', title: "More options" }
  }



  board: Board = new Board('Component', [

    new Column('Field', [
      "F1",
      "F2",
      "F3",
      "F4"
    ]),
    new Column('FiledSet', [
      "Field",
      "Field",
      "Field",
      "Field"
     
    ]),
    new Column('Grid', [
      "Field",
      "Field",
      "Field",
      "Field"
     
    ]),
    new Column('CompositGroup', [
      "Field",
      "Field",
      "Field",
      "Field"
     
    ]),
  ]);
  /**
   * list of snapshots from selected rule
   * represents all temporary changements in selected rule
   */
  ruleSnapshots: Rule[] = [];

  clickPredicateOrigin: boolean = true;

  selectedRule = new Rule();
  constructor(
    private activedRouter: ActivatedRoute,
    private rulesetUtilsService: RulesetUtilsService,
    private utilsService: UtilsService,
    private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }
  getRulesetFromRouteById() {
    throw new Error('Method not implemented.');
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();

  }
  

  setLogicialOperator(value: any) {
    value === true ? this.selectedRule.when!.logicalOperator = 'or' : this.selectedRule.when!.logicalOperator = 'and';
  }
  /**
   * Set the selected ruleset
   * @param {Ruleset} selectedRuleset - The ruleset that is currently selected.
   */
  set selectedRuleset(selectedRuleset: Ruleset) {
    this.rulesetUtilsService.selectedRuleset = selectedRuleset
  }

  /**
   * Get the selected ruleset from the rulesetUtilsService
   * @returns The selected ruleset.
   */
  get selectedRuleset() {
    return this.rulesetUtilsService.selectedRuleset!;
  }
  

  /**
  

  /**
   * Get the condition of the currently selected rule
   * @returns The `when` condition of the selected rule.
   */
  get condition(): any {
    return this.rulesetUtilsService.selectedRule?.when
  }



  /**
   * Get the list of vocabularies from the policyUtilsService
   * @returns The vocabulary list.
   */



  /**
   *  get and apply selected action
   * @param {any} actionObject : action object
   * @public
   */

  

  /**
 * get boolean value from output
 * @param {boolean} value : get IsActive value from output
 * @public
 */
  public getIsActiveValue(value: any) {
    if (this.isPinedPanel) {
      this.isOpenSidePanel = true;
    } else {
      this.isOpenSidePanel = value;
    }
  }

  getSelectedItem(selectedItem: any) {
    return this.rulesetUtilsService.getSelectedItem(selectedItem, this['screenJson']);
  }

  deletePredicate(compareIndex: number) {
    if (this.selectedRule!.when!.compares!.length == 1) {
      this.selectedRule!.when = undefined;
    } else {
      this.selectedRule!.when!.compares?.splice(compareIndex, 1);
    }
  }
  /**
   * *Adds a new condition to the rule.*
   * 
   * The function creates a new condition object and adds it to the rule. 
   * It also creates a new compare object and adds it to the condition. 
   * Finally, it adds a snapshot of the rule to the rule history
   * @param {string} andOrOperator - The logical operator to use for the new condition.
  */
  addFirstCondition(andOrOperator: string) {
    this.selectedRule.when = new Condition();
    let newCompare = new Compare();
    this.selectedRule.when!.logicalOperator = andOrOperator;
    this.selectedRule.when!.compares?.push(newCompare);
  }
  /**
   * * If the logical operator is OR, then set it to AND.
   * * If the logical operator is AND, then set it to OR
   * @returns The boolean value of the logical operator.
   */
   getLogicialOperator(): boolean {
    if (this.selectedRule.when?.logicalOperator === staticValues.OR) {
      this.selectedRule.when.logicalOperator = staticValues.OR
      return true;
    } else {
      this.selectedRule.when!.logicalOperator = staticValues.AND
      return false;
    }
  }
  /**
   * *If the action is to add a condition, add a condition to the condition object.*
   * @param {any} actionObject - the action object that was selected by the user.
   * @param {Condition} condition - The condition object that is being edited.
   */
  

  /**
   * * Set the left or right hand side of a comparison to the selected object
   * @param {any} object - any
   * @param {number} compareIndex - The index of the compare in the rule's when.compares array.
   * @param {string} position - The position of the item being added.
   */
 

  /**
   * *Toggle the not operator for the selected compare.*
   * @param {number} compareIndex - number
   * @returns The rule object.
   */
  

  /**
   * *Delete a comparison from the rule.*
   * @param {number} compareIndex - number
   */


  /**
   * Get the operator from the operator string
   * @param {any} operator - The operator to use for the filter.
   * @returns The operator that was passed in.
   */
  getOperator(operator: any) {
    return this.utilsService.getOperator(operator);
  }

  /**
   * get selected item from autocomplete list
   * @param selectedItem
   */
 

  /**
   * *Set the logical operator of the when clause of the selected rule.*
   * @param {any} value - any
   */
  

  /**
   * * Get the input changes and update the selected rule
   * @param {any} object - any
   * @param {number} compareIndex - The index of the compare in the rule.
   */
  

  /**
   * *This function is used to initialize the left and right hand sides of a comparison. It is called
   * when the user selects a comparison and the left or right hand side is empty.*
   * @param {'left' | 'right' | 'middle'} position - The position of the hand side.
   * @param {number} compareIndex - The index of the compare in the rule.
   */


  /**
   * *Set the predicate click origin.*
   * @param {any} value - any
   */
  setPredicateClickOrigin(value: any) {
    this.clickPredicateOrigin = this.rulesetUtilsService.getPredicateClickOrigin(value);
  }

  /**
   * *Move the item in the array to the new index.*
   * @param event - CdkDragDrop<string[]>
   * @param {Compare[]} compares - The array of compares that is being dragged.
   */
  dropCompare(event: CdkDragDrop<string[]>, compares: Compare[]) {
    moveItemInArray(compares, event.previousIndex, event.currentIndex);
  }

  /**
   * *This function hides or shows the action dropdowns depending on the value of the
   * isHiddenActionDropdowns variable.*
   */
  hideShowActionDropdowns() {
    this.isHiddenActionDropdowns = !this.isHiddenActionDropdowns
  }


  /**
   * Reset the conditions of the selected rule to the conditions before the update
   */
  resetConditions() {
    this.rulesetUtilsService.selectedRule!.when! = deepCopy(this.rulesetUtilsService.conditionBeforeUpdate)
  }

  conditionBeforeUpdate: any;

  /**
   * * Set the conditionBeforeUpdate property to the current value of the when property of the selected
   * rule
   */
  setConditionBeforeUpdate() {
    this.rulesetUtilsService.conditionBeforeUpdate = deepCopy(this.selectedRule.when!);
  }
  

  /**
   * set rule before and after changement 
   * @param undoRedo 
   */
  counter = 0;

   /**
   * * Set the left or right hand side of a comparison to the selected object
   * @param {any} object - any
   * @param {number} compareIndex - The index of the compare in the rule's when.compares array.
   * @param {string} position - The position of the item being added.
   */
  setItem(object: any, compareIndex: number, position: string) {
    if (this.selectedRule && this.selectedRule?.when && this.selectedRule?.when?.compares) {
      if (position === positions.LEFT) {
        this.selectedRule.when.compares[compareIndex].leftHandSide = new HandSide();
        this.selectedRule.when.compares[compareIndex].leftHandSide = {
          id: object.id,
          source: object.source,
          value: object.id
        }
      }
      else if (position === positions.RIGHT) {
        this.selectedRule.when.compares[compareIndex].rightHandSide = new HandSide();
        this.selectedRule.when.compares[compareIndex].rightHandSide = {
          id: object.id,
          source: object.source,
          value: object.id
        }
      } else if (position === positions.MIDDLE) {
        this.selectedRule.when.compares[compareIndex].operator = object.value;
      }
    }
  }

  intializeHandSide(position: 'left' | 'right' | 'middle', compareIndex: number) {
    switch (position) {
      case positions.LEFT:
        this.selectedRule.when!.compares![compareIndex].leftHandSide = new HandSide();
        break;
      case positions.RIGHT:
        this.selectedRule.when!.compares![compareIndex].rightHandSide = new HandSide();
        break;
      case positions.MIDDLE:
        this.selectedRule.when!.compares![compareIndex].operator = this.operators[0].value;
        break
      default:
        break;
    }
  }
  getInputChanges(object: any, compareIndex: number) {
    if (this.clickPredicateOrigin) {
      this.intializeHandSide(object.position, compareIndex);
      switch (object.position) {
        case positions.LEFT:
          this.selectedRule.when!.compares![compareIndex].leftHandSide!.source = staticValues.VALUE;
          this.selectedRule.when!.compares![compareIndex].leftHandSide!.value = object.value;
          break;
        case positions.RIGHT:
          this.selectedRule.when!.compares![compareIndex].rightHandSide!.source = staticValues.VALUE;
          this.selectedRule.when!.compares![compareIndex].rightHandSide!.value = object.value;
          break;
        case positions.MIDDLE:
          if (this.operators.some(operator => operator.value === object.value)) {
            this.selectedRule.when!.compares![compareIndex].operator = object.value;
          } else {
            this.selectedRule.when!.compares![compareIndex].operator = "";
          }
          break;

        default:
          break;
      }
    }
  }
}