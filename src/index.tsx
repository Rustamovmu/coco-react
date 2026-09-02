import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline  from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import theme from "./app/MaterialTheme"
// @ts-ignore: Ignore missing type declarations for CSS side-effect import
import "./css/index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element was not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
       <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
