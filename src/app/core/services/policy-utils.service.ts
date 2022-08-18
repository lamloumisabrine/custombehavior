import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalOptions } from 'node_modules/acp-ui-component/lib/modules/modal/models/modal-options.model'
import { staticValues } from '../../shared/constants/static-values.constants';
import { PolicySetService } from '../api-services/policy-set.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyUtilsService {

  /* This is a private variable that is used to store the new policy that is created. */
  newPolicyModalReference: any;

  /* This is a private variable that is used to store the new policy that is created. */
  newDraftPolicyModalReference: any;

  /* This is a private variable that is used to store the new policy that is created. */
  duplicatePolicyModalReference: any;

  /* This is a private variable that is used to store the new policy that is created. */
  editPolicyModalReference: any;

  /* This is a private variable that is used to store the new policy that is created. */
  publishPolicyModalReference: any;

  /* `datasetModalReference` is a variable that is used to store the new dataset that is created. */
  datasetModalReference: any;

  /* This is a private variable that is used to store the new ruleset that is created. */
  duplicateRulesetModalReference: any;

  /* This is a variable that is used to store the policy that is selected. */
  
  /* This is a variable that is used to store the policy that is selected. */

  /* This is a list of policies that are in draft. */

  /* This is a list of policies that are in draft. */

  /* This is a list of policies that are published. */

  /**
   * list of policies
   * policy list should be stocked always in this service
   */

  modalFullOptions: ModalOptions = {
    size: 'full',
    centered: true
  }

  modalSmOptions: ModalOptions = {
    size: 'sm',
    centered: true
  }

  modalXsOptions: ModalOptions = {
    size: 'xs',
    centered: true
  }

  modalMdOptions: ModalOptions = {
    size: 'md',
    centered: true
  }

  modalXlOptions: ModalOptions = {
    size: 'xl',
    centered: true
  }

  constructor(private policySetService: PolicySetService) {
    
  }

  /* This is a private variable that is used to store the new policy that is created. */
  private policyModal = new BehaviorSubject<any>(null);
  /* This is a private variable that is used to store the new policy that is created. */
  castPolicyModal = this.policyModal.asObservable();
  /* This is a private variable that is used to store the new policy that is created. */
  private draftpolicyModal = new BehaviorSubject<any>(null);
  /* This is a private variable that is used to store the new policy that is created. */
  castDraftPolicyModal = this.draftpolicyModal.asObservable();

  /* This is a private variable that is used to store the new policy that is created. */
  private newPolicySet = new BehaviorSubject<any>(null);
  /* This is a private variable that is used to store the new policy that is created. */
  refreshPolicySets = this.newPolicySet.asObservable();

  /**
   * `resetPolicyModal` is a function that takes in a new policy modal and sets the policy modal to that
   * new policy modal
   * @param {any} newPolicyModal - The new policy modal to be displayed.
   */
  resetPolicyModal(newPolicyModal: any) {
    this.policyModal.next(newPolicyModal);
  }

  /**
   * Reset the draft policy modal to a new value
   * @param {any} newDraftPolicyModal - The new draft policy modal object.
   */
  resetDraftPolicyModal(newDraftPolicyModal: any) {
    this.draftpolicyModal.next(newDraftPolicyModal);
  }

  /**
   * Refresh the list of policies
   * @param {any} newPolicy - The new policy that was added to the list.
   */
   refreshPolicySetsList(newPolicySet: any) {
    this.newPolicySet.next(newPolicySet);
  }

  /**
   * check if new policy form is valid or not
   * @returns boolean 
   */
 

  /**
   * Get the list of selected policies from the selectedPolicyList.
   * Get the list of selected policies from the selectedPolicyDraftList.
   * Get the list of selected policies from the selectedPolicyPublishedList
 

  public setSelectedPolicyList(policies : Policy[]) {
    this.selectedPolicyDraftList = [];
    this.selectedPolicyPublishedList = []
    for (let selectedPolicy of policies) {
      if (selectedPolicy.status === staticValues.DRAFT || selectedPolicy.status === null || selectedPolicy.status === undefined) {
        this.selectedPolicyDraftList.unshift(selectedPolicy)
      } else if (selectedPolicy.status === staticValues.PUBLISHED) {
        this.selectedPolicyPublishedList.unshift(selectedPolicy)
      }
    }
    return [this.selectedPolicyDraftList,this.selectedPolicyPublishedList];
  }

  /**
   * selected policy draft list and published list
   * filter will return list of policies with the same name
   * @public
   */
 
}
