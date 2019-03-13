import { FSA, FluxType } from "./types/fsa";
import { makeType } from "./utils";

/**
 * Definition for annotating type parameter
 */
export type PayloadType<T> = T extends ActionCreator<infer R> ? R : never;
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

/**
 * Factory function for Action
 * ActionCreator also have action type
 *
 * @example
 * export const Login = actionCreator<string[]>("LOGIN");
 * Login(["foo", "bar"])
 */
export interface ActionCreator<Payload = void> {
  type: FluxType;
  namespace: string;
  (payload: Payload, options?: FSAOptions): FSA<Payload>;
}

export interface FSAOptions {
  namespace?: string;
  error?: boolean;
  meta?: any;
}

export interface ActionCreatorOptions {
  prefix?: string;
  namespace?: string;
}

/**
 * Factory function for create ActionCreator
 * @param type
 */
export function actionCreator<Payload = void>(
  type: FluxType,
  creatorOptions: ActionCreatorOptions = {}
): ActionCreator<Payload> {
  // make full type
  const fullType = makeType(type, creatorOptions && creatorOptions.prefix);
  return (Object.assign(
    (payload: Payload, options: FSAOptions = {}): FSA<Payload> => {
      return {
        type: options.namespace ? makeType(type, options.namespace) : fullType,
        payload,
        error: options.error,
        meta: options.meta
      };
    },
    {
      type: fullType,
      namespace: creatorOptions.namespace
    }
  ) as unknown) as ActionCreator<Payload>;
}

/**
 * Factory function for create ActionCreator
 * @param type
 */
export function actionCreatorFactory(
  options: ActionCreatorOptions | string
): typeof actionCreator {
  if (typeof options === "string") {
    return (type: FluxType) => actionCreator(type, { namespace: options });
  }
  return (type: FluxType) => actionCreator(type, options);
}
