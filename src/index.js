import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './index.css';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import 'intro.js/introjs.css'
import { store } from './store'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
