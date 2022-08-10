import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  AfterViewInit, OnDestroy,OnInit {
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

 constructor( 
  private graphService: GraphService, 
  private httpClient: HttpClient,
  private rulesetUtilsService: RulesetUtilsService, 
  private utilsService: UtilsService,)
{
 this.diagramModel = new DiagramModel();
 this.getScreen();
 
}
subscriptions: any;
zoomLevel : number = 100;
 firstAccess: boolean = true;
modalDuplicatePolicyTemplateRef!: TemplateRef<any>;
intervalActions = ACTIONS_INTERVAL;

ngAfterViewInit() {
  this.diagram?.zoomToFit();
}

ngOnDestroy(): void {
  this.subscriptions.forEach((subscription: Subscription) => {
    subscription.unsubscribe();
  });
}

field :any
onBlockDrag(e: DragEvent,field :any) {
  this.field = field;
  const type = (e.target as HTMLElement).getAttribute('data-type');
  if (e.dataTransfer && type) {
    e.dataTransfer.setData('type', type);
  }
}


screenJson : any
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

  
createNode(type: string) {
  const nodeData = this.getScreen;
    const node = new GraphStudioNodeModel({
      extras: {
        id: this.field.uk_id,
        title: this.field.en.display,
        description: '',
      },
    });
    const port = new PortModel();
    node.addPort(port);
    return node;
}

 onBlockDropped(e: DragEvent) {
    if (e.dataTransfer) {
      const nodeType = e.dataTransfer.getData('type');
      const node = this.createNode(nodeType);
      const canvasManager = this.diagram?.diagramEngine.getCanvasManager();
      if (canvasManager) {
        const droppedPoint = canvasManager.getZoomAwareRelativePoint(e);
        const width = node?.getWidth() ?? 1;
        const height = node?.getHeight() ?? 1;
        const coords = {
          x: droppedPoint.x - width / 2,
          y: droppedPoint.y - height / 2,
        };

        if (node) {
          node.setCoords(coords);
          this.diagramModel.addNode(node);
          
        }
      }
    }
  }
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

  setItem(object: any, compareIndex: number, position: string) {
    if (this.selectedRule && this.selectedRule?.when && this.selectedRule?.when?.compares) {
      if (position === positions.LEFT) {
        this.selectedRule.when.compares[compareIndex].leftHandSide = new HandSide();
        this.selectedRule.when.compares[compareIndex].leftHandSide = {
          id: object.id,
          source: object.source,
          value: object.id
        }
      }
      else if (position === positions.RIGHT) {
        this.selectedRule.when.compares[compareIndex].rightHandSide = new HandSide();
        this.selectedRule.when.compares[compareIndex].rightHandSide = {
          id: object.id,
          source: object.source,
          value: object.id
        }
      } else if (position === positions.MIDDLE) {
        this.selectedRule.when.compares[compareIndex].operator = object.value;
      }
    }
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

  saveCustomBehavior(){
    this.diagramModel
  }
}
