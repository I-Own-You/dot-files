// before your components are displayed on screen, they must be rendered by React.
// the workflow is:
//      1. TRIGGERING A RENDER
//      2. RENDERING THE COMPONENT
//      3. COMMIT TO THE DOM

// 1. TRIGGERING A RENDER
//
// reasons why a render could be triggered:
// 1. components initial render.
// 2. components (or one of its ancestors) state has been updated.
//
// 1. initial render
//     when app starts, you need to trigger the initial render.
//     frameworks and sandboxes sometimes hide this code,
//     but it’s done by calling createRoot with the target DOM node,
//     and then calling its render method with your component.
export default function Image() {
  return (
    <img
      src='https://i.imgur.com/ZF6s192.jpg'
      alt='a gigantic metallic flower sculpture with reflective petals'
    />
  )
}
import Image from './Image.js'
import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById('root'))
root.render(<Image />)
// 2. components (or one of its ancestors) state has been updated.
// 
// once the component has been initially rendered,
// you can trigger further renders by updating its state with the set function.
// updating your components state automatically queues a render.

// 2. RENDERING THE COMPONENT
//
// this process is recursive:
//      1. if the updated component returns some other component,
//         react will render that component next,
//         and if that component also returns something,
//         it will render that component next, and so on.
//         (since it can affect performance to render deep nested components, there are ways to,
//         opt out of rendering nested components).
//      2. the process will continue until there are no more nested components and
//         react knows exactly what should be displayed on screen.
export default function Gallery() {
  const [val, setVal] = useState(0)
  function hello() {
    // re-render: react will calculate which of their properties, if any,
    //            have changed since the previous render.
    //            it won’t do anything with that information until the next step, the commit phase.
    setVal(2)
  }
  return (
    // initial render: react will create the dom nodes for <section>, <h1>, and three <img> tags.
    <section>
      <h1>Inspiring Sculptures</h1>
      <Image />
      <Image />
      <Image />
      <button onClick={hello}>{val}</button>
    </section>
  );
}
function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';
const root2 = createRoot(document.getElementById('root'))
root.render(<Gallery />);

// 3. COMMIT TO THE DOM
//
// after rendering (calling) your components, React will modify the DOM.
// initial render: react will use the appendChild() DOM API to put all the DOM nodes it has created on screen.
// re-renders: react will apply the minimal necessary operations (calculated while rendering!)
//             to make the DOM match the latest rendering output.
// 
// react only changes the DOM nodes if there’s a difference between renders.
export default function Clock({ time }) {
  return (
    <>
      {/* here, h1 node will be rerendered when time changes */}
      <h1>{time}</h1>
      {/* input wont be affected even if a rerender occurs, because its in the same place it was before */}
      <input />
    </>
  );
}

// 4. BROWSER PAINT
//
// after rendering is done and React updated the DOM,
// the browser will repaint the screen.
// 
// (actually rerender is the right term, not repaint,
// but repaint is used to not confuse wiht react render)


// tips:
// 1. when you update a component during rendering,
//    react throws away the returned JSX and immediately retries rendering. 
// 2. updating a state from component A inside component B during rendering inside component B, 
//    will throw an erorr.
