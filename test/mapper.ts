import {
  actionCreator,
  mapActions,
  createNamespacedHelpers,
  mapMutations
} from "../src";
import Vue from "vue";
import Vuex, { Store, Module } from "vuex";

describe("mapper", () => {
  const Action = actionCreator("action");
  const NamespacedAction = actionCreator("action", {
    namespace: "b"
  });

  const root: Module<{ value: string }, any> = {
    modules: {
      a: {
        namespaced: false,
        actions: {
          action: jest.fn() as any
        },
        mutations: {
          action: jest.fn() as any
        }
      },
      b: {
        namespaced: true,
        actions: {
          action: jest.fn() as any
        },
        mutations: {
          action: jest.fn() as any
        }
      }
    }
  };

  Vue.use(Vuex);

  const namespacedHelper = createNamespacedHelpers("b");
  const store = new Store<any>(root);

  const view = new Vue({
    store,
    methods: {
      ...mapActions({
        action: Action
      }),
      ...namespacedHelper.mapActions({
        namespacedAction: Action
      }),
      ...mapActions({
        fixedNamespacedAction: NamespacedAction
      }),
      ...mapMutations({
        mutation: Action
      }),
      ...namespacedHelper.mapMutations({
        namespacedMutation: Action
      }),
      ...mapMutations({
        fixedNamespacedMutation: NamespacedAction
      })
    }
  });

  describe("simple module", () => {
    test("map action", () => {
      expect(view.action).toBeDefined();
    });
    test("map mutation", () => {
      expect(view.mutation).toBeDefined();
    });
    test("dispatch action", () => {
      view.action();
      expect(root.modules!.a!.actions!["action"]).toHaveBeenCalled();
    });
    test("dispatch mutation", () => {
      view.mutation();
      expect(root.modules!.a!.mutations!["action"]).toHaveBeenCalled();
    });
  });

  describe("namespaced module", () => {
    test("map action", () => {
      expect(view.namespacedAction).toBeDefined();
    });
    test("map mutation", () => {
      expect(view.namespacedMutation).toBeDefined();
    });
    test("disptch action", () => {
      view.namespacedAction();
      expect(root.modules!.b!.actions!["action"]).toHaveBeenCalled();
    });
    test("dispatch action with fixed namespace", () => {
      view.fixedNamespacedAction();
      expect(root.modules!.b!.actions!["action"]).toHaveBeenCalled();
    });
    test("dispatch mutation", () => {
      view.namespacedMutation();
      expect(root.modules!.b!.mutations!["action"]).toHaveBeenCalled();
    });
    test("dispatch mutation with fixed namespace", () => {
      view.fixedNamespacedAction();
      expect(root.modules!.b!.mutations!["action"]).toHaveBeenCalled();
    });
  });
});
