// responding to events
//
// event handlers are often your own functions that will be triggered in response to
// interactions like: clicking, hovering, focusing, .etc so they are perfect for side effects.
export default function Button() {
  // 1. are defined inside component where its used, but also can be passed as prop for children to use
  // 2. event handlers usually start with word handel[Action]
  function handleClick() {
    alert('You clicked me!')
  }

  // handleClick is an event handler now
  return <button onClick={handleClick}>Click me</button>
  return (
    <button
      // you could also define the funciotn inside { }, but its verbose
      onClick={function handleClick() {
        alert('You clicked me!')
      }}
    >
      Click me
    </button>
  )

  return (
    <button
      // you can also have an arrow function
      onClick={() => {
        alert('You clicked me!')
      }}
    >
      Click me
    </button>
  )
}
// there is a difference between assigning an event handler and executing a function every time a component
// renders.
// 1. in the first example, handleClick wihtout () will fire only if a user clicks on the button.
// 2. in the second exmaple handleClick with () will fire every time the component which holds the button rerenders,
//    becuaes once again, inside {} js code is used.
return <button onClick={handleClick}></button>
return <button onClick={handleClick()}></button>
// same rule apply for arrow functions or any function
return <button onClick={() => alert('...')}></button>
return <button onClick={() => alert('...')()}></button>

// passing event handlers as props
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Play "{movieName}"
    </Button>
  );
}
function UploadButton() {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}
export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}

// event handlers name
//
// 1. builtin components like <button>, <div> only support browser event names, like onClick, onFocus, .etc
// 2. but you can define the name as you like in your component, the convention is
//    to start with on[Action], like onPut, onAttack, .etc
function Button({ onSmash, children }) {
  return (
    // here you still need the native browser event: onClick, but the value inside { } has your name as prop
    <button onClick={onSmash}>
      {children}
    </button>
  );
}
export default function App() {
  return (
    <div>
      { /* onSmash is not native to browser, its your own handler name */}
      <Button onSmash={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onAttack={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
// you can have specific names as you like
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}
function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

// event propagation
// 1. event handlers will also catch events from any children your component might have.
// 2. an event “bubbles” or “propagates” up the tree:
//    1. it starts with where the event happened
//    2. and then goes up the tree.
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      {
        /*
         * when you click this button:
         * 1. its event will fire
         * 2. then the event will propage up the tree
         * 3. if it finds another same event (onClick=onClick), it will fire also
         *
         * in react, all events propagte except onScroll, it works only on the jsx tag attached.
         * */
      }
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
// stopping propagation
// 1. event handlers receive an event object as their only argument, by convention,
//    it’s usually called e, which stands for “event”.
//    you can use this object to read information about the event.
// 2. that event object also lets you stop the propagation,
//    if you want to prevent an event from reaching parent components,
//    you need to call e.stopPropagation().
function Button({ onClick, children }) {
  return (
    // event(e), is not only useful for stopin propagation, it has additonal utilities you can use
    <button onClick={e => {
      // this way you can stop the propagation
      e.stopPropagation();
      // notice the handler of the button is called, like in js code would
      onClick();
    }}>
      {children}
    </button>
  );
}
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
// in rare cases you can track event, even if the propagation is stopped
// 1. button is clicked, capture phase starts from the root element untill the button is found,
// 2. onClickCapture event is fired,
// 3. button event is fired
// 4. since button called e.stopPropagation(), it doesnt bubble up, so
//    onClick of the <div> wont happen.
<div onClickCapture={() => { /* this runs first */ }} onClick={someFuncion}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>

// preventing default behaviour
//    some browser events have default behavior associated with them.
//    for example, a <form> submit event, which happens when a button inside of it is clicked,
//    will reload the whole page by default
export default function Signup() {
  return (
    <form onSubmit={e => {
      // because you call e.preventDefault(), the page wont be reloaded
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
