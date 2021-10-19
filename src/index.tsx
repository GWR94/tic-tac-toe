import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Setup from "./components/Setup";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import "./scss/styles.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "animate.css";

const store = configureStore();
const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Oswald, sans-serif",
        },
      },
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Setup />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
