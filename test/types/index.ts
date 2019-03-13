import Vue from "vue";
import { actionCreatorFactory, actionCreator } from "../../src/action-creator";
import { action } from "../../src/helpers";
import {
  mapActions,
  mapMutations,
  createNamespacedHelpers
} from "../../src/mapper";

// test: actionCreator
const WithPayload = actionCreator<string[]>("payload");
const NoPayload = actionCreator("payload");

WithPayload(["payload"]);
WithPayload(["payload"], {
  error: false,
  meta: "",
  namespace: ""
});
NoPayload(void 0);
NoPayload(void 0, {
  error: false,
  meta: "",
  namespace: ""
});

// test: actionCreatorFactory
const namespacedActionCreator = actionCreatorFactory({
  namespace: "ns",
  prefix: "prefix"
});
const Namespaced = namespacedActionCreator<string[]>("payload");

Namespaced(["payload"]);

// test: action
action(Namespaced, (_, action) => {
  action.payload.length;
});

action(WithPayload, (_, action) => {
  action.payload.length;
});

action(NoPayload, (_, action) => {
  action.payload;
});

const namespacedHelper = createNamespacedHelpers("ns");

// test: mapper
Vue.extend({
  methods: {
    ...mapActions({ action: WithPayload }),
    ...mapMutations({ mutation: WithPayload }),
    ...namespacedHelper.mapActions({ namespacedAction: WithPayload }),
    callAction() {
      this.action(["test"]);
      this.mutation(["test"]);
    }
  }
});
