import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

export default makeStyles({
  container: {
    fontFamily: "Oswald,  sans-serif",
    height: "90%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: "2rem !important",
    textAlign: "center",
    fontFamily: "Oswald,  sans-serif",
    marginBottom: 12,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem !important",
    },
  },
  subtitle: {
    fontSize: "1.5rem !important",
    textAlign: "center",
    fontFamily: "Oswald,  sans-serif",
    marginBottom: 15,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem !important",
    },
  },
  subtitleTwo: {
    fontSize: "1.2rem !important",
    textAlign: "center",
    fontFamily: "Oswald,  sans-serif",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem !important",
    },
  },
  button: {
    margin: "0 10px",
  },
  buttonContainer: {
    margin: "30px auto",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});
