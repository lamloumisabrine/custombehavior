import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Alert } from 'acp-ui-component/lib/modules/alert/models/alert.model';
import { Group } from 'acp-ui-component/lib/modules/list-group/models/group.interface';
import { Ruleset } from 'src/app/models/ruleset/ruleset.model';
import { staticValues } from 'src/app/shared/constants/static-values.constants';
import { PolicyUtilsService } from './policy-utils.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  /**
   * It creates a new instance of the PolicyUtilsService.
   * @param {PolicyUtilsService} policyUtilsService - The PolicyUtilsService is a service that is
   * injected into the constructor.
   */
  constructor(private policyUtilsService: PolicyUtilsService) { }

  /**
   * Get the selected item from the items list
   * @param {Group} selectedGroup - The group that was selected.
   * @param {any} itemsList - The list of items to be displayed in the list.
   * @param {'policy' | 'dataflow'|'logView'} itemType - 'policy' | 'dataflow'
   * @returns The selected item.
   */
  public getSelectedItem(selectedGroup: Group, itemsList: any, itemType: 'policy' | 'dataflow' | 'logView') {
    for (let i = 0; i < itemsList.length; i++) {
      if (itemsList[i].id === selectedGroup.groupId) {
        return this.setSelectedItemByIndex(i, new Object(), itemsList, itemType);
      }
    }
  }

  /**
   * * Set the selected item by index
   * @param {number} i - The index of the selected item in the itemsList.
   * @param {any} selectedItem - The selected item.
   * @param {any} itemsList - The list of items that are being selected from.
   * @param {'policy' | 'dataflow'} itemType - The type of item you want to select.
   * @returns The selected item.
   */
  private setSelectedItemByIndex(i: number, selectedItem: any, itemsList: any, itemType: 'policy' | 'dataflow' | 'logView') {
    switch (itemType) {
      case staticValues.POLICY:
        selectedItem = itemsList[i];
        break;
      case staticValues.LOG_VIEW:
        selectedItem = itemsList[i];
        break;
      default:
        break;
    }
    selectedItem = itemsList[i];
    return selectedItem;
  }

  /**
   * * Set the selected policy list and the selected dataflow list
   * @param {any} selectedItem - The selected item from the list.
   * @param {any} itemsList - The list of items that are currently selected.
   * @param {'policy' | 'dataflow'} itemType - The type of item that is selected.
   */
  public setSelectedItemsLists(selectedItem: any, itemsList: any, itemType: 'policy' | 'dataflow' | 'logView') {
    if (itemType === staticValues.POLICY) {
    }
  }

  /**
   * * Binds a policy or dataflow to a group
   * @param {Policy} item - The policy or dataflow that you want to bind to the group.
   * @param {'policy' | 'dataflow'} itemType - The type of item you are binding. This can be either
   * 'policy' or 'dataflow'.
   * @returns The `bindItemToGroup` function returns an object that contains the following information:
   * * `groupId`: The ID of the group.
   * * `title`: The name of the group.
   * * `description`: The description of the group.
   * * `userCompleteName`: The owner of the group.
   * * `status`: The status of the group.
   */
  public bindItemToGroup(item:  Ruleset |  any, itemType: 'policy' | 'dataflow' | 'rule' | 'ruleset' | 'triggeringPolicy' | 'logView') {
    switch (itemType) {
      case staticValues.POLICY:
        return {
          groupId: item.id,
          title: item.name,
          description: item.description,
          userCompleteName: item.owner,
          items: item.policies,
          rightPanelText: "Last update: " + formatDate(item.updatedDate!, 'fullDate', 'en'),
          icon: itemType === staticValues.POLICY ? 'icon icon-policy' : 'icon icon-dataflow',
          iconStyle: itemType === staticValues.POLICY ? 'policy' : 'dataflow',
          notifications: [
            { totalNumber: 0, icon: 'icon-public' },
            { totalNumber: 0, icon: 'icon-draft' }
          ],
        };
      case staticValues.DATAFLOW:
        return [];
      case staticValues.RULESET:
        return {
          groupId: item.id,
          title: item.name,
          description: item.description,
          items: item.rules,
          rightPanelText: "Last update: " + formatDate(item.updatedDate!, 'fullDate', 'en'),
          icon: itemType === staticValues.RULESET ? 'icon icon-ruleset' : '',
          iconStyle: itemType === staticValues.RULESET ? 'ruleset' : '',
        };
      case staticValues.LOG_VIEW:
        return {
          groupId: item?.policyLog?.id,
          title: item?.policyLog.policy.name,
          description: item?.policyLog?.policy.description,
          userCompleteName: item?.user,
          hideButtons: true,
          disabledTitle:true,
          disabledDescription:true,
          rightPanelText: "Logged date: " + formatDate(item?.policyLog?.loggedDate!, 'fullDate', 'en'),          
        };
      case staticValues.TRIGGERING_POLICY:
        return {
          groupId: item.rules[0].id,
          title: item.name,
          description: item.description,
          items: item.policies,
          icon: itemType === staticValues.TRIGGERING_POLICY ? 'icon icon-policy' : '',
          iconStyle: itemType === staticValues.TRIGGERING_POLICY ? 'policy' : '',
        };
      default:
        return [];
        break;
    }
  }

  /**
   * Get the total number of draft and published items for each item in the list
   * @param {any[]} items - The list of items to be updated.
   */
  getTotalDraftPublishItems(objects: any[]) {
    objects.forEach(object => {
      object.items.forEach((item: { status: string; }) => {
        if (item.status === staticValues.DRAFT) {
          object.notifications[1].totalNumber = object.notifications[1].totalNumber + 1
        }
        else if (item.status === staticValues.PUBLISHED) {
          object.notifications[0].totalNumber = object.notifications[0].totalNumber + 1
        }
      });
    });
  }

  /**
   * * Set the alert values for the selected item
   * @param {any} selectedItem - The item that is being deleted.
   * @param {Alert} alertConfig - Alert
   * @param {'policy' | 'dataflow' | 'draft' | 'query' | 'vocabulary' | 'rule'} itemType - The type of
   * item you are deleting.
   * @returns The alertConfig object is being returned.
   */
  public setAlertValues(selectedItem: any, alertConfig: Alert, itemType: 'policy' | 'dataflow' | 'draft' | 'query' | 'input' | 'output' | 'local' | 'rule' | 'logView' | 'vocabulary') {
    /* This is setting the name of the item that is being deleted. */
    let name = this.setItemAlertName(itemType, selectedItem);
    /* This is creating a new object and setting the values for the alert. */
    alertConfig = {
      title: `Delete ${itemType.toUpperCase()}`,
      message: `Are you sure to delete "${name}" ?`,
      type: 'success',
      icon: 'icon-delete-open'
    }

    /* This is creating a new object and setting the values for the confirm button. */
    alertConfig.buttonConfirm = new Object();
    alertConfig.buttonConfirm = {
      label: 'Confirm',
      style: 'btn-primary',
      icon: 'icon-delete-open',
      iconPosition: 'right'
    }

    /* This is creating a new object and setting the values for the cancel button. */
    alertConfig.buttonDismiss = new Object();
    alertConfig.buttonDismiss = {
      label: 'Cancel',
      style: 'btn-primary',
      icon: 'icon-delete-open',
      iconPosition: 'right'
    }
    return alertConfig;
  }

  /**
   * * Set the alert name based on the item type
   * @param {string} itemType - The type of item you are setting the alert for.
   * @param {any} selectedItem - The item that was selected.
   * @returns The name of the selected item.
   */
  private setItemAlertName(itemType: string, selectedItem: any) {
    let name;
    switch (itemType) {
      case staticValues.POLICY:
      case staticValues.DATAFLOW:
      case staticValues.RULESET:
      case staticValues.VOCABULARY:
      case staticValues.INPUT:
      case staticValues.OUTPUT:
      case staticValues.LOCAL:
      case staticValues.RULE:
        name = selectedItem.name;
        break;
      default:
        name = selectedItem.name;
        break;
    }
    return name;
  }

  /**
   * check if pattern correspanding
   * return false if pattern not conform with the value
   * @returns {boolean}
   */
  checkIfPatternCorrespanding(valueToCheck: string, pattern: string) {
    if (pattern) {
      const regex = new RegExp(pattern);
      return regex.test(valueToCheck);
    } else {
      return true;
    }
  }

  onlySpaces(string: string) {
    return string.replace(/\s/g, "").length;
  }

}
