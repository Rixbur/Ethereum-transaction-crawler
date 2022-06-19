import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

function SignIn() {
  const { startInspect, isLoading } = useAppContext();
  const [state, setState] = useState({ address: "", fromBlock: "" });
  const updateState = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    startInspect({ ...state });
  };
  const navigateTo = useNavigate();
  const goToDashboard = (e) => {
    e.preventDefault();
    // dispatch
    navigateTo("/dashboard");
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Icon icon="mdi:ethereum" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inspect Ethereum Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Ethereum Address"
              name="address"
              autoFocus
              onChange={updateState}
              value={state.address}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="fromBlock"
              label="Start-From"
              id="fromBlock"
              placeholder="block number:"
              onChange={updateState}
              value={state.fromBlock}
            />
            <Typography align="center">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => {
                    goToDashboard(e);
                  }}
                >
                  Inspect
                </Button>
              )}
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignIn;
