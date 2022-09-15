import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CBApiService} from '../api-services/CB-api.service';
import { ComponentsService} from './components.service';


@Injectable({
  providedIn: 'root'
})
export class CustomBehaviorService {
  idCustom: any
  idCondition: any
  idCompare: any
  idLHS: any
  idRHS: any
  idComponent: any
  idAction: any
  screen: any


  constructor(private service: CBApiService, private componentService: ComponentsService, private http: HttpClient) {
    this.componentService.onChangeScreen.subscribe((data: any) => {
      console.log(data)
      this.screen = data.screenreference
    })

  }


  addCustom(data: any): Promise < any > {
    return new Promise((resolve, reject) => {
      console.log(data)
      this.service.addCustomBehavior(data).subscribe((custom: any) => {
        console.log(custom)
        resolve(custom.customBehaviorID)
      })

    })




  }

  addCondition(data: any): Promise < any > {
    return new Promise((resolve, reject) => {

      this.service.addCondition(data).subscribe((condition: any) => {
        resolve(condition.conditionID)
      })
    })


  }
  addCompare(data: any): Promise < any > {
    return new Promise((resolve, reject) => {
      this.service.addcompare(data).subscribe((compare: any) => {
        resolve(compare.compareID)
      })
    })


  }

  addLHS(data: any): Promise < any > {
    return new Promise((resolve, reject) => {
      this.service.addLHS(data).subscribe((LHS: any) => {
       resolve(LHS.lhsID) 

      })
    })

  }

  addRHS(data: any): Promise < any > {
    return new Promise((resolve, reject) => {
      this.service.addRHS(data).subscribe((RHS: any) => {
        this.idLHS = RHS.rhsID

      })
    })
  }

  addComponent(data: any): Promise < any > {
    return new Promise((resolve, reject) => {
      this.service.addComponent(data).subscribe((component: any) => {
        resolve(component.componentID)
      })
    })


  }
  addAction(data: any): Promise < any > {
    return new Promise((resolve, reject) => {
      this.service.addAction(data).subscribe((action: any) => {
        console.log(action.actionID)
        resolve(action.actionID)
      })
    })

  }



  async addNode(data: any) {
    console.log(data)

    try {
      let custom = {
        CustomBehaviorShortName: this.screen
      }
      console.log(custom)
      const customs = await this.addCustom(custom).then((id) => {
        this.idCustom = id
      })
    } catch (error) {
      console.error(error);
    }
    try {
      console.log(this.idCustom)
      let condition = {
        conditionDisplay: "",
        logicalOperator: data.logicalOperator,
        customBehaviorID: this.idCustom

      }
      const cond = await this.addCondition(condition).then((id) => {
        this.idCondition = id
      })
      /************** */
      console.log(data.actions)
     this.actions(data.actions, this.idCondition)
      this.compares(data.compares)
      /************ */
      if (data?.conditions.length>0) {
        console.log(data.conditions)
        this.conditions(data.conditions, this.idCondition)
      }
    } catch (error) {
      console.error(error);
    }




  }

  /////////*****************conditions*********************** */

  condition(data: any): Promise < any > {
    return new Promise(async (resolve, reject) => {
      if (data) {
        let condition = {
          conditionDisplay: "",
          logicalOperator: data.data.logicalOperator,
          ParentID: data.id,
          customBehaviorID: this.idCustom
        }
        this.addCondition(condition).then((id) => {
          this.idCondition = id
          
        })
        this.actions(data.data.actions, this.idCondition)
        console.log(data.data.compares)
        this.compares(data.data.compares)



      }
      if (data.data.conditions) {
        this.conditions(data.data.conditions, this.idCondition)
      }


    })



  }

  conditions(data: any[], parentID: any): Promise < any > {
    return new Promise((resolve, reject) => {
      data.forEach(async (element) => {
        let condition = {
          data: element,
          id: parentID,
        }
        const cond = await this.condition(condition)
      })

    })




  }


  //////////////******************compares*************************** */
  compare(data: any,index:any): Promise < any > {
    return new Promise(async (resolve, reject) => {
      try {
      console.log(data)
        let comp = {
          operator: data.operator,
          conditionId: this.idCondition
        }
        console.log(comp)
        this.addCompare(comp).then((compId) => {
        this.idCompare=compId
          let leftcomponent = {
            componentDisplay: data.leftHandSide.value,
            componentType: data.leftHandSide.value,
            actionID: this.idAction
          }
          console.log(leftcomponent)
          this.addComponent(leftcomponent).then((comp) => {
            this.idComponent = comp;
            this.lhs(this.idComponent, this.idCompare)
          })



          let rightcomponent = {
            componentType: data.rightHandSide.value,
            componentDisplay: data.rightHandSide.value,
            actionID: this.idAction
          }
          console.log(data.rightHandSide.value)
          this.addComponent(rightcomponent).then(comp => {
              this.idComponent = comp
              this.rhs( data.rightHandSide.value,this.idCompare)
            })

        })






      } catch (error) {
        console.error(error)
      }
    })

  }

  compares(data: any[]): Promise < any > {
    return new Promise(async (resolve, reject) => {
      data.forEach(async (element,index) => {
        console.log(element)
       this.compare(element,index)

      })

    })

  }

  lhs(idComp:any, idCompare: any): Promise < any > {
    return new Promise(async (resolve, reject) => {
      let lefths = {
        ComponentID: idComp,
        CompareID: idCompare
      }
      this.addLHS(lefths)

    })


  }
  rhs(data:any, idCompare: any): Promise < any > {
    return new Promise(async (resolve, reject) => {
      let rightths = {
        CompareID: idCompare,
        value:data
      }
      this.addRHS(rightths)

    })

  }

  ////////////***************actions**************** */

  actions(data: any[], idCondition: any): Promise < any > {
    return new Promise(async (resolve, reject) => {
      this.componentService.onChangeAction.subscribe(data => {
        let action = {
          actionDisplay: data,
          value: data,
          actionTypeID:data,
          conditionID: idCondition
        }
  
         this.action(action)
       
      })

     
    })


  }
  action(data: any): Promise < any > {
    return new Promise(async (resolve, reject) => {
      this.addAction(data).then((act: any) => {
        this.idAction = act
      })
    })
    

  }


}
