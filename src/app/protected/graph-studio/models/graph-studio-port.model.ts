import { PortModel, ValueState, PortModelOptions, createValueState } from 'acp-ui-component';

export class GraphStudioPortModel extends PortModel {
  direction$: ValueState<'in' | 'out'>;
  constructor(options: PortModelOptions & { direction?: 'in' | 'out' }) {
    super({
      ...options,
      namespace: 'graph-studio',
      linkNamespace: 'graph-studio',
    });

    this.direction$ = createValueState(options.direction ?? 'in');
    this.setCanCreateLinks(this.direction$.value === 'out');
  }

  override canLinkToPort(port: GraphStudioPortModel) {
    if (port.getParent() === this.getParent()) {
      return false;
    }

    return true;
  }
}
