import { actionCreator, actionCreatorFactory } from "../../src/action-creator";
import { action } from "../../src/helpers";

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
const factory = actionCreatorFactory("namespace");
const Namespaced = factory<string[]>("payload");

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
