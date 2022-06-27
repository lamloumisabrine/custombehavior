import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  MODEL,
  LinkModel,
  DefaultLinkComponent,
  LabelModel,
} from 'acp-ui-component';

@Component({
  selector: 'graph-studio-link',
  templateUrl: './graph-studio-link.component.html',
  styleUrls: ['./graph-studio-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphStudioLinkComponent extends DefaultLinkComponent {
  @ViewChild('labelLayer', { read: ViewContainerRef, static: true }) 
  labelLayers!: ViewContainerRef;

  constructor(
    @Inject(MODEL) public override model: LinkModel,
    cdRef: ChangeDetectorRef
  ) {
    super(model, cdRef);
    this.model.setLabel(new LabelModel({ namespace: 'graph-studio' }));
  }
}
