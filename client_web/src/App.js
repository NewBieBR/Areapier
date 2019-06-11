import React, { Component } from "react";
import { SnackbarProvider } from "notistack";

import AreaRouter from "./routes/AreaRouter";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {500: "#FF5722"}
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          autoHideDuration={4000}
        >
          <AreaRouter />
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
