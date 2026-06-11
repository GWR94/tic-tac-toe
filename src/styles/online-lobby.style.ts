import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

export default makeStyles({
  container: {
    fontFamily: "Oswald, sans-serif",
    height: "90%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 20px",
  },
  title: {
    fontSize: "2rem !important",
    textAlign: "center",
    fontFamily: "Oswald, sans-serif",
    marginBottom: 12,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem !important",
    },
  },
  subtitle: {
    fontSize: "1.3rem !important",
    textAlign: "center",
    fontFamily: "Oswald, sans-serif",
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem !important",
    },
  },
  input: {
    marginBottom: 20,
    maxWidth: 360,
    width: "100%",
  },
  roomCode: {
    fontSize: "2.5rem !important",
    letterSpacing: "0.3em",
    fontWeight: 700,
    margin: "16px 0",
    color: "#0f9128",
  },
  buttonContainer: {
    margin: "20px auto",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  status: {
    fontSize: "1.1rem !important",
    textAlign: "center",
    marginTop: 12,
    color: "#666",
  },
  error: {
    color: "#d6463c",
    marginTop: 8,
    textAlign: "center",
  },
});
