import "core-js/stable";
import "regenerator-runtime/runtime";
import React, { FC } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import "bootstrap-css-only/css/bootstrap.min.css";
import "./scss/styles.scss";
import Setup from "./components/Setup";

/**
 * ? Optional Redux DevTools ?
 * declare global {
 * interface Window {
 *  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
 *   }
 * }
 */

const App: FC = (): JSX.Element => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <div id="app">
        <Setup />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
