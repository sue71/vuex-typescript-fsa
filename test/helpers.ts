import { actionCreator } from "../src/action-creator";
import { action, combineAction, combineMutation, mutation } from "../src";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import { ActionObject } from "../src/helpers";

describe("helpers", () => {
  const Action = actionCreator<string[]>("ACTION");
  const Action2 = actionCreator<string[]>("ACTION2");

  describe("#action", () => {
    test("type is ACTION", () => {
      const tree = action(Action, () => {});
      expect(Object.keys(tree)[0]).toEqual("ACTION");
    });

    test("return action handler", () => {
      const tree = action(Action, {
        root: true,
        handler: function() {}
      });
      expect((tree["ACTION"] as ActionObject<any, any, any>).root).toBeTruthy();
      expect(
        (tree["ACTION"] as ActionObject<any, any, any>).handler
      ).toBeDefined();
    });
  });

  describe("#combineAction", () => {
    test("return ActionTree", () => {
      const tree = action(Action, () => {});
      const tree2 = action(Action2, () => {});
      const tree3 = combineAction(tree, tree2);
      const keys = Object.keys(tree3);
      expect(keys).toEqual(["ACTION", "ACTION2"]);
    });
  });

  describe("#combineMutation", () => {
    test("return MutationTree", () => {
      const tree = action(Action, () => {});
      const tree2 = action(Action2, () => {});
      const tree3 = combineAction(tree, tree2);
      const keys = Object.keys(tree3);
      expect(keys).toEqual(["ACTION", "ACTION2"]);
    });
  });

  describe("#vuex", () => {
    Vue.use(Vuex);
    interface Counter {
      value: number;
    }
    const Add = actionCreator<number>("ADD");

    test("bind this for combineAction", () => {
      const store = new Store<Counter>({
        state: {
          value: 0
        },
        actions: combineAction(
          action(Add, function() {
            expect(this.state.value).toEqual(0);
          })
        )
      });
      store.dispatch(Add(1));
    });

    test("refer payload inside action handler", () => {
      const store = new Store<Counter>({
        state: {
          value: 0
        },
        actions: combineAction(
          action(Add, function(_, action) {
            expect(action.payload).toEqual(1);
          })
        )
      });
      store.dispatch(Add(1));
    });

    test("call async action", next => {
      const store = new Store<Counter>({
        state: {
          value: 0
        },
        actions: combineAction(
          action(Add, async function(_, action) {
            setTimeout(() => {
              expect(this.state.value).toEqual(0);
              expect(action.payload).toEqual(1);
              next();
            }, 1000);
          })
        )
      });
      store.dispatch(Add(1));
    });

    test("update state in combineMutation", () => {
      const store = new Store<Counter>({
        state: {
          value: 0
        },
        mutations: combineMutation(
          mutation(Add, function(state, action) {
            state.value = action.payload;
          })
        )
      });
      store.commit(Add(1));
      expect(store.state.value).toEqual(1);
    });

    test("dispatch namspaced action", () => {
      const store = new Store({
        modules: {
          local: {
            namespaced: true,
            actions: combineAction(
              action(Action, function(context, action) {
                context.commit(Action(action.payload));
              })
            ),
            mutations: combineMutation(
              mutation(Action, function(_, action) {
                expect(action.payload).toEqual(["foo"]);
              })
            )
          }
        },
        actions: combineAction(
          action(Action, function() {
            fail();
          })
        ),
        mutations: combineMutation(
          mutation(Action, function() {
            fail();
          })
        )
      });
      store.dispatch(Action(["foo"], { namespace: "local" }));
    });

    test("dispatch non-namespaced action", () => {
      const store = new Store({
        modules: {
          local: {
            namespaced: true,
            actions: combineAction(
              action(Action, function() {
                fail();
              })
            ),
            mutations: combineMutation(
              mutation(Action, function() {
                fail();
              })
            )
          }
        },
        actions: combineAction(
          action(Action, function(context, action) {
            context.commit(Action(action.payload));
          })
        ),
        mutations: combineMutation(
          mutation(Action, function(_, action) {
            expect(action.payload).toEqual(["foo"]);
          })
        )
      });
      store.dispatch(Action(["foo"]));
    });

    test("dispatch action with root options", () => {
      const store = new Store<Counter>({
        modules: {
          local: {
            namespaced: true,
            actions: combineAction(
              action(Add, {
                root: true,
                handler(context, action) {
                  expect(action.payload).toEqual(1);
                  context.commit(action, { root: true });
                }
              })
            )
          }
        },
        mutations: combineMutation(
          mutation(Add, function(state, action) {
            state.value += action.payload;
          })
        ),
        state: {
          value: 0
        }
      });
      store.dispatch(Add(1));
      expect(store.state.value).toEqual(1);
    });
  });
});
