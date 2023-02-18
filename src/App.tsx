import "./App.css";
import useRoutesElement from "./hooks/useRouteElements";

function App() {
  const routeElements = useRoutesElement();
  return <>{routeElements}</>;
}

export default App;
