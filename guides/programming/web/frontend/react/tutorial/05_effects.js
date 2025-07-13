// effect
//
// effects let you run some code after rendering so that you can synchronize your component
// with some system outside of React.
//
// effects run at the end of a commit after the screen updates.

// effects are typically made in 3 steps:
// 1. declaring an effect
function MyComponent() {
    // you can have more than 1 effect, they all will run sequentally,
    useEffect(() => {
        // Code here will run after *every* render
    });
    return <div />;
}
// 2. specifying the dependencies of an effect
//    1. empty dependencies means the effect will run only
//       on the component mount(the first time it appears on the screen)
//    2. if you do specify dependencies, the effect will track them and run the effect everytime, they change.
useEffect(() => {
    // code here will run only when components mount
}, []);
// 3. cleanup function (its needed to catch bugs, because react is remounting the component(strict mode),
//    you should cancel in the cleanup what you start outside of it.
//
//    if it doesnt need to have a cleanup, then its safe to not have one
//
// the cleanup function is executed before the next render and on component unmount
useEffect(() => {
    window.addEventListener("someEvent", someListener);
    // this is the cleanup function, you return it
    return () => window.removeEventListener("someEvent", someListener);
}, []);

// you should never update the state or somehow trigger a rerender of a component inside the effect,
const [count, setCount] = useState(0);
useEffect(() => {
    // here, you would just end up in an infinite loop, because the state is updated inside the effect,
    // and the effect is run again, and the state is updated again, and so on.
    setCount(count + 1);
});

// effect dependencies
const myRef = useRef(true);
const myBool = false;
function changeRef() {
    myRef.current = !myRef.current;
}
useEffect(() => {
    // every variable that is somehow prone to changes, is a dependency, and must be defined inside,
    // the [] of useEffect(, []), otherwise the linter will give an error.
    if (myBool || myRef.current) {
        console.log(true);
    } else {
        console.log(false);
    }
    // the ref isnt needed because the ref object is always the same, react gives the same object prop, on
    // every rerender, buy you could specify it anyway.
    // but if the ref comes from a parent like a props, and its not defined inside the component where,
    // the useEffect is used, you would need to specify it, becuaes react doesnt know if the ref is the same,
    // the parent component could give something else instead.
}, [myBool, myRef]);
return <button onClick={changeRef}></button>;

// if you need some logic to run once the tab page is laoded, but only once,
// this works becuase its not part of the react lifecycle, its just the top code of a file,
// which is imported by react, and when a file(module) is imported, its code is run only once per import.
if (typeof window !== "undefined") {
    checkAuthToken();
    loadDataFromLocalStorage();
}
function App() {
    // ...
}

// how effect cleanup are actually run.
//
// 1. render the roomId is 'general'(for example)
// 2. the connection is made inside the 1 effect
// 3. render, the dependency is same 'general', react sees its the same and skips the 2 effect
// 4. render with dependency roomId as 'travel', react sees the dependeny changed
// 4. the component rerenders
// 5. the cleanup for the previous effects must be run(if any)
// 6. render had no effects, but the 1 one had,
//    so the cleanup for the 1 effect is made, then the effect for the 3 render is made
// 7. if the component gets destroyed(unmounted) the cleanup for the 3 render is made.
export default function ChatRoom({ roomId }) {
    useEffect(() => {
        const connection = createConnection(roomId);
        connection.connect();
        return () => connection.disconnect();
    }, [roomId]);

    return <h1>Welcome to {roomId}!</h1>;
}

// how to extract non reactive logic outside of effect
function ChatRoom({ roomId, theme }) {
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.on("connected", () => {
            // here is a problem, theme is a reactive eleemnt, it must be inside useeffect dependency list,
            // but what if you want only the roomId to cause the useeffect to cause the useeffect to run,
            // even though you want this code below to also be a part of useeffect logic ?
            showNotification("Connected!", theme);
        });
        connection.connect();
        return () => connection.disconnect();
    }, [roomId, theme]);
    return <h1>Welcome to the {roomId} room!</h1>;
}
// here is how
function ChatRoom({ roomId, theme }) {
    // this line creats an effect event, its like an event handler but specifically for use effect,
    // the point of this is that you can use this inside use effect and all the variables that you will,
    // use will have the latest values. effect events are not [reactive]
    // effect events are currently experimental as of react 19
    const onConnected = useEffectEvent(() => {
        showNotification("Connected!", theme);
    });
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.on("connected", () => {
            // and here you jsut call the effect event
            onConnected();
        });
        connection.connect();
        return () => connection.disconnect();
        // no more [theme] dependency
    }, [roomId]);
    return <h1>Welcome to the {roomId} room!</h1>;
}
// if you have an effect event that needs to pass a parameter to it, you must always do it,
// instead of just using it inside of the effect event(even though you can, and it will work), but
// sometimes the variable passed must be scoped(ex: async code), and you want the variable that had,
// the value at that moment, not the updated one.
const onVisit = useEffectEvent((visitedUrl) => {
    logVisit(visitedUrl, numberOfItems);
});
useEffect(() => {
    setTimeout(() => {
        // because of the delay, you pass here the variable, and it is scoped to the value passed NOW,
        // because if you would pass and just used above the [url] dependency, and if it somehow would be,
        // updated, you wouldnt notice, it could create bugs and problems.
        onVisit(url);
    }, 5000);
}, [url]);
// use effects events are limited in scope of usage:
// 1. only should be called fron inside use effects.
// 2. never passed to other components or hooks
function Timer() {
    const [count, setCount] = useState(0);
    const onTick = useEffectEvent(() => {
        setCount(count + 1);
    });
    // bad
    useTimer(onTick, 1000);
    return <h1>{count}</h1>;
}
function useTimer(callback, delay) {
    useEffect(() => {
        const id = setInterval(() => {
            callback();
        }, delay);
        return () => {
            clearInterval(id);
        };
        // bad, now you need to specify the callback as dependency
    }, [delay, callback]);
}
// good version
function Timer() {
    const [count, setCount] = useState(0);
    useTimer(() => {
        setCount(count + 1);
    }, 1000);
    return <h1>{count}</h1>;
}
function useTimer(callback, delay) {
    const onTick = useEffectEvent(() => {
        callback();
    });
    useEffect(() => {
        const id = setInterval(() => {
            onTick();
        }, delay);
        return () => {
            clearInterval(id);
        };
    }, [delay]); // No need to specify "onTick" (an Effect Event) as a dependency
}

// effects are typically needed only when a client sees a component on the screen,
// so the main purpose of an effect is that client saw a component.
//
// Other than this, you must rethink your idea about using an effect.
// more info: https://react.dev/learn/you-might-not-need-an-effect
//            https://react.dev/learn/removing-effect-dependencies
