// refs
//
// when you want a component to “remember” some information,
// but you don’t want that information to trigger new renders, you can use a ref.

const ref = useRef(0)
// under the hood its just an object
// 0 being the initialValue
ref == { current: initialValue }
// you can mutate a ref anytimie you want(unlike state) and anywhere
// except dont use it to determine how a rerender is done,
// because the ref doesnt trigger a rerender, so its mutable but react doesnt track if for
// rerenderings, it tracks it in memory like state, but doesnt rerender the component
export default function Counter() {
  let ref = useRef(0)
  function handleClick() {
    ref.current = ref.current + 1
    alert('You clicked ' + ref.current + ' times!')
  }
  // it wont rerender the component on button clicks
  return <button onClick={handleClick}>Click me!</button>
}
// refs are typically used in this situtations:
// 1. step outside react component and communicate with some apis
// 2. storing timeout ids
// 3. storing and manipulating dom nodes (the main usage of refs)
// 4. store data which doesnt affect rendering logic
//
// refs also update instantly unlike state which needs an updater function or a next rerender
ref.current = 5
console.log(ref.current) // 5
//
// refs are only an escape hatch, dont rely everything on them,
// if something is needed during a rerender, dont use ref for it.

// maniuplating react dom nodes with refs
export default function Form() {
  // during the first render, the dom nodes are null,
  // so you must give an initial value of null when it comes to dom node refs.
  const inputRef = useRef(null);
  function handleClick() {
    // here, inputRef.current will hold the dom node <input />, so you can use,
    // everything, like browser apis, .etc
    inputRef.current.focus();
  }
  return (
    <>
      {/* this is how you assign a ref to a dom node */}
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
// if you have a lot of nodes taht you would like to have refs on, you cant just assign it,
// in a loop, because useRef cant be called inside a loop, and also if you will give the ref,
// that you created at the top of the component, the ref will hold only the last node assigned.
<ul>
  {items.map((item) => {
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
  {items.map((item) => {
    return <li ref={ref} />;
  })}
</ul>
// 1. one approach would be to use .querySelector/All, or something similar, but if dom structure changes, its bad.
// 2. the approach to have a lot of refs with multiple elements is to create a map which will store,
//    the nodes as values and keys as ids or whatever and call a [ref callback] when assinging a ref.
export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);
  function scrollToCat(cat) {
    const map = getMap();
    // you access the node thorugh its key from the map
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }
  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[9])}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              // this is an ref callback
              // 1. (node) is the dom node for the current render.
              // 2. when dom node is removed, react will call the cleanup function returned
              //    from the callback, if you dont return a cleanup function, it will call,
              //    the callback with null value as (node) but this behaviour will be removed,
              //    in future upgrades so you should always return a cleanup function.
              // 3. react will also call ref callback whenever you pass a different ref callback.
              //    (node) => { ... } is a different function on every render.
              // 4. when component re-renders,
              //    the previous function will be called with null as the argument,
              //    and the next function will be called with the DOM node.
              ref={(node) => {
                const map = getMap();
                map.set(cat, node);
                return () => {
                  map.delete(cat);
                };
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }
  return catList;
}
// you can also send refs to child components as props
function MyInput({ ref }) {
  return <input ref={ref} />;
}
export default function MyForm() {
  const inputRef = useRef(null);
  // MyForm holds the reference of the input inside in another component
  function handleClick() {
    inputRef.current.focus();
  }
  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
// but you can restrict what parent components can do if they hold a refernce of the chil components
function MyInput({ ref }) {
  const realInputRef = useRef(null);
  // here you pass the reference that will have access to the object methods defined below, like focus().
  // the method name doesnt matter, the actions inside it matter.
  useImperativeHandle(ref, () => ({
    focus() {
      realInputRef.current.focus();
    },
  }));
  // the child components has its own reference which is the real one
  return <input ref={realInputRef} />;
};
export default function Form() {
  const inputRef = useRef(null);
  function handleClick() {
    // here, you call the object method exposed from the child component
    inputRef.current.focus();
  }
  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
// there is a way to make react commit updates to a dom right after state update, because if you remember, 
// react state updates are queued, and there can be timing problems like below;
export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );
  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText('');
    // here, a react render is queued
    setTodos([...todos, newTodo]);
    // here, the changes to the dom arent yet made
    // so it will scroll to the lastChild - 1 element,
    // because react didnt yet updated the dom.
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
    // instead, you could use flushSync() method to wrap some code that will be executed
    // right away, it will commit the changes from the state without waiting for the queued state udpates
    flushSync(() => {
      setTodos([...todos, newTodo]);
    });
    // here, the dom is already updated, so now it will work, it will go to the last child of the node
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }
  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}
// also, its important to know that managing react dom nodes manually is prohibited,
// it affects the dom that react is constructing itself beside the real dom which it commits to
//
// but this only affects dom nodes that react manages, if there are nodes that react doesnt manage,
// its safe to manually change them, with browser api for example.
// so if there are like empty <div></div> that are always empty, you could modify its children,
// if react doesnt update this div or its childs, but better stick to the react dom nodes, instead,
// of manually modifying it.
export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);
  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        Toggle with setState
      </button>
      <button
        onClick={() => {
          // once you do this, react will likely crash, it doesnt know how to handle,
          // next operations.
          ref.current.remove();
        }}>
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}

// refs should not be read/write during renders, but if they dont change or do not,
// affect rendering, its okay, but better not do taht during rendering(at least if they are not static)

// refs are typically manged inside events, but if you dont have a specific usage inside an event,
// you could use them inside useEffect.
