// react behaviour tips:
//
// 1. in development, react thows cache when you edit the file of the component
// 2. in development/production, react thows cache if any component suspends during initial mount
// 3. by default, when a component rerenders, all its child components rerenders also
// 4. value of context providers are always up to date, so all components which reads context providers,
//    in their code, will rerender if context changes.
// 5. skipping rerenders with memo doesnt prevent child components from receiving new context provider value,
//    it means if you have a parent component which reads some context value and it has a child component,
//    wrapped in memo(), but it also reads that context value,
//    it will anyway receive new updated context value, and will rerender.
// 6. you can nest providers on above each other to provide more than 1 value, the lowest takes precedence,
//    in case of the same provider
// 7. the component which reads a context value, will lookup the context provider up in the component tree,
//    untill it finds at at least an empty provider, if its empty, then the value is undefined,
//    if there are not providers defined, the default value is used.
// 8. react batches state updates, it updates the screen after all the event handlers have run and
//    have called their set functions, this prevents multiple re-renders during a single event
// 9. updating state during rendering of the component which defined the state,
//    inside another component which didnt defined it is an error
// 10. when you call the set function during render, react will re-render that component immediately
//     after your component exits with a return statement, and before rendering the children.
//     this way, children don’t need to render twice.
//     the rest of component function will still execute (and the result will be thrown away).
//     if a condition is below all the Hook calls, adding an early return leads to restart of rendering
// 11. if a state is updated with the same value, it wont trigger a rerender
// 12. hooks can be called only inside component/hooks at the top level,
//     (and also dont dynamically mutate hooks, they must be as static as possible,
//     but inside them you handle, the logic), (also dont pass hooks by props)

// react code tips:
//
// 1. passing child components as children often leads to performance enhancement because childs no longer,
//    needs to also rerender.
// 2. when you use something which requires dependencies like useeffects, and it involves setting state,
//    its better to pass an updater function than to use the state itself which makes it a dependency.
// 3. as of react 19, fetching data is done better with use() directive
// 4. as of react 19, accessing context values is done with use() directive
// 5. you should not mutate data that existed before component
// 6. values that are passed to jsx, must not be mutated, mutation must occur before they are passing,
