import {
  createValueState,
  NodeModel,
  NodeModelOptions,
  ValueState,
} from 'acp-ui-component';

export enum NodeStatus {
  DEFAULT = 'default',
  WARNING = 'warning',
  ERROR = 'error',
}

export class GraphStudioNodeModel extends NodeModel {
  status$: ValueState<NodeStatus>;

  constructor(options: NodeModelOptions) {
    super({
      ...options,
      namespace: 'graph-studio',
    });

    this.status$ = createValueState<NodeStatus>(NodeStatus.DEFAULT);
  }

  selectStatus() {
    return this.status$.select();
  }

  setStatus(status: NodeStatus) {
    this.status$.set(status);
  }
}
