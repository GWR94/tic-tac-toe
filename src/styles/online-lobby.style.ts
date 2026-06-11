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
    fontSize: "2.5rem",
    letterSpacing: "0.3em",
    fontWeight: 700,
    margin: 0,
    color: "#0f9128",
    fontFamily: "Oswald, sans-serif",
  },
  roomCodeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    margin: "16px 0",
  },
  copyButton: {
    border: "2px solid #0f9128",
    borderRadius: 8,
    background: "rgba(255, 255, 255, 0.85)",
    color: "#0f9128",
    cursor: "pointer",
    fontSize: "1.25rem",
    lineHeight: 1,
    padding: "10px 12px",
    "&:hover": {
      background: "rgba(15, 145, 40, 0.1)",
    },
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
  openRoomsSection: {
    maxWidth: 360,
    width: "100%",
    marginBottom: 16,
  },
  openRoomsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  openRoomsTitle: {
    fontSize: "1.1rem !important",
    fontFamily: "Oswald, sans-serif",
  },
  openRoomsEmpty: {
    fontSize: "0.95rem !important",
    textAlign: "center",
    color: "#666",
    padding: "12px 0",
  },
  openRoomsList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxHeight: 180,
    overflowY: "auto",
  },
  openRoomItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px 14px",
    border: "2px solid #0f9128",
    borderRadius: 8,
    background: "rgba(255, 255, 255, 0.85)",
    cursor: "pointer",
    fontFamily: "Oswald, sans-serif",
    textAlign: "left",
    "&:hover": {
      background: "rgba(15, 145, 40, 0.1)",
    },
  },
  openRoomCode: {
    fontSize: "1.2rem",
    letterSpacing: "0.2em",
    fontWeight: 700,
    color: "#0f9128",
  },
  openRoomHost: {
    fontSize: "0.95rem",
    color: "#333",
  },
  openRoomsDivider: {
    fontSize: "1rem !important",
    textAlign: "center",
    color: "#666",
    marginBottom: 8,
    width: "100%",
    maxWidth: 360,
  },
});
