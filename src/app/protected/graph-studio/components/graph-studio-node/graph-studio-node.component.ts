import { ChangeDetectionStrategy,Component,EventEmitter,Inject,Input,IterableDiffers,OnInit,Output,ViewChild,ViewContainerRef}from '@angular/core';
import { Router } from '@angular/router';
import { DefaultNodeComponent, MODEL, DiagramComponent, EngineService, AlertService } from 'acp-ui-component';
import { GraphService } from 'src/app/core/services/graph.service';
import { GraphStudioNodeModel, NodeStatus } from '../../models/graph-studio-node.model';
import { Rule } from 'src/app/models/ruleset/rule.model';
import { STRING_OPERATORS ,LIST_FIELDS} from 'src/app/shared/constants/operators.constant';
import { RulesetUtilsService } from 'src/app/core/services/ruleset-utils.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ACTIONS_INTERVAL, positions, staticActions, staticValues } from 'src/app/shared/constants/static-values.constants';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Compare } from 'src/app/models/compare.model';
import { Condition } from 'src/app/models/condition.model';
import { HandSide } from 'src/app/models/hand-side.model';
import { VocabularyService } from 'src/app/core/services/vocabulary.service';
import { HttpClient } from '@angular/common/http';
import { CBApiService } from 'src/app/core/api-services/CB-api.service';
import { Observable } from 'rxjs/internal/Observable';
import {ComponentsService} from 'src/app/core/services/components.service'
@Component({
  selector: 'graph-studio-node',
  templateUrl: './graph-studio-node.component.html',
  styleUrls: ['./graph-studio-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphStudioNodeComponent extends DefaultNodeComponent implements OnInit {
  [x: string]: any;

  vocabularyList :any[]= [
    // {name:'test' ,value:'est' ,id:'test', type:'test'}
   ];
   actiontypelist:any=[];
   alert: boolean=false;


  @Input() selectedRule = new Rule();

  @Input() status: boolean = false;

  @Output() selectedRuleChange = new EventEmitter()

  clickPredicateOrigin: boolean = true;

  operators = STRING_OPERATORS;

  @ViewChild('portsLayer', { read: ViewContainerRef, static: true })
  portsLayers!: ViewContainerRef;

  ruleSnapshots: Rule[] = [];
  field = LIST_FIELDS;

  constructor( private router :Router,
    @Inject(MODEL) public override model: GraphStudioNodeModel,
    engine: EngineService,
    diagram: DiagramComponent,
    iterableDiffers: IterableDiffers,
    private graphService: GraphService,
    private rulesetUtilsService: RulesetUtilsService, 
    private utilsService: UtilsService,
    vocabularyService: VocabularyService,
    private httpClient: HttpClient,
    private service:CBApiService,
    private componentService:ComponentsService
    
    ) {
    super(model, engine, diagram, iterableDiffers);
    this.getScreen();
    model.selectExtras().subscribe((extras: any) => {
      if (extras.color) {
      }
    });
        model.selectSelected().subscribe((selected: boolean) => {
      if (selected) {
        this.graphService.selectedNode.next(this.model.getExtras())
      }
      this.updateLinksState(selected);
    });
    this.model.selectPorts().subscribe((ports: any[]) => {
      ports.forEach((port) => {
        port.selectLinks().subscribe(() => {
          //this.model.setStatus(this.calculateStatus());
        });
      });
    });
  }
  override ngOnInit(): void {
this.getactiontypelist();  }

 getactiontypelist(){
this.service.getActionTypeList().subscribe(data=>{this.actiontypelist=data});
}

  get fields() : any{
    return this._fields
  }
  set fields(fields :any){
    this._fields = fields;
  }
  _fields :any;

  private getScreen() {
    this.httpClient.get("/assets/data.json").subscribe((screen: any) => {
      this.fields = screen.field;
      this.getVocabularies()
      
    });
  }

  calculateStatus() {
    let numOfLinks = 0;
    const infiniteLoop = false;
    const badConnections = false;

    this.model.getPorts().forEach((port) => {
      numOfLinks += port.getLinks().size;
    });

    if (numOfLinks <= 0) {
      return NodeStatus.WARNING;
    }

    if (infiniteLoop || badConnections) {
      return NodeStatus.ERROR;
    }

    return NodeStatus.DEFAULT;
  }
  addNode = {
    dropdownItems: [
      { title: 'Add ruleset', icon: 'icon-ruleset', divider: false }
    ],
    button: { icon: 'icon-add', style: 'btn-white circle dropdown-toggle-split', title: "Add new ruleset" }
  }


  createStatusShadow(status: NodeStatus) {
    switch (status) {
      case NodeStatus.WARNING:
        return '0px 4px 12px rgba(250, 212, 109, 0.7)';
      case NodeStatus.ERROR:
        return '0px 4px 12px rgba(254, 150, 150, 0.7)';
      case NodeStatus.DEFAULT:
      default:
        return '0px 4px 12px rgba(0, 0, 0, 0.25)';
    }
  }

  updateLinksState(selected: boolean) {
    this.model.getPorts().forEach((port) => {
      port.getLinks().forEach((link) => {
        link.setSelected(selected);
      });
    });
  }

  createSelectedShadow(selected: boolean) {
    return selected
      ? '0px 4px 12px rgba(101, 186, 255, 0.7)'
      : this.createStatusShadow(this.calculateStatus());
  }

  createNodeGradient(color: string) {
    return `linear-gradient(to right, ${color} 0%, ${color} 2%, rgb(242, 242, 242) 2%)`;
  }

  selected(extras:any,event:any){
    extras.type = event
  }
  addNew = {
    dropdownItems: [
      { title: 'Hidden', divider: false },
      { title: 'Disable', divider: false },
      { title: 'Default', divider: false },
      { title: 'NULL', divider: false }

    ],
    button: { style: 'btn-primary btn-icon-only ' }
  }
  outputTypes: any = [

    {  label: "NULL", disabled: false, selected: false, hidden: false },

    {  label: "Hidden", disabled: false, selected: false, hidden: false },

    {  label: "Disable", disabled: false, selected: false, hidden: false },

    {  label: "Default", disabled: false, selected: false, hidden: false },

    {  label: "Required", disabled: false, selected: false, hidden: false },

    {  label: "Read Only", disabled: false, selected: false, hidden: false },

    {  label: "Visible", disabled: false, selected: false, hidden: false },

]
  login() {
    this.router.navigate(['/protected/ruleset']);
  }
    
    update(e: { target: { value: (extras: any, event: any) => void; }; }){
      this.selected = e.target.value
    }

    addCondition = {
      dropdownItems: [
        { title: 'Add condition', icon: '', divider: false, dropdownItemStyle: '', action: staticActions.ADD_CONDITION },
      ],
      button: { icon: 'icon-add', style: 'btn-icon-only btn-outline-primary circle' }

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
    return this.rulesetUtilsService.getSelectedItem(selectedItem, this['screnJson']);
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
  get intervalActions() {
    return this.status == false ? ACTIONS_INTERVAL : [];
  }

  setItem(object: any, compareIndex: number, position: string) {
    if (this.selectedRule && this.selectedRule?.when && this.selectedRule?.when?.compares) {
      if (position === positions.LEFT) {
        this.selectedRule.when.compares[compareIndex].leftHandSide = new HandSide();
       
      }
      else if (position === positions.RIGHT) {
        this.selectedRule.when.compares[compareIndex].rightHandSide = new HandSide();
       
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
  getSelectedIntervalAction(actionObject: any, condition: Condition) {
    this.rulesetUtilsService.getSelectedIntervalAction(actionObject, condition);
  }
  getRightVocabularyList(compare: Compare): any[] {
    if (this.selectedRule?.when?.compares) {
      if (compare.leftHandSide?.source === staticValues.INPUT) {
        let vocabulary = this.vocabularyList.find((vocabulary: { id: string | undefined; }) => vocabulary.id === compare.leftHandSide?.id);
        return this['vocabularyService'].getVocabulariesByType(this.vocabularyList, vocabulary?.type!)
      } else {
        return this.vocabularyList;
      }
    } else {
      return this.vocabularyList;
    }
  }
  getOperators(compare: Compare): any[] {
    // return this.utilsService.getOperators(compare, this.vocabularyList)
    return []
  }
  getNotOperator(compareIndex: number) {
    return this.selectedRule.when!.compares![compareIndex].notOperator = !this.selectedRule.when!.compares![compareIndex].notOperator;
  }
vocabulary:any;
  getVocabularies() {

this.componentService.onChangeComponents.subscribe(data=>{
  console.log(data)
  this.vocabularyList=[]
  data.forEach((element:any)=>{
      let vocab = {name : "",value:"",id:'',type:""};
      
  vocab.name  = element.en.display;
  vocab.value = element.en.display;
  this.vocabularyList.push(vocab);
  })
})
// this.fields.forEach((field: any) => {
//   let vocab = {name : "",value:"",id:'',type:""};
//   vocab.name  = field.en.display;
//   vocab.value = field.en.display;
//   this.vocabularyList.push(vocab);
// });
 }

 getAction(event:any){
  console.log(event)
  this.componentService.getAction(event.label)
 }

    
}

