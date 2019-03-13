vuex-typescript-fsa
---

The helper function for inferring a combination of action/mutation and handler 

**This project is under development. Some features have bugs and some APIs might be changed near future.**

## Installation

```
npm install vuex-typescript-fsa
```

## Demo 

![demo](https://github.com/sue71/vuex-typescript-fsa/blob/images/demo-01.gif)

## Usage 

```
const Increment = actionCreator<number>("Increment");

const store = new Store<{ count: number }>({
  state: {
    count: 0
  },
  actions: combineAction(
    action(Increment, function(context, action) {
      context.commit(action);
    })
  ),
  mutations: combineMutation(
    mutation(Increment, function(state, action) {
      state.count = action.payload;
    })
  )
});

store.dispatch(Increment(10));
```

## License

MIT
