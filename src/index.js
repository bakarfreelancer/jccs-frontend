import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

// Redux setup
import { configureStore } from "@reduxjs/toolkit";
// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducers";
// import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./reducers";
// const store = configureStore({
//   reducer: rootReducer,
// devTools: "developemnt" !== "production",
//   middleware: [thunk],
// });
let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
