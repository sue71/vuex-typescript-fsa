import { ActionTree, MutationTree } from "vuex";
import { ActionCreator, PayloadType } from "./action-creator";
import { Action, Mutation } from "./types/vuex";
import { FSA } from "./types/fsa";

/**
 * Create action handler with type annotation
 */
export function action<S, R, A extends ActionCreator<any>>(
  actionCreator: A,
  action: Action<S, R, FSA<PayloadType<A>>>
): ActionTree<S, R> {
  return {
    [actionCreator.type]: action
  };
}

/**
 * Create mutation handler with type annotation
 */
export function mutation<S, A extends ActionCreator<any>>(
  actionCreator: A,
  mutation: Mutation<S, FSA<PayloadType<A>>>
): MutationTree<S> {
  return {
    [actionCreator.type]: mutation
  };
}

/**
 * Combine action handlers as a ActionTree
 */
export function combineAction<S, R>(
  ...actions: ActionTree<S, R>[]
): ActionTree<S, R> {
  return actions.reduce((res, v) => Object.assign(res, v), {});
}

/**
 * Combine mutation handlers as a ActionTree
 */
export function combineMutation<S>(
  ...mutations: MutationTree<S>[]
): MutationTree<S> {
  return mutations.reduce((res, v) => Object.assign(res, v), {});
}
