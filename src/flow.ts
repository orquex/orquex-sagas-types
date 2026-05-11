import { ResourcePolicy } from './resource';
import { Stage } from './stage';

/**
 * The flow configuration contains the flow timeout and the all-or-nothing flag required to handle
 * the flow behavior.
 */
export interface FlowConfiguration {
  /** The flow timeout, e.g., 'PT1M'. By default, it is 1 minute. */
  readonly timeout: string;
  /** The all-or-nothing flag. True if the flow must execute entirely successfully. */
  readonly allOrNothing: boolean;
  /** The recover-from-failure flag. Indicates if the flow can attempt error recovery. */
  readonly recoverFromFailure: boolean;
  /** The temporary flag. */
  readonly temporary: boolean;
  /** Optional timestamp when the flow definition expires. */
  readonly expiresAt?: string;
  /** The resource policy for the flow. */
  readonly resourcePolicy?: ResourcePolicy;
}

/**
 * The flow is the sagas' definition, every flow is unique and contains all the stages required to execute it.
 */
export interface Flow {
  /** A required unique identifier for the flow. */
  readonly id: string;
  /** The logical key the flow belongs to (e.g., 'onboarding'). */
  readonly key: string;
  /** The informational version of the flow. */
  readonly version: string;
  /** A human-readable name for the flow. */
  readonly name: string;
  /** The required initial stage ID to start the flow. */
  readonly initialStage: string;
  /** A required map containing all the stages required to execute the flow. */
  readonly stages: Record<string, Stage>;
  /** A map containing additional information about the flow. */
  readonly metadata: Record<string, unknown>;
  /** The flow's configuration describing its execution behavior. */
  readonly configuration: FlowConfiguration;
}
