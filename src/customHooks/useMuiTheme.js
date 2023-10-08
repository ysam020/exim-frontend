import { createTheme } from "@mui/material/styles";

function useMuiTheme() {
  const muiTheme = createTheme({
    palette: {
      primary: { main: "#F15C6D" },
    },
  });
  return muiTheme;
}

export default useMuiTheme;
