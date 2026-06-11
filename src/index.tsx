import React from "react";
import ReactDOM from "react-dom";
import Setup from "./components/Setup";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import "./styles/styles.css";
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
  document.getElementById("root"),
);
