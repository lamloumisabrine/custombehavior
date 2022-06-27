import { Injectable } from '@angular/core';
import { Rule } from 'src/app/models/ruleset/rule.model';
import { Ruleset } from 'src/app/models/ruleset/ruleset.model';
import { Condition } from 'src/app/models/condition.model';

@Injectable({
  providedIn: 'root'
})
export class RulesetUtilsService {

  selectedRuleset: Ruleset | undefined;
  selectedRule: Rule | undefined;

  conditionBeforeUpdate: Condition = new Condition();
  rulesetState: 'saved' | 'notSaved' | undefined;
  
  getSelectedItem(item: any, screen: any) {
    if (item) {
      if (item.name) {
        return item;
      }
      else if (item.source === "value") {
        return { name: item.value, value: item.value, id: item.id }
      }
      else {
        for (const field of screen) {
          if (field.en.display == item.name) {
            item = field;
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
}
