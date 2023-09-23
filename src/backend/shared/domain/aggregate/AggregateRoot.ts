export abstract class AggregateRoot<T extends { id: string }> {
  readonly isAggregateRoot: boolean;
  protected _attributes: T;

  constructor(attributes: T) {
    this._attributes = attributes;
    this.isAggregateRoot = true;
  }
}
