import useRoutesElement from "./routes/useRouteElements";

function App() {
  const routeElements = useRoutesElement();
  return <>{routeElements}</>;
}

export default App;
