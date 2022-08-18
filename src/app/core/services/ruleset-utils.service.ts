import {Injectable} from '@angular/core';
import {Rule} from 'src/app/models/ruleset/rule.model';
import {Ruleset} from 'src/app/models/ruleset/ruleset.model';
import {Condition} from 'src/app/models/condition.model';
import { Compare } from 'src/app/models/compare.model';
import { staticActions } from 'src/app/shared/constants/static-values.constants';

@Injectable({
  providedIn: 'root'
})
export class RulesetUtilsService {

  selectedRuleset: Ruleset | undefined;
  selectedRule: Rule | undefined;
  conditionBeforeUpdate: Condition = new Condition();
  rulesetState: 'saved' | 'notSaved' | undefined;
  

 getSelectedItem(item: any, vocabularyList: any) {
    if (item) {
      if (item.name) {
        return item;
      }
      else if (item.source === "value") {
        return { name: item.value, value: item.value, id: item.id }
      }
      else {
        for (const vocabulary of vocabularyList) {
          if (vocabulary.id == item.id) {
            let _item = item;
            item = vocabulary;
            return item;
          }
        }
      }
    }
  }
  getPredicateClickOrigin(value: any) {
    if (value.origin === 'list') {
      return false;
    }else {
      return true;
    }
  }
  getSelectedIntervalAction(actionObject: any, condition: Condition) {
    if (actionObject.action === staticActions.ADD_CONDITION) {
      let newCondition = new Condition();
      let newCompare = new Compare();
      newCondition.compares?.push(newCompare);
      condition.conditions.push(newCondition);
    }
    else if (actionObject.action === staticActions.ADD_PREDICATE) {
      let newCompare = new Compare();
      condition.compares?.push(newCompare);
    }
  }

 
}
