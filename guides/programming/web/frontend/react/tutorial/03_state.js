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
  // [index, setIndex] = is called array destructuring
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
// 2. state is private for the component where its defined, parent components dont even know, or can change it
// 3. if you would want both Gallery components to share a state you would need to remove state form both
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
// react waits until all code in the event handlers run before processing state updates, like in example above,
// with setNumber(0 + 1) 3 times, but there is a way to batch all calls to a set functions,
// inside an event handler(since react will wait untill all code inside an event has executed), this way
// react can save performance wihtout making unecessary (half)updates.
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
// get a new array
let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];
export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );
  function handleClick() {
    // everytime you get new array where circle objects gets more 50px after button was clicked
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // No change
        return shape;
      } else {
        // Return a new circle 50px below
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // Re-render with the new array
    setShapes(nextShapes);
  }
  return (
    <>
      <button onClick={handleClick}>
        Move circles down!
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
            background: 'purple',
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            borderRadius: shape.type === 'circle' ? '50%' : '',
            width: 20,
            height: 20,
          }} />
      ))}
    </>
  );
}
// replacing items in an array
let initialCounters = [
  0, 0, 0
];
export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );
  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      // basically you give the index(
      // li element position and check if its the same as
      // value position in the counters array
      // )
      if (i === index) {
        return c + 1;
      } else {
        return c;
      }
    });
    setCounters(nextCounters);
  }
  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}
// insert into an array
let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye' },
  { id: 2, name: 'Louise Nevelson' },
];
export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );
  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }
  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
// reversing an array (event though there is a new method in js for this with copying)
export default function List() {
  const [list, setList] = useState(initialList);
  function handleClick() {
    // jsut creat a new array with spread operator, and thats it
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }
  return (
    <>
      <button onClick={handleClick}>
        Reverse
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
// be cautious when you have shared state as objects,arrays, because mutating,
// in one or another will affect the other, it can lead to bugs, for example you have a component
// which is rendered 2 times, but they both have 2 props with different states but that state share
// single object/array, if some component rerenders and updatess that shared array/object,
// it can lead to changes applying to the second component also.
let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];
export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );
  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    // here you mutate a property from an object which is placed in both states myList, yourList
    artwork.seen = nextSeen;
    // instead
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // Create a *new* object with changes
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
    // of this
    setMyList(myNextList);
  }
  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    // here you mutate a property from an object which is placed in both states myList, yourList
    artwork.seen = nextSeen;
    // instead
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // Create a *new* object with changes
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
    // of this
    setYourList(yourNextList);
  }
  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}
function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
// with immer this could be easier, you can use it for arrays also
export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );
  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      // the copy property from copy object is updated
      artwork.seen = nextSeen;
    });
  }
  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }
}
