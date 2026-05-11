import { ResourcePolicy } from './resource';
import { ActivityTask, EvaluationTask } from './task';

/**
 * Defines the behavior and execution type of a stage.
 */
export enum StageType {
  /** Represents a stage that performs a specific task or action. */
  activity = 'activity',
  /** Represents a stage that evaluates conditions to determine the next stage to execute. */
  evaluation = 'evaluation',
  /** Represents a dynamic flow expansion point. */
  virtual = 'virtual',
}

/**
 * The stage configuration contains the implementation and parameters required to execute the stage.
 */
export interface StageConfiguration {
  /** The implementation name of the stage. */
  readonly implementation: string;
  /** The stage parameters. */
  readonly parameters: Record<string, unknown>;
  /** The resource policy for the stage. */
  readonly resourcePolicy?: ResourcePolicy;
  /** Whether to persist the stage result in the transaction context. */
  readonly persistContext: boolean;
}

/**
 * The stage is the main unit of work in the flow. Every stage is unique and 
 * contains all the information required to execute it.
 */
export abstract class Stage {
  /** The type identifier for the stage. */
  readonly type: string;
  /** The unique identifier of this stage. */
  readonly id: string;
  /** A human-readable name for the stage. */
  readonly name: string;
  /** Additional metadata for the stage execution. */
  readonly metadata: Record<string, unknown>;
  /** The configuration and implementation parameters of the stage. */
  readonly configuration: StageConfiguration;

  constructor(
    type: string,
    id: string,
    name: string,
    metadata: Record<string, unknown>,
    configuration: StageConfiguration
  ) {
    this.type = type;
    this.id = id;
    this.name = name;
    this.metadata = metadata;
    this.configuration = configuration;
  }
}

/**
 * The Activity is a type of stage that contains a list of tasks to be executed 
 * in parallel or sequentially.
 */
export class Activity extends Stage {
  /** The list of tasks to execute in this activity. */
  readonly activityTasks: ReadonlyArray<ActivityTask>;
  /** Indicates whether the tasks should be executed in parallel. */
  readonly parallel: boolean;
  /** The ID of the subsequent stage to transition to. Undefined if it's the last stage. */
  readonly outgoing?: string;
  /** True if all tasks must succeed for the activity to completely succeed. */
  readonly allOrNothing: boolean;

  constructor(
    id: string,
    name: string,
    metadata: Record<string, unknown>,
    configuration: StageConfiguration,
    activityTasks: ReadonlyArray<ActivityTask>,
    parallel: boolean,
    outgoing: string | undefined,
    allOrNothing: boolean
  ) {
    super(StageType.activity, id, name, metadata, configuration);
    this.activityTasks = activityTasks;
    this.parallel = parallel;
    this.outgoing = outgoing;
    this.allOrNothing = allOrNothing;
  }
}

/**
 * Evaluated during the execution of an EvaluationTask; it contains an expression
 * that defines which stage to transition to if the condition is met.
 */
export interface Condition {
  /** The logical expression to evaluate. */
  readonly expression: string;
  /** The target stage ID if the expression passes. */
  readonly outgoing: string;
}

/**
 * Evaluation is a specialized type of Stage that contains logic to determine the 
 * next stage to execute based on certain conditions.
 */
export class Evaluation extends Stage {
  /** The task executed to perform the evaluation logic. */
  readonly evaluationTask: EvaluationTask;
  /** The ordered list of conditions to check against the evaluation result. */
  readonly conditions: ReadonlyArray<Condition>;
  /** The stage to default to if no conditions match. */
  readonly defaultOutgoing: string;

  constructor(
    id: string,
    name: string,
    metadata: Record<string, unknown>,
    configuration: StageConfiguration,
    evaluationTask: EvaluationTask,
    conditions: ReadonlyArray<Condition>,
    defaultOutgoing: string
  ) {
    super(StageType.evaluation, id, name, metadata, configuration);
    this.evaluationTask = evaluationTask;
    this.conditions = conditions;
    this.defaultOutgoing = defaultOutgoing;
  }
}

/**
 * A Virtual stage represents a dynamic flow expansion point.
 * It executes an activity task to generate a new flow, then jumps into it.
 */
export class Virtual extends Stage {
  /** The activity task that fetches or generates the dynamic flow. */
  readonly activityTask: ActivityTask;
  /** The stage to continue to after returning from the dynamic flow. */
  readonly outgoing?: string;

  constructor(
    id: string,
    name: string,
    metadata: Record<string, unknown>,
    configuration: StageConfiguration,
    activityTask: ActivityTask,
    outgoing?: string
  ) {
    super(StageType.virtual, id, name, metadata, configuration);
    this.activityTask = activityTask;
    this.outgoing = outgoing;
  }
}

/**
 * Configuration for virtual stage processing, defining the keys used to extract
 * jump information from task results.
 */
export interface VirtualStageConfiguration {
  /** The key indicating the flow ID to jump to. */
  readonly flowIdKey: string;
  /** The key representing the request mapping in the evaluation payload. */
  readonly requestMappingKey: string;
  /** The key representing the response mapping to return to the active context. */
  readonly responseMappingKey: string;
}
