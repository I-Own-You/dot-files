// custom hooks
//
// a way to define custom logic where you can use use hooks from react, mainly to separate logic
//
// react custom hooks name must start with lower "use" followed by a capital letter,
// like: "useSomething".
//
// even though the naming convention isnt strict about the fact that,
// you can create a cusotm hook and use no hooks inside it, react linter will complaint, but
// its not a compilation erorr, but as a good rule, if you have a custom hook, you must always,
// have hooks inside it defined, but if you dont, its not a problem if they will be added later.

// custom hook example
// 1. this hook wont be shared between components or hooks, its like a regular function,
//    which will be called and kind of (inlined) for everyone which called it, so it shares the functionality,
//    not the state defined inside, if you need to share state, lift it up and pass from a parent.
// 2. when the component which called the custom hooks is rerendering, the custom hook is rerendering,
//    also, so it must be pure, its like a part of the component itself, and if the custom hook is rerendering,
//    the component will do so.
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return isOnline;
}
function StatusBar() {
  // here you use the custom hook, all its state is local to the StatusBar, so it will trigger,
  // the rerenders of StatusBar too.
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}

// another useful example of custom hook
function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}
function ShippingForm({ country }) {
  const cities = useData(`/api/cities?country=${country}`);
  // has no implementation, just an example of how it would be
  const [city, setCity] = useState(null);
  const areas = useData(city ? `/api/areas?city=${city}` : null);
  return <div></div>;
}
