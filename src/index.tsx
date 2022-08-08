import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
