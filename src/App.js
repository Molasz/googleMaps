import { Provider } from "react-redux";

import store from "./redux/store";

import MapWrapper from "./components/MapWrapper/MapWrapper";

function App() {
  return (
    <Provider store={store}>
      <MapWrapper />
    </Provider>
  );
}

export default App;
