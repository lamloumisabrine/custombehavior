import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DefaultPortComponent, MODEL } from 'acp-ui-component';
import { GraphStudioPortModel } from '../../models/graph-studio-port.model';

@Component({
  selector: 'graph-studio-port',
  templateUrl: './graph-studio-port.component.html',
  styleUrls: ['./graph-studio-port.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphStudioPortComponent
  extends DefaultPortComponent
  implements OnInit {
  constructor(
    @Inject(MODEL) public override model: GraphStudioPortModel,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    super(model);
  }

  override ngOnInit() {
    super.ngOnInit();
    // this.updatePortRootStyle();
  }
  // updatePortRootStyle() {
  //   const rootEl = this.elRef.nativeElement;
  //   this.renderer.addClass(rootEl, this.model.direction$.value);
  // }
  
 
}
