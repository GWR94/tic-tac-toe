import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

export default makeStyles({
  container: {
    fontFamily: "Oswald,  sans-serif !important",
    height: "90%",
    width: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  title: {
    margin: "20px 0 !important",
    fontSize: "1.6rem !important",
    fontFamily: "Oswald,  sans-serif !important",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem !important",
    },
  },
  subtitle: {
    fontSize: "1.4rem !important",
    fontFamily: "Oswald,  sans-serif",
    textAlign: "center",
    marginBottom: "20px !important",
  },
  input: {
    width: "70%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  easyButton: {
    width: 110,
    color: "#0f9128 !important",
    borderColor: "#0f9128 !important",
  },
  normalButton: {
    width: 110,
    color: "#e37005 !important",
    borderColor: "#e37005 !important",
  },
  hardButton: {
    width: 110,
    color: "#d6463c !important",
    borderColor: "#d6463c !important",
  },
  backButton: {
    cursor: "pointer",
    fontSize: "30px",
    height: 30,
    margin: "0 auto",
    textAlign: "center",
    width: 30,
    "&:hover": {
      animation: "spin 1s linear infinite",
    },
  },
  counterText: {
    fontFamily: "Oswald, sans-serif",
    fontSize: "1.2rem !important",
  },
  counter: {
    cursor: "pointer",
    textAlign: "center",
    fontSize: "1.8rem !important",
    padding: "5px 0",
    width: 50,
    boxSizing: "border-box",
    border: "2px solid transparent",
    "&:hover": {
      borderBottom: "2px solid #f2b418",
    },
  },
  countersContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  playerContainer: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
