import { actionCreator, actionCreatorFactory } from "../src";

describe("#actionCreator", () => {
  test("make FSA factory", () => {
    const factory = actionCreatorFactory("prefix");
    const createFSA = factory<string>("TYPE");
    expect(createFSA("test")).toEqual({
      type: "prefix/TYPE",
      payload: "test",
      error: undefined,
      meta: undefined
    });
  });
  test("make with prefix", () => {
    const createFSA = actionCreator<string>("TYPE", "prefix");
    expect(createFSA("test")).toEqual({
      type: "prefix/TYPE",
      payload: "test",
      error: undefined,
      meta: undefined
    });
  });
  test("make with options", () => {
    const createFSA = actionCreator<string>("TYPE");
    expect(
      createFSA("test", {
        namespace: "prefix",
        error: false,
        meta: "meta"
      })
    ).toEqual({
      type: "prefix/TYPE",
      payload: "test",
      error: false,
      meta: "meta"
    });
  });
});

describe("#actionCreatorFactory", () => {
  test("make FSA factory with namespace", () => {
    const factory = actionCreatorFactory("prefix");
    const createFSA = factory<string>("TYPE");
    expect(createFSA("test")).toEqual({
      type: "prefix/TYPE",
      payload: "test",
      error: undefined,
      meta: undefined
    });
  });
});
