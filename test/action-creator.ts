import { actionCreator } from "../src/action-creator";
import { combineMutation, mutation } from "../src";
import Vue from "vue";
import Vuex, { Store } from "vuex";

describe("helpers", () => {
  describe("#vuex", () => {
    Vue.use(Vuex);
    interface Counter {
      value: number;
    }

    test("call void type payload mutation", () => {
      const CountUp = actionCreator("COUNT_UP");

      const store = new Store<Counter>({
        state: {
          value: 0
        },
        mutations: combineMutation(
          mutation(CountUp, function(state) {
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
