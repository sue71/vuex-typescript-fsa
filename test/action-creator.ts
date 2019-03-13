import { actionCreator, actionCreatorFactory } from "../src";

describe("#actionCreator", () => {
  test("make action creator", () => {
    const creator = actionCreatorFactory({
      prefix: "prefix",
      namespace: "namespace"
    });
    const createFSA = creator<string>("TYPE");
    expect(createFSA.namespace).toEqual("namespace");
    expect(createFSA.type).toEqual("prefix/TYPE");
  });
  test("make action creator with namespace", () => {
    const creator = actionCreatorFactory("namespace");
    const createFSA = creator<string>("TYPE");
    expect(createFSA.namespace).toEqual("namespace");
    expect(createFSA.type).toEqual("TYPE");
  });
  test("make fsa", () => {
    const createFSA = actionCreator<string>("TYPE", {
      prefix: "prefix",
      namespace: "namespace"
    });
    expect(createFSA("test")).toEqual({
      type: "prefix/TYPE",
      payload: "test",
      error: undefined,
      meta: undefined
    });
  });
  test("make fsa with options", () => {
    const createFSA = actionCreator<string>("TYPE");
    expect(createFSA.namespace).toEqual(undefined);
    expect(createFSA.type).toEqual("TYPE");
    expect(
      createFSA("test", {
        namespace: "namespace",
        error: false,
        meta: "meta"
      })
    ).toEqual({
      type: "namespace/TYPE",
      payload: "test",
      error: false,
      meta: "meta"
    });
  });
});
