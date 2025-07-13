// state
//
// components need to “remember” things:
//      the current input value,
//      the current image,
//      the shopping cart,
//      .etc
// in React, this kind of component-specific memory is called state.

// 1. local variables dont persiste between rerenders, react renders component form scratch
// 2. changes to local variables wont trigger a rerender
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    // this will be 0 = 0 + 1 every time a component is rerendered, index wont be 1 at the next render
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}

// using state in react
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  // 1. index will retain the state between rerendres
  // 2. setIndex is a function which can update index which triggers the rerender
  // the convention is to call const [someData, setSomeData] = useState(initialValue).
  // under the hood, useState() keeps state in an array, each time storing new state as a pair:
  // [(someValue, setSomeValue), (anotherValue, setSomeValue), (.etc)]
  const [index, setIndex] = useState(0);
  // you can have as many states as you want, but if they are related, better combine them into one
  const [fileds, setFields] = useState({ field1: "1", field2: "2" })
  // or compute a variable value from the state instead of creating another state.
  const lowerIndex = index - 1

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}

// hooks
// 1. if it starts with "use", then its a hook
// 2. a hook is a special function which is available only while react is rendering
// 3. lets you modify some behaviour of a component in different stages of rendering
// 4. can be called only at the top level of a component or in your own hooks
//    you can’t call Hooks inside conditions, loops, or other nested functions.

// 1. state is isolated for the component where its defined(local to the place where its defined on the screen)
// 2. if you would want both Gallery components to share a state you would need to remove state form both
//    Gallery components and add it to their parent Page
import Gallery from './Gallery.js';
export default function Page() {
  return (
    <div className="Page">
      <Gallery /> {/* will have its own state not related to the Gallere below */}
      <Gallery />
    </div>
  );
}

// setting state, caveats
export default function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <>
      {/*
          * here, number will be 1, not 3, even though we called setNumber() 3 times
          *
          * the reason is that when you trigger a rerender, it prepares, not renders right away,
          * this is needed so that react could queue renders or start a new render when it needs.
          *
          * so the code looks like setNumber(0 + 1) 3 times in a row.
      */}
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
// state doesnt change during a render even if the code is async
export default function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          // the number at the time of the timer registration was 0, so alert(0),
          // so after 3 seconds it will alert 0, not 5
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}

// queue state updates
//
// setting a state variable will queue another render.
// but sometimes you might want to perform multiple operations on the value before queueing the next render.
//
// react waits until all code in the event handlers run before processing state updates,
// there is a way to batch all calls to a set function, inside an event handler
// (since react will wait untill all code inside an event has executed),
// this way react can save performance wihtout making unecessary (half)updates.
//
// but react wont batch multiple updates from multiple event handlers even if they are of the same origin,
// like onClick, if a click has happened and it did something, it really did, and an update(render) has happened,
// the second click will be a separate click, separate render(update).
//
// still this is not common, to do batch updates based on queue of previous states, but is possible:
export default function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        // this way you can batch renders, react will update the state with each setFuncion,
        // and on the next render it will take into account all these lines, not only first.
        //
        // this has a name also, n => n + 1, is usually called an updater function
        setNumber(n => n + 1); // n = 0
        setNumber(n => n + 1); // n = 1
        setNumber(n => n + 1); // n = 2
        // usually the convention is to name like below, but you choose.
        setNumber(lastNumber => lastNumber + 1)
      }}>+3</button>
    </>
  )
}
// another exmaple
export default function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        // you put number + 5 in a queue, so now n = 5
        setNumber(number + 5); // same as setNumber(n => 5), but verbose
        // because we have here an updater function, it takes n and changes it also,
        // n = 5 + 1 = 6
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}
// antoher example
export default function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
        // react during the rerender will process the whole queue:
        // n = 5
        // n = 6
        // n = 42
        // the number after the render will be 42
      }}>Increase the number</button>
    </>
  )
}
// setting state or other side effects inside upddater functioins is prohibited, it leads to bugs.
// also, in strict mode udpater functions are run twice but discard the second result to find bugs.

// updating objects in state
//
// state can hold any kind of JavaScript value, including objects.
// but you shouldn’t change objects that you hold in the React state directly.
// instead, when you want to update an object,
// you need to create a new one (or make a copy of an existing one),
// and then set the state to use that copy.
//
// why you should never update state by yourself, and specifically objects as state:
// 1. debugging issues:
//    if you use console.log and don’t mutate state,
//    your past logs won’t get clobbered by the more recent state changes.
//    so you can clearly see how state has changed between renders.
// 2. optimizations:
//    common React optimization strategies rely on skipping work if
//    previous props or state are the same as the next ones.
//    if you never mutate state, it is very fast to check whether there were any changes.
//    if prevObj === obj, you can be sure that nothing could have changed inside of it.
// 3. react itself:
//    react is built on the idea of immutablity of the state wihtout setFunction,
//    mutating it could break new react features.
// 4. requirement changes:
//    some application features, like implementing Undo/Redo, showing a history of changes,
//    or letting the user reset a form to earlier values, are easier to do when nothing is mutated.
// 5. react does not rely on mutation, so dont you
// 6. you could get away with mutation of objects in a state, but dont.

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        // 1. never do this, this is called a mutation, you are trying to change the state,
        //    without using setFunction, this leads to bugs.
        // 2. also, this wont work, once again, only setFunction can change the state,
        //    and trigger a rerender.
        // 3. in some cases, this could work, but never do this.
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      onPointerMove={e => {
        // this way, you assign a new object, now it will work, you trigger a rerender
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
// you can also copy objects with spread operator
export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      // a spread operator is usefull when working with objects, you can give the
      // same object but update some newer fields.
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  // you could also define one handler for all fields using [ ] inside { } with event information
  function handleChange(e) {
    setPerson({
      // be cautious, the spread operator(...), only copies the first level,
      // so its up to you to handle nested objects.
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
// nested objects must be handled separately because
// they are not copied with (..., because only the first level is copied)
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
// this way
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
// or this way
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
// you could use libraries that do it for you, for exmaple immer:
// under the hood it uses js Proxy to create the object for you with the data that hasnt been touched
const [person, updatePerson] = useImmer({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
function handleNameChange(e) {
  updatePerson(draft => {
    draft.name = e.target.value;
  });
}
function handleTitleChange(e) {
  updatePerson(draft => {
    draft.artwork.title = e.target.value;
  });
}
function handleCityChange(e) {
  updatePerson(draft => {
    draft.artwork.city = e.target.value;
  });
}
function handleImageChange(e) {
  updatePerson(draft => {
    draft.artwork.image = e.target.value;
  });
}

// updating arrays in state
//
// arrays are mutable in JavaScript,
// but you should treat them as immutable when you store them in state.
// just like with objects, when you want to update an array stored in state,
// you need to create a new one (or make a copy of an existing one), and then set state to use the new array.
export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        // mutation of an array as state, bad
        artists.push({
          id: nextId++,
          name: name,
        });
        // this way better
        setArtists(
          [
            ...artists, // that contains all the old items
            { id: nextId++, name: name } // and one new item at the end
          ]
        );
        // or put at the start, the new element, you choose
        setArtists([
          { id: nextId++, name: name },
          ...artists // Put old items at the end
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
// filtering arrays
let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye' },
  { id: 2, name: 'Louise Nevelson' },
];
export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );
  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              // this is good, .filter() returns new array, so we dont
              // mutate the original one.
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// dont use props as state value if you want future updates,
// because it will only set on the first render, on future renders, messageColor will update,
// but color state variable will remain with the initial value, so you can use it as
// default/initial value only.
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
}
// instead use a simple variable for this, it will update on rerenders unlike state
function Message({ messageColor }) {
  const color = messageColor;
}
// also, dont forget to remove things that you no longer need inside state, since state is kept in memory,
// it can clutter the system, so optimize as more as you can.

// sharing state between components
//
// one of the common way of making 2 react components work together, is by lifting their state up to a common
// parent, and pass it as a prop, or pass an event handler which will change it. For example,
// if you would have 2 components with each state inside them, they would operate seaprately,
// but if you would need both of them to work together, you would lift state up by 1 parent(create it if needed)
// this is often called "lifting state up"

// preserve and reset state
//
// 1. state is isolated between components.
// 2. react keeps track of state of which belongs to which component based on their place in the UI tree.
// 3. you actually can control manually when to preserver/reset state in between renders.
// 4. functions also gets recreated(rendere for example) within a function, so storing it within is bad,
//    also its state gets destroyed too, if parent is destroyed.
export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {/*
        conceptually same on all 4 lines, state is separate for all
        updating one component state wont affect the other
      */}
      {counter}
      {counter}
      <Counter />
      <Counter />
    </div>
  );
}
// another exmaple
export default function App() {
  return (
    <div>
      {someCondition && <Counter />}
      {/*
          becaue the second Counter is always rendered, its state will be preserved even
          if the first Counter will render and then will be destroyed(even if the second component
          gets lifted(somehow) above of the first component), so if both components
          are the same, it doesnt matter, only the place in the UI tree matter
      */}
      <Counter />
    </div>
  );
}
// another example
export default function App() {
  return (
    <div>
      {someCondition && <Counter />}
      {!someCondition && <Counter />}
      {/*
        because both of the components can be destroyed, and none of them has stable place,
        in the UI tree, the state wont be preserved for any of them if 1 of them gets moved, lifted, .etc
      */}
      <Counter />
    </div>
  );
}
// another examaple
export default function App({ isTrue }) {
  // even if JSX code is on different levels for components, the only factor for react is UI tree,
  // which react uses to check if thery are on the same level.
  // so state will be preserved for both of components(depending on what changes, for example css, prop)
  if (isTrue) {
    return (
      <div>
        <Counter />
      </div>
    );
  }
  return (
    <div>
      <Counter />
    </div>
  );
}
// another exmaple
export default function App({ isTrue }) {
  if (isTrue) {
    return (
      <div>
        <Counter />
      </div>
    );
  }
  return (
    <div>
      {/*
        here, because of the p tag, state for Counter wont be preserved, even though,
        there is another Counter above supposed to be on the same level, but they are not,
        becaue the second Counter is wrapped with p tag.
      */}
      <p><Counter /></p>
    </div>
  );
}
// another example
export default function App({ isTrue }) {
  if (isTrue) {
    return (
      // state gets destroyed because below there is not Counter component on the same level,
      // but there is div.
      <Counter />
    );
  }
  return (
    <div> </div>
  );
}
// another example
export default function App({ isTrue }) {
  if (isTrue) {
    return (
      <div>
        {/*
          becaue of different keys of both Counter componnets(even though they are on the same level),
          the components do not share the state, they are basically destroyed and recreated,
          if the first gets toggled, the second gets destroyed, first created
          if the second gets toggled, the first gets destroyed, second created.
          remember: keys are a way to tell react to distinguish between components,
                    and if they diverge, they simply gets destroyed.
        */}
        <Counter key={someKey} />
      </div>
    );
  }
  return (
    <div>
      <Counter key={anotherSomeKey} />
    </div>
  );
}
// but if you want still to preserve the state, you can either:
//     1. hide other things with css(bad if there are a lot of components, performance issue)
//     2. lift state up and preserve for all components the state
//     3. preserve state information somewehre else(localStorage, indexDB, cookies, .etc)

// extracting state logic into a reducer
//
// you can consolidate all the state update logic outside your component in
// a single function, called a reducer.
export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);
  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }
  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }
  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }
  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];
// this can be easily transformed into a reducer(because actions are similar):
//     1. Move from setting state to dispatching actions.
//     2. Write a reducer function.
//     3. Use the reducer from your component.
//
// basically, now, you need to tell react what the user did(like an aciton) instead of what to do
//
// 1. moving from setting state to dispatch
function handleAddTask(text) {
  // action object, anything can be inside, but usually its the info you need to perform actions,
  // and the most importatn the action-type that happened.
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}
function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}
function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
// 2. creating a reducer function
//     1. first argument is usually the state
//     2. second argument is the action performed
//     3. and the return value is the next state
function tasksReducer(tasks, action) {
  // you could write it in if/else, whatever
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
// 3. change the useState into useReducer
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
// often reduers are put inside another js file to let component be clean
//
// useState vs userReducer
// 1. code size is less with useState
// 2. readablity is cleaner with useState
// 3. debugging usually better with useReducer
// 4. testing usually better with userReducer
// 5. personal preference(it really just matter what you feel is better)
//
// 2 importantt aspects when working with reducers:
//      1. reducers must be pure, as components are
//      2. each reducer action must prescribe only 1 action, even if more than 1 change happens.
//
// so, you choose what to use, if there are a lot of event handlers that have similar code,
// you could use reducers, but who cares, just pick what you/team likes more.

// context
//
// 1. typically, you need context when some data is needed deep below components
// 2. you dont want to pass props down below even if some components on the way wont use them
// 3. you cant pass children as components and must use props
//
// the great thing about it, if you pass another value to the context provider, it will rerender,
// all the components that use it, this is why its often used with state/reducer.
//
// app.js
export default function Page() {
  return (
    <Section>
      {/* this looks very verbose */}
      <Heading level={1}>Title</Heading>
      <Heading level={2}>Heading</Heading>
      <Heading level={3}>Sub-heading</Heading>
      <Heading level={4}>Sub-sub-heading</Heading>
      <Heading level={5}>Sub-sub-sub-heading</Heading>
      <Heading level={6}>Sub-sub-sub-sub-heading</Heading>
    </Section>
  );
}
// section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
// heading.js
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
// this looks more verbose
export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
// how could we make it more cleaner ?
// LevelContext.js
export const LevelContext = createContext(1);
// Heading.js
// you need to add this instead of level prop, it will use the LevelContext constant,
// from LevelContext.js
const level = useContext(LevelContext);
// Section.js
export default function Section({ level, children }) {
  return (
    <section className="section">
      {/*
        here, you need to wrap component that will use the context down below .
        notice the {level}, level here is the prop that you will provide when using
        the component. (below in App.js)
      */}
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
// App.js
export default function Page() {
  return (
    {/* here, {level} is the prop that is used as identifier for LevelContext.Provider above */ }
    < Section level = { 1} >
            <Heading>Title</Heading>
            <Section level={2}>
                <Heading>Heading</Heading>
                <Heading>Heading</Heading>
                <Heading>Heading</Heading>
                <Section level={3}>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Section level={4}>
                        <Heading>Sub-sub-heading</Heading>
                        <Heading>Sub-sub-heading</Heading>
                        <Heading>Sub-sub-heading</Heading>
                    </Section>
                </Section>
            </Section>
        </Section >
    );
}
// actually, you could remove the prop {level}, because provider is given by Section component,
// we can increase it everytime another Section is used, wether inside or
// outside(in this case it wont see the old value).
// Section.js
export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      {/*
        here, any component however nested it would be donw below, it will look for a provider above,
        if it finds one, it uses the value of the provider and increment it by 1, and it goes,
        like this for all components.
        this works because the value is kept for all the providers on all levels.
      */}
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
// now, App.js doesnt need the {level} prop, because it now can rely on the value of the provider,
export default function Page() {
  return (
    {/* no level needed */ }
    < Section >
            <Heading>Title</Heading>
            <Section>
                <Heading>Heading</Heading>
                <Heading>Heading</Heading>
                <Heading>Heading</Heading>
                <Section>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Section>
                        <Heading>Sub-sub-heading</Heading>
                        <Heading>Sub-sub-heading</Heading>
                        <Heading>Sub-sub-heading</Heading>
                    </Section>
                </Section>
            </Section>
        </Section >
    );
}

// combining reducer and context
// this way, you can actuaally give to the lower componets the ability to use/update the state
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
//
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
//
return (
  <TasksContext.Provider value={tasks}>
    <TasksDispatchContext.Provider value={dispatch}>
      <h1>Day off in Kyoto</h1>
      {/* this way, AddTask and TaskList can use both tasks and dispatch method, and all components below */}
      <AddTask />
      <TaskList />
    </TasksDispatchContext.Provider>
  </TasksContext.Provider>
);
// also, this are called custom hooks because the funciotn name starts with lowercase "use",
// the main point is that a custom hook(function) lets you use other hooks inside it(state, reducer, .etc)
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
const tasks = useTasks();
const dispatch = useTasksDispatch();
