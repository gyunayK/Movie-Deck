import { createTheme } from "@mui/material/styles";



export const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      text: {
        primary: "#ffffff", 
      },
    },
    components: {
      MuiInput: {
        styleOverrides: {
          input: {
            color: "#ffffff", // Input text color
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#ffffff", // Input label color
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