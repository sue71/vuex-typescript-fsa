import { ActionCreator, PayloadType } from "./action-creator";

export type Mappable = Record<string, ActionCreator<any>>;

export function mapActions<T extends Mappable>(
  map: T,
  namespace?: string
): {
  [K in keyof T]: (payload: PayloadType<T[K]>) => Promise<object> | object
} {
  return Object.keys(map)
    .map(v => ({ key: v, action: map[v] }))
    .reduce((acc, item) => {
      const action = item.action;
      return {
        ...acc,
        [item.key]: function(this: any, payload: any) {
          return this.$store.dispatch(
            action(payload, {
              namespace: namespace || action.namespace
            })
          );
        }
      };
    }, {}) as any;
}

export function mapMutations<T extends Mappable>(
  map: T,
  namespace?: string
): { [K in keyof T]: (payload: PayloadType<T[K]>) => void } {
  return Object.keys(map)
    .map(v => ({ key: v, action: map[v] }))
    .reduce((acc, item) => {
      const action = item.action;
      return {
        ...acc,
        [item.key]: function(this: any, payload: any) {
          return this.$store.commit(
            action(payload, {
              namespace: namespace || action.namespace
            })
          );
        }
      };
    }, {}) as any;
}

export const createNamespacedHelpers = (namespace: string) => ({
  mapMutations: <T extends Mappable>(map: T) => mapMutations(map, namespace),
  mapActions: <T extends Mappable>(map: T) => mapActions(map, namespace)
});
