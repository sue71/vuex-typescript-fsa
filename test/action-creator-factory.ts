import { actionCreatorFactory } from "../src/action-creator";
import { combineMutation, mutation } from "../src";
import Vue from "vue";
import Vuex, { Store } from "vuex";

describe("helpers", () => {
  describe("#vuex", () => {
    Vue.use(Vuex);
    interface Counter {
      value: number;
    }

    test("test no prefix actionCreatorFactory", () => {
      const actionCreator = actionCreatorFactory()
      const actionType = "COUNT_UP"
      const CountUp = actionCreator(actionType);
      expect(CountUp.type).toEqual(actionType);

      const store = new Store<Counter>({
        state: {
          value: 0
        },
        mutations: combineMutation(
          mutation(CountUp, (state) => {
            state.value++;
          })
        )
      });
      store.commit(CountUp());
      expect(store.state.value).toEqual(1);
      store.commit(CountUp());
      expect(store.state.value).toEqual(2);
    });

    test("test has prefix actionCreatorFactory", () => {
      const prefix = "THIS_IS_PREFIX"
      const actionCreator = actionCreatorFactory(prefix)
      const actionType = "COUNT_UP"
      const CountUp = actionCreator(actionType);
      expect(CountUp.type).toEqual(`${prefix}/${actionType}`);

      const store = new Store<Counter>({
        state: {
          value: 0
        },
        mutations: combineMutation(
          mutation(CountUp, (state) => {
            state.value++;
          })
        )
      });
      store.commit(CountUp());
      expect(store.state.value).toEqual(1);
      store.commit(CountUp());
      expect(store.state.value).toEqual(2);
    });

    test("test has nested prefix actionCreatorFactory", () => {
      const prefix = "THIS_IS_PREFIX/NESTED"
      const actionCreator = actionCreatorFactory(prefix)
      const actionType = "COUNT_UP"
      const CountUp = actionCreator<void>(actionType);
      expect(CountUp.type).toEqual(`${prefix}/${actionType}`);

      const store = new Store<Counter>({
        state: {
          value: 0
        },
        mutations: combineMutation(
          mutation(CountUp, (state) => {
            state.value++;
          })
        )
      });
      store.commit(CountUp());
      expect(store.state.value).toEqual(1);
      store.commit(CountUp());
      expect(store.state.value).toEqual(2);
    });

  });
});
