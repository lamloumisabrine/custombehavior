import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { RulesetUtilsService } from 'src/app/core/services/ruleset-utils.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { VocabularyService } from 'src/app/core/services/vocabulary.service';
import { Compare } from 'src/app/models/compare.model';
import { Condition } from 'src/app/models/condition.model';
import { DataType } from 'src/app/models/data-type.enum';
import { HandSide } from 'src/app/models/hand-side.model';
import { Vocabulary } from 'src/app/models/vocabulary/vocabulary.model';
import { STRING_OPERATORS } from 'src/app/shared/constants/operators.constant';
import { ACTIONS_INTERVAL, positions, staticActions, staticValues } from 'src/app/shared/constants/static-values.constants';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit, DoCheck {

  @Input() condition?: any;

  @Input() status: boolean = false;

  @Input() disabled: boolean = false;

  @Input() items : any;
  /**
   * If the disabled property is false, return the ACTIONS_INTERVAL array, otherwise return an empty
   * array
   * @returns The return value is an array of actions.
   */
  get intervalActions() {
    return this.disabled == false && this.status == false ? ACTIONS_INTERVAL : [];
  }

  operators = STRING_OPERATORS;

  clickPredicateOrigin: boolean = true;

  vocabularyList: Vocabulary[] = [];
  constructor(
    private utilsService: UtilsService,
    private rulesetUtilsService: RulesetUtilsService,
    private vocabularyService: VocabularyService) { 
    this.condition = new Condition()
    }


  ngDoCheck(): void {
    this.getVocabularies();
  }
    
    ngOnInit(): void {
    this.getVocabularies();
  }

  getVocabularies() {
    this.vocabularyList = this.vocabularyService.bindVocabulariesByTypes([DataType.DATE, DataType.BOOLEAN, DataType.NUMBER, DataType.RANGE, DataType.TEXT], this.items);
  }

  getSelectedAction(actionObject: any, condition: Condition) {
    if (actionObject.action === staticActions.ADD_CONDITION) {
      let newCondition = new Condition();
      let newCompare = new Compare();
      newCondition.compares?.push(newCompare);
      condition.conditions.push(newCondition)
    }
    else if (actionObject.action === staticActions.ADD_PREDICATE) {
      let newCompare = new Compare();
      condition.compares?.push(newCompare)
    }
  }

  deletePredicate(conditionIndex: any, compareIndex: number) {
    if (this.condition.conditions[conditionIndex].compares.length == 1) {
      this.condition.conditions.splice(conditionIndex, 1);
    } else {
      this.condition.conditions[conditionIndex].compares.splice(compareIndex, 1);
    }
  }

  setItem(object: any, compareIndex: number, conditionIndex: number, position: string) {
    if (position === positions.LEFT) {
      this.condition.conditions[conditionIndex].compares[compareIndex].leftHandSide = new HandSide()
      this.condition.conditions[conditionIndex].compares[compareIndex].leftHandSide = {
        id: object.id,
        icon: object.icon,
        source: object.source,
        value: object.value
      }
      console.log(this.condition)
    }
    else if (position === positions.RIGHT) {
      this.condition.conditions[conditionIndex].compares[compareIndex].rightHandSide = new HandSide()
      this.condition.conditions[conditionIndex].compares[compareIndex].rightHandSide = {
        id: object.id,
        icon: object.icon,
        source: object.source,
        value: object.id
      }
      console.log(this.condition)
    } else if (position === positions.MIDDLE) {
      this.condition.conditions[conditionIndex].compares[compareIndex].operator = object.value;
      console.log(this.condition)
    }
  }

  /**
   * get selected item from autocomplete list
   * MUST RETURN VALUE
   * @param selectedItem 
   */
  getSelectedItem(selectedItem: any): Object {
    return this.rulesetUtilsService.getSelectedItem(selectedItem, this.vocabularyList)
  }

  /**
   * get selected operator from autocomplete list
   * MUST RETURN VALUE
   * @param operator 
   */
  getOperator(operator: any) {
    return this.utilsService.getOperator(operator);
  }

  getNotOperator(compareIndex: number, conditionIndex: number) {
    return this.condition.conditions[conditionIndex].compares[compareIndex].notOperator = !this.condition.conditions[conditionIndex].compares[compareIndex].notOperator
  }

  setLogicialOperator(value: any, conditionIndex: number) {
    if (value) {
      this.condition.conditions[conditionIndex].logicalOperator = 'or';
    } else {
      this.condition.conditions[conditionIndex].logicalOperator = 'and';
    }
  }

  getLogicialOperator(conditionIndex: number): boolean {
    if (this.condition.conditions[conditionIndex].logicalOperator === staticValues.OR) {
      this.condition.conditions[conditionIndex].logicalOperator = staticValues.OR
      return true;
    } else {
      this.condition.conditions[conditionIndex].logicalOperator = staticValues.AND
      return false;
    }
  }
  
  getRightVocabularyList(compare: Compare): any[] {
    if (compare.leftHandSide?.source === staticValues.INPUT) {
      let vocabulary = this.vocabularyList.find(vocabulary => vocabulary.id === compare.leftHandSide?.id);
      return this.vocabularyService.getVocabulariesByType(this.vocabularyList, vocabulary?.type!)
    } else {
      return this.vocabularyList;
    }
  }

  dropCompare(event: CdkDragDrop<string[]>, compares: Condition[]) {
    moveItemInArray(compares, event.previousIndex, event.currentIndex);
  }

  getInputChanges(object: any, compareIndex: number, conditionIndex: number) {
    if (this.clickPredicateOrigin) {
      this.intializeHandSide(object.position, compareIndex, conditionIndex);
      switch (object.position) {
        case positions.LEFT:
          this.condition.conditions[conditionIndex].compares[compareIndex].leftHandSide!.source = staticValues.VALUE;
          this.condition.conditions[conditionIndex].compares[compareIndex].leftHandSide!.value = object.value;
          break;
        case positions.RIGHT:
          this.condition.conditions[conditionIndex].compares[compareIndex].rightHandSide!.source = staticValues.VALUE;
          this.condition.conditions[conditionIndex].compares[compareIndex].rightHandSide!.value = object.value;
          break;
        case positions.MIDDLE:
          if (this.operators.some(operator => operator.value === object.value)) {
            this.condition.conditions[conditionIndex].compares[compareIndex].operator = object.value;
          } else {
            this.condition.conditions[conditionIndex].compares[compareIndex].operator = "";
          }
          break;

        default:
          break;
      }
    }
  }


  intializeHandSide(position: 'left' | 'right' | 'middle', compareIndex: number, conditionIndex: number) {
    switch (position) {
      case positions.LEFT:
        this.condition.conditions[conditionIndex].compares[compareIndex].leftHandSide = new HandSide();
        break;
      case positions.RIGHT:
        this.condition.conditions[conditionIndex].compares[compareIndex].rightHandSide = new HandSide();
        break;
      case positions.MIDDLE:
        this.condition.conditions.compares[compareIndex].operator = this.operators[0].value;
        break
      default:
        break;
    }
  }

  setPredicateClickOrigin(value: any) {
    this.clickPredicateOrigin = this.rulesetUtilsService.getPredicateClickOrigin(value);
  }

  getSideItemValue(selectedItem: any) {
    return this.vocabularyService.getSideItemValue(selectedItem, this.vocabularyList);
  }

  getOperators(compare: Compare): any[] {
    return this.utilsService.getOperators(compare,this.vocabularyList)
  }
}
