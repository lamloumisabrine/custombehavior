import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MenuItem } from 'acp-ui-component/lib/modules/menu/models/menu-item';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'custombehavior';
   /**
   * template reference of policy modal
   */
  modalPolicyTemplateRef!: TemplateRef<any>;
  /** 
   * If false modal will not be dislayed
   */
  @Input() isOpenSidebar: boolean = false;

  @Output() sideBarStatus = new EventEmitter();

  //#region constant displayed objects

  
  //#endregion

  ngOnInit(): void {
  }
  

  openCloseSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
    this.sideBarStatus.emit(this.isOpenSidebar);
  }

  

  



}
