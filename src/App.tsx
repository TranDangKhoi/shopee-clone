import useRoutesElement from "./routes/useRouteElements";
// eslint-disable-next-line import/no-unresolved
function App() {
  const routeElements = useRoutesElement();
  return <>{routeElements}</>;
}

export default App;
