import { Injectable } from '@angular/core';
import { STRING_OPERATORS } from 'src/app/shared/constants/operators.constant';
import { staticValues } from 'src/app/shared/constants/static-values.constants';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   * check if existing name in list 
   * if true name doesn't exist in list 
   * if false name exists in list
   * @param list list of items
   * @param itemName item to check if it exist
   * @param attribute attribute name
   * @returns boolean
   */
  checkExistingAttributeInList(list: any[], itemName: any, attribute: string): boolean {
    let isVerified = true;
    if (list.length > 0) {
      list.forEach(item => {
        if (item[attribute] === itemName) {
          isVerified = false;
        }
      });
    }
    return isVerified;
  }

  totalOfExistingAttributeInList(list: any[], itemName: string, attribute: string): number {
    let total = 0;
    list.forEach(item => {
      if (item[attribute] === itemName) {
        total++;
      }
    });
    return total;
  }

  /**
   * remove first find item in list 
   * if item attribute equals to item in list it will be removed
   * @param objectList list of items
   * @param attribute attribute name
   * @param itemToRemove item that will be removed
   * @returns boolean
   */
  removeItemFromListByAttribute(itemToRemove: any, objectList: any, attribute: string) {
    for (var i = 0; i < objectList.length; i++) {
      if (objectList[i][attribute] === itemToRemove[attribute]) {
        objectList.splice(i, 1);
        break;
      }
    }
  }
  /**
   * remove first find item in list 
   * if item attribute equals to item in list it will be removed
   * @param objectList list of items
   * @param attribute attribute name
   * @param itemToRemove item that will be removed
   * @returns boolean
   */
  removeItemFromListByAttributeWithAttirbute(selectedAttribute: any, objectList: any, attribute: string) {
    for (var i = 0; i < objectList.length; i++) {
      if (objectList[i][attribute] === selectedAttribute) {
        objectList.splice(i, 1);
        break;
      }
    }
  }
  /**
   * replace first find item in list 
   * if item attribute equals to item in list it will be replace
   * @param objectList list of items
   * @param attribute attribute name
   * @param itemToReplace item that will be replaced
   * @returns boolean
   */
  replaceItemInListByAttribute(itemToReplace: any, objectList: any, attribute: string) {
    for (var i = 0; i < objectList.length; i++) {
      if (objectList[i][attribute] === itemToReplace[attribute]) {
        objectList[i] = itemToReplace;
        break;
      }
    }
  }

  /**
   * set correct version to item
   * @param _selectedItem selected Item
   * @param publishedItems list of published items
   */
  public setVersion(_selectedItem: any, publishedItems: any): void {
    let version_result = "1.0";
    if (publishedItems.length > 0) {
      version_result = this.round(parseFloat(publishedItems.reverse()[0].version!) + 0.1, 1).toString();
      if (version_result.toString().length === 1) {
        version_result = version_result + '.0';
      }
    }
    _selectedItem.version = version_result;
  }

  round(value: any, precision: any) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }


  getPublishedAndDraftList(listOFItems: any[]) {
    let draftList: any[] = [];
    let publishedList: any[] = [];
    listOFItems.forEach(item => {
      if (item.status === staticValues.DRAFT) {
        draftList.push(item);
      } else if (item.status === staticValues.PUBLISHED) {
        publishedList.push(item);
      }
    });
    return { draftList, publishedList }
  }


  isDuplicatedElementByAttirbute(listOFItems: any, attribute: string): boolean {
    let resultToReturn = false;
    for (let i = 0; i < listOFItems.length!; i++) { // nested for loop
      for (let j = 0; j < listOFItems.length!; j++) {
        // prevents the element from comparing with itself
        if (i !== j) {
          // check if elements' values are equal
          if (listOFItems[i][attribute] === listOFItems[j][attribute]) {
            // duplicate element present                                
            resultToReturn = true;
            // terminate inner loop
            break;
          }
        }
      }
      // terminate outer loop                                                                      
      if (resultToReturn) {
        break;
      }
    }
    return resultToReturn;
  }

  getOperator(operator: any) {
    if (operator) {
      for (const stringOperator of STRING_OPERATORS) {
        if (stringOperator.value === operator) {
          return stringOperator;
        }
      }
    } else {
      return operator
    }
  }
}
