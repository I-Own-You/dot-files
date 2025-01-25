// an article constructed with html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>;

// component which returns an article
// 1. a component inside js is a function which returns jsx (js wiht html markup)
// 2. funcition name must start with capital letter, otherwise wont work, this is how browsers actually
//    distringuish between components and simple html tags.
// 3. you must export the function, either default or named export, js rules apply for export keyword
// 4. when you return from a component jsx, if it spans multiple lines, you must wrap it into ( )
export default function MyArticle() {
  return (
    <article>
      <h1>My First Component</h1>
      <ol>
        <li>Components: UI Building Blocks</li>
        <li>Defining a Component</li>
        <li>Using a Component</li>
      </ol>
    </article>
  );
}

// single usage of the component
<MyArticle>{/* here you can put childrens */}</MyArticle>;
<MyArticle />

// nesting component in another component
export function EmbeddedArticles() {
  function aloha() { }
  return (
    // when you return multiple jsx without a parent, you must define one like div, MyComponent, .etc,
    // or use react special parent which will add no parent but will make it work: <></>,
    // there is also a more verbose way <Fragment></Fragment> same as <></> but has the ability which <> doesnt,
    // like passign refs, props, .etc
    <>
      <MyArticle> </MyArticle>
      <MyArticle> </MyArticle>
      <MyArticle> </MyArticle>
    </>
  );
}

// dont nest components this way, it leads to bugs
export default function Gallery() {
  function Profile() { }
}

// export/import components
// Profile.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
// Gallery.js
// this way you would import another component, if it was exported, with default,
import Profile from './Profile.js' // .js can be omitted
// this way you import another component if it was exported without default
import { Profile } from './Profile.js' // .js can be omitted
export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
    </section>
  );
}

// jsx tips
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  const person = {
    theme: {
      backgroundColor: 'black',
      color: 'pink'
    }
  };
  return (
    <>
      <img
        className="avatar"
        // this way, using { } you can use javascript code as value for attributes
        src={avatar}
        alt={description}
      />
      { /* inisde tags, using { } you can also use javascript code */}
      <div>{avatar}</div>
      <div>{avatar.toUpperCase()}</div>
      <div>{console.log(avatar)}</div>
      <p
        // this way you can use javascript code inside styles, { } is needed becasue style={},
        // expects an object, and we already used { } for js code, so we need to wrap again
        style={{
          backgroundColor: 'black',
          color: 'pink'
        }}
      ></p>
      <p
        // this way you can use object destructuring where all object properties will be aligned
        // inside style={}, same like style={{person.prop1, person.pop2, .etc}}
        style={person.theme}
      ></p>
    </>
  );
}

// props
export default function Tree() {
  return (
    // the actual point of props is to pass down information that we can update somewhere,
    // and right when the props update, the components which receive the props, also will update,
    // here its static, but the main point is to pass information that can change often which leads,
    // to automatic coponent updates(renders).
    <Leaf
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
// 1.here, { person, size } are the properties passed down when <Avatar /> where used with,
//   person, size attributes(peroperties), this is also used with object destructuring { prop1, prop2, .etc }.
// 2. you can also give default values as in js(remember it still is a js function so js features apply),
//    undefine / or value not defined will set size to 100, but 0 or null wont.
function Leaf({ person, size = 100 }) {
  const anotherPerson = person + ' 2'
  const anotherSize = size + 2
  return (
    <p
      alt={anotherPerson}
      width={anotherSize}>
    </p>
  );
}
// here we use the object itself, its usually a common sense to call it props
function Leaf(props) {
  const anotherPerson = props.person + ' 2'
  const anotherSize = props.size + 2
  return (
    <p
      alt={anotherPerson}
      width={anotherSize}>
    </p>
  );
}
// you can also use spread operator to retrieve all properties from an object like we used for style tag
// <Avatar {...props} />
function Profile(props) {
  return (
    <div className="card">
      { /* here its the same if we would did props.prop1, props.prop2, .etc */}
      <Avatar {...props} />
    </div>
  );
}
// you can also pass children to component,
// { children } is part of props that components receive beside props we pass
function Card({ children }) {
  return (
    <div className="card">
      { /* here, children would be the Avatar component passed below */}
      {children}
    </div>
  );
}
export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

// conditional rendering
function Item({ name, isPacked }) {
  // based on a condition with if/else, we can return jsx
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;

  // another way is using ternary operator which is way more granular, but more verbose,
  // also its good only for simple conditions.
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✅'}
        </del>
      ) : (
        name
      )}
    </li>
  );

  // the most useful one is &&, || operators, clean and simple.
  // also, be cautious, on the left side it must always explicitly be a boolean, not something
  // that implicitly convert to it, because if you have 0 && <MyComponent />, it will render 0,
  // not your component because even if 0 goes to boolean false, becasue of the nature of && operator,
  // fasle && true gives false, true && false gives false,
  // so always convert the expressoin to a boolean explicitly like something > 0 && <MyComponent />.
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );

  // and you can also use variables for some specific way of doing
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✅";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
  // you can also assign jsx to a variable and use it later
  let itemContent2 = name;
  if (isPacked) {
    // here, itemContent2 contains jsx element
    itemContent2 = (
      <del>
        {name + " ✅"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent2}
    </li>
  );

  // dont return null as jsx, yes it will work, it will return nothing and react wont render it,
  // but it can lead to surprises.
}
export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}

// displaying multiple components/elements
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
export const people2 = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
// this way, with map method you can store multiple jsx elements, because jsx elements can be assigned,
// as variables, so as values.
export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
// this way you can filter some values
export default function List() {
  const chemists = people2.filter(person =>
    person.profession === 'chemist'
  );
  // actually here, an expression is returned right after =>, so because <li> is a whole tag, it works,
  // but if you span more than 1 line, its better to have { } and return inside with ( ), again
  // js rules apply
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
// the examples above actually will have an erorr becaue they dont define keys whih react needs,
// to track information about the items(nodes), its useful so that react knows how to handle
// the state of an item if an item is created, deleted, or changed places.
<li key={person.id}>...</li>
// if you need a key but dont want a parent, you would use <></> but it cant have keys,
// so you can use <Fragment> </Fragment> instead, which can have a key
const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
// 1. keys must be unique among sibling, on ohter levels it doesnt matter
// 2. keys must not change, their purpose to be static and unchanged so that items wont be recreated every time,
//    a key change.
// 3. its bad to use index of an array (like in map method that you get), its better to use some unique
//    values, but if nodes dont change and they are static, its fine.
// 4. if you dont specify a key, react itself will use some sort of keys like from a map for lopp index,
//    which is bad, and leads to bugs, you must alway define yours.
// 5. components dont receive key as a prop, like key={id}, wont go down to the component,
//    you need to define the prop yourself if you need one like userId={id}

// pureness in components
//
// 1. it does not change any objects/variables that existed before a component
// 2. given the same data, a compnent must have the same result every time
function Recipe({ drinkers }) {
  return (
    <ol>
      { /* no matter how many times you call it, the drinkers here will be 2, if drinkers = 2 */}
      { /* no matter how many times you call it, the drinkers here will be 4, if drinkers = 4 */}
      <li>Boil {drinkers} cups of water.</li>
      {
        /*
           no matter how many times you call it, the drinkers here will be 1, 0.5 * 2 = 1
           if drinkers = 2
        */
      }
      {
        /*
           no matter how many times you call it, the drinkers here will be 2, 0.5 * 4 = 2
           if drinkers = 4
        */
      }
      <li>{0.5 * drinkers} spoons of spice.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
// side effects when pureness is not respected
let guest = 0;

function Cup({ someProp }) {
  // this is bad, we change a variable that existed before a component.
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;

  // props also msut not be changed, remember, all variables/objects that existed before must not be affected
  someProp += 2
}

export default function TeaSet() {
  // the results below have 2,4,6 instead of 1,2,3 because of the restrict mode in react,
  // it calls components 2 times(rerenders) specifically to catch bugs like purenessless,
  // where you dont respect the pureness rules.
  // you can opt out, but better not, in production it dosent work, so it wont affect performance.
  return (
    <>
      <Cup /> { /* Tea cup for guest #2 */}
      <Cup /> { /* Tea cup for guest #4 */}
      <Cup /> { /* Tea cup for guest #6 */}
    </>
  );
}
// you can have local mutations
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}
export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    // this is fine because the variable is local (created in a component, it didnt exist before)
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
// but even if you need some side effects, like making something even in a component, you must
// use either: 1. event handlers
//             2. useEffect(), but this is the last resort
//
// pure components is important becuase:
//      1. react can skip rendering because no input outside of it was affected
//      2. if some data changes in a middle of deep component tree, react will simply restart rendering
//         without waiting for the old render to finish.

// 1. react model UI as a tree (but only the component, not simple tags from html(dom))
// 2. browsers use tree structures to model HTML (DOM) and CSS (CSSOM).
// 3. mobile platforms also use trees to represent their view hierarchy.
// 4. usually, the top components handle all the logic, while the lower components rerender based on their,
//    props, info, .logic, .etc
