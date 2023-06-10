import { createTheme } from "@mui/material/styles";



export const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      text: {
        primary: "#000000", 
      },
    },
    components: {
      MuiInput: {
        styleOverrides: {
          input: {
            color: "#000000", // Input text color
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#000000", // Input label color
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "transparent",
          },
        },
      },
    },
  });