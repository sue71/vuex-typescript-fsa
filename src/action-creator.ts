export type FluxType = string;

/**
 * Action conformed to FSA
 */
export interface FSA<Payload = void> {
  readonly type: FluxType;
  payload: Payload;
  error?: boolean;
  meta?: any;
}

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
  (payload: Payload, options?: ActionCreator.Options): FSA<Payload>;
}

export namespace ActionCreator {
  export interface Options {
    namespace?: string;
    error?: boolean;
    meta?: any;
  }
}

/**
 * Factory function for create ActionCreator
 * @param type
 */
export function actionCreatorFactory(
  prefix: string | undefined
): typeof actionCreator {
  return (type: FluxType) => actionCreator(type, prefix);
}

/**
 * Factory function for create ActionCreator
 * @param type
 */
export function actionCreator<Payload = void>(
  type: FluxType,
  prefix: string | undefined = undefined
): ActionCreator<Payload> {
  return (Object.assign(
    (payload: Payload, options: ActionCreator.Options): FSA<Payload> => {
      const namespace =
        options && options.namespace ? options.namespace : prefix;
      return {
        type: namespace ? `${namespace}/${type}` : type,
        payload,
        error: options && options.error,
        meta: options && options.meta
      };
    },
    {
      type
    }
  ) as unknown) as ActionCreator<Payload>;
}
