import { Pipe, PipeTransform } from '@angular/core';
import { ContextType } from 'src/app/models/policy/context-type.enum';
import { DataType } from 'src/app/models/data-type.enum';
import { staticValues } from '../constants/static-values.constants';

@Pipe({
  name: 'iconType'
})
export class IconTypePipe implements PipeTransform {

  transform(type: any): any {
    switch (type) {
      case DataType.BOOLEAN:
        return 'icon-switch';
      case DataType.DATE:
        return 'icon-calendar';
      case DataType.NUMBER:
        return 'icon-number';
      case DataType.RANGE:
        return 'icon-list';
      case DataType.TABLE:
        return 'icon-table';
      case DataType.TEXT:
        return 'icon-vocabulary';


      case ContextType.exception:
        return 'icon-exception';
      case ContextType.accounting:
        return 'icon-schema';
      case ContextType.adhoc:
        return 'icon-ad-hoc';
      case ContextType.compliance:
        return 'icon-compliance';
      case ContextType.delegation:
        return 'icon-delegation';
      case ContextType.pricing:
        return 'icon-pricetags';
      case ContextType.startwf:
        return 'icon-workflow';
      case ContextType.underwriting:
        return 'icon-underwriting';
      case staticValues.TRIGGERING:
        return 'icon-triggering';

      case staticValues.RULESET:
        return 'icon-ruleset';
      case staticValues.POLICY:
      case staticValues.POLICY_SET:
        return 'icon-policy';

      default:
        break;
    }
  }


}
