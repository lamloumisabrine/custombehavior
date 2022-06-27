import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MODEL, LabelModel } from 'acp-ui-component';
import { GraphService } from 'src/app/core/services/graph.service';

@Component({
  selector: 'graph-studio-label',
  templateUrl: './graph-studio-label.component.html',
  styleUrls: ['./graph-studio-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphStudioLabelComponent implements OnInit {
  constructor(
    @Inject(MODEL) public model: LabelModel,
    private cdRef: ChangeDetectorRef,
    private graphService: GraphService
  ) {}

  ngOnInit() {
    this.model.selectCoords().subscribe(() => {
      this.cdRef.detectChanges();
    });

    this.model
      .getParent()
      .selectHovered()
      .subscribe(() => {
        this.onHover();
      });

    this.model.setPainted(true);
  }

  onHover(): void {
    this.cdRef.detectChanges();
  }

  deleteLink(): void {
    const link = this.model.getParent();
    this.graphService.deleteLink.next(link)
    link.destroy();
  }
}
