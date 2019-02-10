import { actionCreator } from '../../src/action-creator';
import { action } from '../../src/helpers';

// test: actionCreator
const WithPayload = actionCreator<string[]>("payload");
const NoPayload = actionCreator("payload");

WithPayload(["payload"]);
WithPayload(["payload"], {
  error: false,
  meta: "",
  namespace: "",
});
NoPayload();
NoPayload({
  error: false,
  meta: "",
  namespace: "",
});

action(WithPayload, (_, action) => {
  action.payload.length;
});

action(NoPayload, (_, action) => {
  action.payload;
});