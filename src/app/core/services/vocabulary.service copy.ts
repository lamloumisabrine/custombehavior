import { Injectable } from '@angular/core';
import { DataType } from 'src/app/models/shared/data-type.enum';
import { Vocabulary } from 'src/app/models/vocabulary/vocabulary.model';
import { staticValues, vocabulariesIcons } from 'src/app/shared/constants/static-values.constants';
import { RulesetUtilsService } from './ruleset-utils.service';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  /* A reference to a modal. */
  vocabularyModalReference: any;

  constructor(private rulesetUtilsService : RulesetUtilsService) { }

  /**
   * It takes an array of Vocabulary objects, and returns an array of arrays of Vocabulary objects.
   * set inputs, outputs, locals vocabularies
   * @param {Vocabulary[]} vocabularies - Vocabulary[]
   * @returns An array of arrays.
   */
  public setInputsOutputsLocalsVocabularies(vocabularies: Vocabulary[]) {
    let inputs = [];
    let outputs = [];
    let locals = [];
    if (vocabularies) {
      for (let i = 0; i < vocabularies.length; i++) {
        switch (vocabularies[i].source) {
          case staticValues.INPUT:
            inputs.push(vocabularies[i]);
            break;
          case staticValues.OUTPUT:
            outputs.push(vocabularies[i]);
            break;
          case staticValues.LOCAL:
            locals.push(vocabularies[i]);
            break;
          default:
            break;
        }
      }
    }
    return [inputs, outputs, locals]
  }


  /**
   * If the selected policy has content and vocabularies, then for each vocabulary in the selected
   * policy's content's vocabularies, for each type in the types array, if the vocabulary's type is
   * equal to the type, then set the vocabulary icon and push the vocabulary to the vocabulary list.
   * @param {string[]} types - string[] = ["number" | "boolean" | "text" | "range" | "table" | "date"]
   * @returns An array of Vocabulary objects.
   */
  bindVocabulariesByTypes(types: string[], vocabularies: Vocabulary[]) {
    let vocabularyList: Vocabulary[] = [];
    if (vocabularies) {
      vocabularies.forEach(vocabulary => {
        types.forEach(type => {
          if (vocabulary.type === type) {
            this.setVocabularyIcon(vocabulary);
            vocabularyList.push(vocabulary);
          }
        });
      });
      return vocabularyList;
    }
    else {
      return [];
    }
  }

  /**
 * * Set the icon for the vocabulary based on its type
 * @param {Vocabulary} vocabulary - The vocabulary to set the icon for.
 */
  public setVocabularyIcon(vocabulary: Vocabulary) {
    switch (vocabulary.type) {
      case DataType.TEXT:
        return vocabulary.icon = vocabulariesIcons.TEXT;
      case DataType.BOOLEAN:
        return vocabulary.icon = vocabulariesIcons.BOOLEAN;
      case DataType.NUMBER:
        return vocabulary.icon = vocabulariesIcons.NUMBER;
      case DataType.RANGE:
        return vocabulary.icon = vocabulariesIcons.RANGE;
      case DataType.TABLE:
        return vocabulary.icon = vocabulariesIcons.TABLE;
      default:
        return vocabulary.icon = vocabulariesIcons.TEXT;
    }
  }

  /**
   * If the selectedPolicy.content.vocabularies array exists, then for each vocabulary in the array,
   * set the vocabulary icon, and return the array. 
   * If the array doesn't exist, return an empty array.
   * @returns An array of objects.
   */
  bindVocabularies(vocabularies :Vocabulary[]) {
    if (vocabularies) {
      vocabularies.forEach(vocabulary => {
        this.setVocabularyIcon(vocabulary);
      });
      return vocabularies;
    }
    else {
      return [];
    }
  }

  /**
   * This function returns an array of three arrays, each of which contains objects that have a name
   * and a value property.
   * @returns An array of three arrays.
   */
   bindVocabulariesBySource(vocabularies :Vocabulary[]) {
    let inputs = [];
    let outputs = [];
    let locals = [];
    return [inputs, outputs, locals] = this.setInputsOutputsLocalsVocabularies(this.bindVocabularies(vocabularies));
  }
  
  /**
   * It takes a list of vocabularies and a type, and returns a list of vocabularies that match the type
   * @param {any[]} vocabularyList - any[] - this is the list of vocabularies that you want to filter.
   * @param {'number' | 'text' | 'boolean' | 'range' | 'date' | 'table'} type - 'number' | 'text' |
   * 'boolean' | 'range' | 'date' | 'table'
   * @returns An array of objects.
   */
   getVocabulariesByType(vocabularyList: any[], type: 'number' | 'text' | 'boolean' | 'range' | 'date' | 'table') {
    let filtredVocabularyList: any = [];
    if (vocabularyList) {
      vocabularyList.forEach((vocabulary: { type: string; }) => {
        if (vocabulary.type === type) {
          filtredVocabularyList.push(vocabulary);
        }
      });
    }
    return filtredVocabularyList;
  }

  getSideItemValue(selectedItem: any, vocabularyList: Vocabulary[]) {
    if (selectedItem.source === staticValues.INPUT || selectedItem.source === staticValues.OUTPUT || staticValues.LOCAL) {
      let vocabulary = this.rulesetUtilsService.getSelectedItem(selectedItem, vocabularyList);
      return `${vocabulary.name} = ${selectedItem.value}`
    } else {
      return null;
    }
  }
}
