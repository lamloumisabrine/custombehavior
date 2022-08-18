import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RulesetUtilsService } from 'src/app/core/services/ruleset-utils.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { VocabularyService } from 'src/app/core/services/vocabulary.service';
import { Compare } from 'src/app/models/compare.model';
import { Condition } from 'src/app/models/condition.model';
import { HandSide } from 'src/app/models/hand-side.model';
import { STRING_OPERATORS } from 'src/app/shared/constants/operators.constant';
import { staticValues, positions, ACTIONS_INTERVAL } from 'src/app/shared/constants/static-values.constants';
import { Rule } from 'src/app/models/ruleset/rule.model';

@Component({
  selector: 'app-condition-composer',
  templateUrl: './condition-composer.component.html',
  styleUrls: ['./condition-composer.component.scss']
})
export class ConditionComposerComponent implements OnInit,DoCheck {

  @Input() vocabularyList: any;

  @Input() selectedRule = new Rule();

  @Input() status: boolean = false;

  @Output() selectedRuleChange = new EventEmitter()

  clickPredicateOrigin: boolean = true;

  operators = STRING_OPERATORS;



  constructor(
    private vocabularyService: VocabularyService,
    private rulesetUtilsService: RulesetUtilsService,
    private utilsService: UtilsService,
  ) { }
  ngDoCheck(): void {
    this.selectedRuleChange.emit(this.selectedRule);
  }

  ngOnInit(): void {
  }

  /**
* Get the condition of the currently selected rule
* @returns The `when` condition of the selected rule.
*/
  get condition(): any {
    return this.selectedRule.when
  }

  get intervalActions() {
    return this.status == false ? ACTIONS_INTERVAL : [];
  }
  
    //#region conditions and predicats

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
    this.selectedRule.when.logicalOperator = andOrOperator;
    this.selectedRule.when.compares?.push(newCompare);
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
  getSelectedIntervalAction(actionObject: any, condition: Condition) {
    this.rulesetUtilsService.getSelectedIntervalAction(actionObject, condition);
  }

  /**
   * * Set the left or right hand side of a comparison to the selected object
   * @param {any} object - any
   * @param {number} compareIndex - The index of the compare in the rule's when.compares array.
   * @param {string} position - The position of the item being added.
   */
  setItem(object: any, compareIndex: number, position: string) {
    if (this.selectedRule && this.selectedRule?.when && this.selectedRule?.when?.compares) {
      if (position === positions.LEFT) {
        /* Checking if the type of the left hand side is not equal to the type of the object. If it is
        not, it is setting the right hand side to a new HandSide object. */
        if (this.selectedRule.when.compares[compareIndex].leftHandSide?.type !== object.type) {
          this.selectedRule.when.compares[compareIndex].rightHandSide = new HandSide();
        }
        this.selectedRule.when.compares[compareIndex].leftHandSide = new HandSide();
        this.selectedRule.when.compares[compareIndex].leftHandSide = {
          id: object.id,
          source: object.source,
          // value: object.id,
          type: object.type
        }
      }
      else if (position === positions.RIGHT) {
        this.selectedRule.when.compares[compareIndex].rightHandSide = new HandSide();
        this.selectedRule.when.compares[compareIndex].rightHandSide = {
          id: object.id,
          source: object.source,
          // value: object.id,
          type: object.type
        }
      } else if (position === positions.MIDDLE) {
        this.selectedRule.when.compares[compareIndex].operator = object.value;
      }
    }
  }

  /**
   * *Toggle the not operator for the selected compare.*
   * @param {number} compareIndex - number
   * @returns The rule object.
   */
  getNotOperator(compareIndex: number) {
    return this.selectedRule.when!.compares![compareIndex].notOperator = !this.selectedRule.when!.compares![compareIndex].notOperator;
  }

  /**
   * *Delete a comparison from the rule.*
   * @param {number} compareIndex - number
   */
  deletePredicate(compareIndex: number) {
    if (this.selectedRule!.when!.compares!.length == 1) {
      this.selectedRule!.when = undefined;
    } else {
      this.selectedRule!.when!.compares?.splice(compareIndex, 1);
    }
  }

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
  getSelectedItem(selectedItem: any) {
    return this.rulesetUtilsService.getSelectedItem(selectedItem, this.vocabularyList);
  }

  /**
   * *Set the logical operator of the when clause of the selected rule.*
   * @param {any} value - any
   */
  setLogicialOperator(value: any) {
    value === true ? this.selectedRule.when!.logicalOperator = 'or' : this.selectedRule.when!.logicalOperator = 'and';
  }

  /**
   * * Get the input changes and update the selected rule
   * @param {any} object - any
   * @param {number} compareIndex - The index of the compare in the rule.
   */
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

  /**
   * *This function is used to initialize the left and right hand sides of a comparison. It is called
   * when the user selects a comparison and the left or right hand side is empty.*
   * @param {'left' | 'right' | 'middle'} position - The position of the hand side.
   * @param {number} compareIndex - The index of the compare in the rule.
   */
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
 * This function returns an array of operators that are available for the given compare object.
 * @param {Compare} compare - Compare - this is the object that contains the field, operator, and
 * value
 * @returns An array of objects.
 */
  getOperators(compare: Compare): any[] {
    return this.utilsService.getOperators(compare, this.vocabularyList)
  }

  /**
* If the selectedRule has a when property that has a compares property, and the compare's
* leftHandSide has a source property that is equal to the staticValues.INPUT, then find the
* vocabulary in the vocabularyList that has an id equal to the compare's leftHandSide's id, and
* return the vocabularies in the vocabularyList that have the same type as the vocabulary that was
* found.
* If the selectedRule does not have a when property that has a compares property, or the compare's
* leftHandSide does not have a source property that is equal to the staticValues.INPUT, then return
* the vocabularyList.
* @param {Compare} compare - Compare - this is the object that is being passed in.
* @returns an array of objects.
*/
  getRightVocabularyList(compare: Compare): any[] {
    if (this.selectedRule?.when?.compares) {
      if (compare.leftHandSide?.source === staticValues.INPUT) {
        let vocabulary = this.vocabularyList.find((vocabulary: { id: string | undefined; }) => vocabulary.id === compare.leftHandSide?.id);
        return this.vocabularyService.getVocabulariesByType(this.vocabularyList, vocabulary?.type!)
      } else {
        return this.vocabularyList;
      }
    } else {
      return this.vocabularyList;
    }
  }
  onBlockDropped(event: DragEvent) {
   
  }
  
}
