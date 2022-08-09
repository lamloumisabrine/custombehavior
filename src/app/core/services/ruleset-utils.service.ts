import {Injectable} from '@angular/core';
import {Rule} from 'src/app/models/ruleset/rule.model';
import {Ruleset} from 'src/app/models/ruleset/ruleset.model';
import {Condition} from 'src/app/models/condition.model';
import { Component } from 'src/app/models/component.model';

@Injectable({
  providedIn: 'root'
})
export class RulesetUtilsService {

  selectedRuleset: Ruleset | undefined;
  selectedRule: Rule | undefined;

  conditionBeforeUpdate: Condition = new Condition();
  rulesetState: 'saved' | 'notSaved' | undefined;
  

  getSelectedItem(item: any, fields: any) {
    if (item) {
      if (item.name) {
        return item;
      }
      else if (item.source === "value") {
        return { name: item.value, value: item.value, id: item.id }
      }
      else {
        for (const field of fields) {
          if (field.id == item.id)
           {
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
