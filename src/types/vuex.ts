import { ActionContext, Store } from "vuex";

/**
 * Enhanced type definition for Vuex ActionHandler
 */
export type ActionHandler<S, R, P> = (
  this: Store<R>,
  injectee: ActionContext<S, R>,
  payload: P
) => any;

/**
 * Enhanced type definition for Vuex ActionObject
 */
export interface ActionObject<S, R, P> {
  root?: boolean;
  handler: ActionHandler<S, R, P>;
}

/**
 * Enhanced type definition for Vuex Action
 */
export type Action<S, R, P> = ActionHandler<S, R, P> | ActionObject<S, R, P>;

/**
 * Enhanced type definition for Vuex Mutation
 */
export type Mutation<S, P> = (this: Store<S>, state: S, payload: P) => void;
