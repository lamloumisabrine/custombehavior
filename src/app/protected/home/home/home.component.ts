import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuItem } from 'acp-ui-component/lib/modules/menu/models/menu-item';
import { DiagramComponent, NodeModel, PortModel } from 'acp-ui-component';
import {  Subscription, switchMap } from 'rxjs';
import { DiagramModel } from 'acp-ui-component';
import { GraphService } from 'src/app/core/services/graph.service';
import { HttpClient } from '@angular/common/http';
import { RulesetUtilsService } from 'src/app/core/services/ruleset-utils.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Rule } from 'src/app/models/ruleset/rule.model';
import { Ruleset } from 'src/app/models/ruleset/ruleset.model';
import { ACTIONS_INTERVAL, positions, staticActions, staticValues } from 'src/app/shared/constants/static-values.constants';
import { Compare } from 'src/app/models/compare.model';
import { HandSide } from 'src/app/models/hand-side.model';
import { STRING_OPERATORS } from 'src/app/shared/constants/operators.constant';
import { Condition } from 'src/app/models/condition.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GraphStudioNodeModel } from '../../graph-studio/models/graph-studio-node.model';
import { Custombehavior } from 'src/app/models/custom-behavior.model';
import { Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GraphStudioPortModel } from '../../graph-studio/models/graph-studio-port.model';
import { VocabularyService } from 'src/app/core/services/vocabulary.service';
import { Vocabulary } from 'src/app/models/vocabulary/vocabulary.model';
import { DataType } from 'src/app/models/data-type.enum';
import { Port } from 'src/app/models/port.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  AfterViewInit, OnDestroy,OnInit {

  isHiddenToolbar = true;
  [x: string]: any;

  diagramModel: DiagramModel;
  nodesLinkList: any;

  ruleSnapshots: Rule[] = [];
  clickPredicateOrigin: boolean = true;
  operators = STRING_OPERATORS;
  selectedRule = new Rule();
  

  topItems: MenuItem[] = [
    { label: 'Consumer ',  isActive: false, value: "" , }, 
    { label: 'Retail', isActive: false, value: "" },
    { label: 'RetailConsumer', isActive: false, value: "" },
    { label: 'Retail Application', isActive: false, value: "" },
    { label: 'Retail Islamic', isActive: false, value: "" },
  ];
  

  @ViewChild(DiagramComponent, { static: true })
  diagram?: DiagramComponent;
  custom : Custombehavior = new Custombehavior();
 constructor( 
  private graphService: GraphService, 
  private httpClient: HttpClient,
  private rulesetUtilsService: RulesetUtilsService, 
  private utilsService: UtilsService,
  private vocabularyService : VocabularyService)
{
  this.updateSelectedRuleset();
 this.diagramModel = new DiagramModel();
 this.getScreen();
 
}
subscriptions: any;
zoomLevel : number = 100;
 firstAccess: boolean = true;
modalDuplicatePolicyTemplateRef!: TemplateRef<any>;
intervalActions = ACTIONS_INTERVAL;

nodesLibrary = [ { color: '#85E3FF', name: 'default' }, ];

ngAfterViewInit() {
  this.diagram?.zoomToFit();
}

ngOnDestroy(): void {
  this.subscriptions.forEach((subscription: Subscription) => {
    subscription.unsubscribe();
  });
}

onBlockDrag(e: DragEvent) 
{ const type = (e.target as HTMLElement).getAttribute('data-type');
 if (e.dataTransfer && type) { e.dataTransfer.setData('type', type); } }

field :any
screenJson : any

@Input()

LHS:any;
RHS:any;
Condition:any;
Compare:any;
Action:any;
CustomBehavior:any;


  ngOnInit(){}

  get fields() : any{
    return this._fields
  }
  set fields(fields :any){
    this._fields = fields;
  }
  _fields :any;

  private getScreen() {
    this.httpClient.get("/assets/data.json").subscribe((screen: any) => {
      this.screenJson = screen;
      this.fields = this.screenJson.field;
      
    });
  }
  zoomInOrOut(inOrOut: 'in' | 'out') {

    if (inOrOut === 'in') {
      this.zoomLevel = this.zoomLevel + 10;
      this.diagramModel.setZoomLevel(this.zoomLevel)
    }
    else if (inOrOut === 'out') {
      this.zoomLevel = this.zoomLevel - 10;
      this.diagramModel.setZoomLevel(this.zoomLevel)
    }
  }
  

 
     createNode(type: string){
    const nodeData = this.nodesLibrary.find((nodeLib) => nodeLib.name === type); 
    if (nodeData) { const node = new NodeModel();
       const port = new PortModel(); 
       node.addPort(port); 
       node.setExtras(nodeData);

    return node; }
    
    return null; }

   /**
   * * Set the left or right hand side of a comparison to the selected object
   * @param {any} object - any
   * @param {number} compareIndex - The index of the compare in the rule's when.compares array.
   * @param {string} position - The position of the item being added.
   */
  get condition(): any {
    return this.rulesetUtilsService.selectedRule?.when
  }

  getSelectedItem(selectedItem: any) {
    return this.rulesetUtilsService.getSelectedItem(selectedItem, this.screenJson);
  }
  deletePredicate(compareIndex: number) {
    if (this.selectedRule!.when!.compares!.length == 1) {
      this.selectedRule!.when = undefined;
    } else {
      this.selectedRule!.when!.compares?.splice(compareIndex, 1);
    }
  }

  setPredicateClickOrigin(value: any) {
    this.clickPredicateOrigin = this.rulesetUtilsService.getPredicateClickOrigin(value);
  }

  getOperator(operator: any) {
    return this.utilsService.getOperator(operator);
  }

  get selectedRuleset() {
    return this.rulesetUtilsService.selectedRuleset!;
  }
  
  intializeHandSide(position: 'left' | 'right' | 'middle', compareIndex: number) {
    switch (position) {
      case positions.LEFT:
        this.selectedRule.when!.compares![compareIndex].leftHandSide = new HandSide();
        break;
      case positions.RIGHT:
        this.selectedRule.when!.compares![compareIndex].rightHandSide = new HandSide();
        break;
      case positions.MIDDLE:
        this.selectedRule.when!.compares![compareIndex].operator = this.operators[0].value;
        break
      default:
        break;
    }
  }
  getInputChanges(object: any, compareIndex: number) {
    if (this.clickPredicateOrigin) {
      this.intializeHandSide(object.position, compareIndex);
      switch (object.position) {
        case positions.LEFT:
          this.selectedRule.when!.compares![compareIndex].leftHandSide!.source = staticValues.VALUE;
          this.selectedRule.when!.compares![compareIndex].leftHandSide!.value = object.value;
          break;
        case positions.RIGHT:
          this.selectedRule.when!.compares![compareIndex].rightHandSide!.source = staticValues.VALUE;
          this.selectedRule.when!.compares![compareIndex].rightHandSide!.value = object.value;
          break;
        case positions.MIDDLE:
          if (this.operators.some(operator => operator.value === object.value)) {
            this.selectedRule.when!.compares![compareIndex].operator = object.value;
          } else {
            this.selectedRule.when!.compares![compareIndex].operator = "";
          }
          break;

        default:
          break;
      }
    }
  }
  addFirstCondition(andOrOperator: string) {
    this.selectedRule.when = new Condition();
    let newCompare = new Compare();
    this.selectedRule.when!.logicalOperator = andOrOperator;
    this.selectedRule.when!.compares?.push(newCompare);
  }
  dropCompare(event: CdkDragDrop<string[]>, compares: Compare[]) {
    moveItemInArray(compares, event.previousIndex, event.currentIndex);
  }
  setLogicialOperator(value: any) {
    value === true ? this.selectedRule.when!.logicalOperator = 'or' : this.selectedRule.when!.logicalOperator = 'and';
  }
  getLogicialOperator(): boolean {
    if (this.selectedRule.when?.logicalOperator === staticValues.OR) {
      this.selectedRule.when.logicalOperator = staticValues.OR
      return true;
    } else {
      this.selectedRule.when!.logicalOperator = staticValues.AND
      return false;
    }
  }
  addCondition = {
    dropdownItems: [
      { title: 'Add condition', icon: '', divider: false, dropdownItemStyle: '', action: staticActions.ADD_CONDITION },
    ],
    button: { icon: 'icon-add', style: 'btn-icon-only btn-outline-primary circle' }
  }


  updateSelectedRuleset() {
    this.graphService.selectedNode.subscribe(newNode => {
      let condition = new Condition();
      condition.compares = [];
      let compare = new Compare();
      compare.leftHandSide
      condition.compares.push(compare);
      this.custom.conditions.push(condition);
      newNode
    });
  }
  
  get vocabularyList(): Vocabulary[] {
    let inputs = [];
    let outputs = [];
    let locals = [];
    [inputs, outputs, locals] = this.vocabularyService.bindVocabulariesBySource( this.screenJson.field);
    return this.vocabularyService.bindVocabulariesByTypes([DataType.DATE, DataType.BOOLEAN, DataType.NUMBER, DataType.RANGE, DataType.TEXT],[...inputs, ...locals]);
  }
  getRightVocabularyList(compare: Compare): any[] {
    if (compare.leftHandSide?.source === staticValues.INPUT) {
      let vocabulary = this.vocabularyList.find(vocabulary => vocabulary.id === compare.leftHandSide?.id);
      return this.vocabularyService.getVocabulariesByType(this.vocabularyList, vocabulary?.type!)
    } else {
      return this.vocabularyList;
    }
  }
  
  addNode() {
    //#region create node
    let newPort = new Port();
    const node = new GraphStudioNodeModel({
    });
    const canvasManager = this.diagram?.diagramEngine.getCanvasManager();
    if (canvasManager) {
      const coords = {
        x: 584,
        y: 89
      };
      const port = new GraphStudioPortModel({
        direction: 'out',
      
      });
      node.addPort(port);
      if (node) {
        node.setCoords(coords);
        this.diagramModel.addNode(node);
      }
    }
    //#endregion
  }
  
  saveCustomBehavior(){
    this.diagramModel
  }
}
