/**
 * The task processor encapsulates the identifier of a task and its additional parameters 
 * to be executed from an activity.
 */
export interface TaskProcessor {
  /** The identifier of the task. */
  readonly task: string;
  /** Additional parameters or context required for the task. */
  readonly metadata: Record<string, unknown>;
}

/**
 * The compensation task contains the information necessary to pre-process the input request 
 * of a task, then execute it and finally post-process its response.
 */
export interface CompensationTask {
  /** The task ID or task reference to handle compensation. */
  readonly task: string;
  /** A human readable name for the compensation step. */
  readonly name: string;
  /** The pre-processing instructions to prepare the task input. */
  readonly preProcessor?: TaskProcessor;
  /** The post-processing instructions to process the task output. */
  readonly postProcessor?: TaskProcessor;
  /** The processor responsible for input/output interpolation. */
  readonly interpolator?: TaskProcessor;
  /** Additional parameters and settings. */
  readonly metadata: Record<string, unknown>;
}

/**
 * The activity task contains the information necessary to pre-process the input request 
 * of a task, then execute it and finally post-process its response, while recording its compensation.
 */
export interface ActivityTask {
  /** The unique identifier of this task mapping. */
  readonly id: string;
  /** The human-readable name of the activity task. */
  readonly name: string;
  /** The ID of the actual executor task implementation. */
  readonly task: string;
  /** Instructions for preprocessing payload before execution. */
  readonly preProcessor?: TaskProcessor;
  /** Instructions to process the resulting payload from execution. */
  readonly postProcessor?: TaskProcessor;
  /** Define compensation if this step must be reverted later. */
  readonly compensation?: CompensationTask;
  /** Interpolator defining how context is passed into and aggregated from this task. */
  readonly interpolator?: TaskProcessor;
  /** Meta information for the executor. */
  readonly metadata: Record<string, unknown>;
}

/**
 * Represents an evaluation task within an Evaluation stage in a workflow.
 * An EvaluationTask is a description of the task that will be executed during the evaluation process.
 */
export interface EvaluationTask {
  /** Unique ID for this evaluation step. */
  readonly id: string;
  /** The readable name for the evaluation task. */
  readonly name: string;
  /** The task ID specifying the evaluation logic mechanism. */
  readonly task: string;
  /** Pre-execution manipulation of the context. */
  readonly preProcessor?: TaskProcessor;
  /** Data interpolator logic. */
  readonly interpolator?: TaskProcessor;
  /** Standard metadata collection. */
  readonly metadata: Record<string, unknown>;
}
