// input as state
//
// react doesnt not manually manipulate the UI, you only tell how it looks, updating part is on react
//
// the process is typically like this:
// Identify your component’s different visual states
//     1. Determine what triggers those state changes(typically you design this, state-[action]-state)
//     2. Represent the state in memory using useState
//     3. Remove any non-essential state variables
//     4. Connect the event handlers to set the state
export default function Form({ status = 'empty' }) {
  // good, but if you have more than 1 state ? useState() will help
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable
        water?
      </p>
      <form>
        <textarea />
        <br />
        <button>Submit</button>
      </form>
    </>
  )
}
// if you have more than 1 status and of course they conflict, you must have this:
export default function Form({ status = 'empty' }) {// Try 'submitting', 'error', 'success':
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={
          status === 'submitting'
        } />
        <br />
        {/* additional logic appeared */}
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
          <p className="Error">
            Good guess but a wrong answer. Try again!
          </p>
        }
      </form>
    </>
  );
}
// what about states ?
// esential ones are these
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
// but if you dont know how to structure you can have more
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
// but its too much, some of them can be cleared out by some logic check, right ?
// isEmpty can be removed by checking if input is empty
// isError can be removed by checking if error is null
// isTyping, isSubmitting, isSuccess can be replaced by 1 state "status"
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing');
// now, we add an event for changes
export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}
function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

// structure of the state
//
// 1. group related structure:
//       1. if the state can satisfy more than 1 state variable (if you can),
//       2. when you deal with state which holds objects, you cant update only 1 property,
//       you need to update both(by copying or creating a new object)
// 2. avoid contradictions:
//       1. no state should contradict with other state, ex: while you type, input cant be disabled
// 3. avoid state state that can be calculated:
//                   1. if you have a state and you need its false boolean,
//                      you should just calculate it like value = !state
// 4. avoid duplication in state:
//            1. a state which holds some objects and another state which holds the same object
//               inside the first state
// 5. avoid deeplny nested states:
//        1. deep states are verbose to update
//
// aslo, dont use props as state value if you want future updates,
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
// now, App.js doesnt need the {level} prop, because it now can rely on the value of the provider
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
// also, level context provider works for any level inside any component
// App.js
export default function ProfilePage() {
  return (
    <Section>
      <Heading>My Profile</Heading>
      <Post
        title="Hello traveller!"
        body="Read about my adventures."
      />
      <AllPosts />
    </Section>
  );
}
function AllPosts() {
  return (
    {/* it will work here too */ }
    < Section >
            <Heading>Posts</Heading>
            <RecentPosts />
        </Section >
    );
}
function RecentPosts() {
  return (
    {/* it will work here too */ }
    < Section >
            <Heading>Recent Posts</Heading>
            <Post
                title="Flavors of Lisbon"
                body="...those pastéis de nata!"
            />
            <Post
                title="Buenos Aires in the rhythm of tango"
                body="I loved it!"
            />
        </Section >
    );
}
function Post({ title, body }) {
  return (
    {/* it will work here too */ }
    < Section isFancy = { true} >
            <Heading>
                {title}
            </Heading>
            <p><i>{body}</i></p>
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
