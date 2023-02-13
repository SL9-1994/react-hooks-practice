import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const sl91994Info = {
  name: "SL9",
  age: 15,
};

const Sl91994Context = createContext(sl91994Info);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Sl91994Context.Provider value={sl91994Info}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Sl91994Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

export default Sl91994Context