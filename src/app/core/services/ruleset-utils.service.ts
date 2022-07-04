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
  

  getSelectedItem(componentId: any, screenJson: any) {
    if (componentId) {
      if (componentId.type) {
        return componentId;
      }
      else if (componentId.source === "value") {
        return { name: componentId.value, value: componentId.value, id: componentId.id }
      }
      else {
        for (const field of screenJson) {
          if (field.en.display == componentId) {
            componentId.name = field.en.display;
            return field.en.display;
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
