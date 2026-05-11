/**
 * Type of resource limit evaluation.
 */
export enum LimitType {
  /** Evaluated against total lifecycle consumption (sum of all checkpoints). */
  ACCUMULATIVE = 'ACCUMULATIVE',
  /** Evaluated against current execution metrics only. */
  INSTANT = 'INSTANT',
}

/**
 * Comparison operators for resource limits.
 */
export enum ResourceOperator {
  /** Less than */
  LT = 'LT',
  /** Greater than */
  GT = 'GT',
  /** Equal to */
  EQ = 'EQ',
  /** Less than or equal to */
  LTE = 'LTE',
  /** Greater than or equal to */
  GTE = 'GTE',
}

/**
 * A single resource constraint on a specific metric.
 */
export interface ResourceLimit {
  /** The name of the metric to constrain (e.g., 'sys.cost'). */
  readonly metricName: string;
  /** The comparison operator to apply. */
  readonly operator: ResourceOperator;
  /** The limit value to compare against. */
  readonly threshold: number;
  /** Whether the limit is accumulative or instant. */
  readonly limitType: LimitType;
}

/**
 * Defines resource limits that can be applied at Flow, Stage, or Task level.
 */
export interface ResourcePolicy {
  /** The list of resource limits to enforce. */
  readonly limits: ReadonlyArray<ResourceLimit>;
}
