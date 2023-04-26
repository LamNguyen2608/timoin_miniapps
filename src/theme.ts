import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        purple: {
          100: "#f4f3ff",
          200: "#e8e8ff",
          300: "#dddcff",
          400: "#d1d1ff",
          500: "#c6c5ff",
          600: "#9e9ecc",
          700: "#777699",
          800: "#4f4f66",
          900: "#282733",
        },
        pink: {
          100: "#fff7ff",
          200: "#fff0ff",
          300: "#ffe8ff",
          400: "#ffe1ff",
          500: "#ffd9ff",
          600: "#ccaecc",
          700: "#998299",
          800: "#665766",
          900: "#332b33",
        },
        yellow: {
          100: "#fff8f0",
          200: "#fff1e2",
          300: "#ffead3",
          400: "#ffe3c5",
          500: "#ffdcb6",
          600: "#ccb092",
          700: "#99846d",
          800: "#665849",
          900: "#332c24",
        },
        blue: {
          100: "#f0fafe",
          200: "#e1f5fd",
          300: "#d3effd",
          400: "#c4eafc",
          500: "#b5e5fb",
          600: "#91b7c9",
          700: "#6d8997",
          800: "#485c64",
          900: "#242e32",
        },
        brown: {
          100: "#f6ece6",
          200: "#edd9cc",
          300: "#e5c7b3",
          400: "#dcb499",
          500: "#d3a180",
          600: "#a98166",
          700: "#7f614d",
          800: "#544033",
          900: "#2a201a",
        },
      }
    : {
        purple: {
          100: "#282733",
          200: "#4f4f66",
          300: "#777699",
          400: "#9e9ecc",
          500: "#c6c5ff",
          600: "#d1d1ff",
          700: "#dddcff",
          800: "#e8e8ff",
          900: "#f4f3ff",
        },
        pink: {
          100: "#332b33",
          200: "#665766",
          300: "#998299",
          400: "#ccaecc",
          500: "#ffd9ff",
          600: "#ffe1ff",
          700: "#ffe8ff",
          800: "#fff0ff",
          900: "#fff7ff",
        },
        yellow: {
          100: "#332c24",
          200: "#665849",
          300: "#99846d",
          400: "#ccb092",
          500: "#ffdcb6",
          600: "#ffe3c5",
          700: "#ffead3",
          800: "#fff1e2",
          900: "#fff8f0",
        },
        blue: {
          100: "#242e32",
          200: "#485c64",
          300: "#6d8997",
          400: "#91b7c9",
          500: "#b5e5fb",
          600: "#c4eafc",
          700: "#d3effd",
          800: "#e1f5fd",
          900: "#f0fafe",
        },
        brown: {
          100: "#2a201a",
          200: "#544033",
          300: "#7f614d",
          400: "#a98166",
          500: "#d3a180",
          600: "#dcb499",
          700: "#e5c7b3",
          800: "#edd9cc",
          900: "#f6ece6",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode: string) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.purple[500],
            },
            secondary: {
              main: colors.pink[500],
            },
            neutral: {
              dark: colors.yellow[700],
              main: colors.yellow[500],
              light: colors.yellow[100],
            },
            background: {
              default: colors.purple[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.purple[100],
            },
            secondary: {
              main: colors.pink[500],
            },
            neutral: {
              dark: colors.yellow[700],
              main: colors.yellow[500],
              light: colors.yellow[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      //fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      value: {
        fontSize: 45,
      },
      h1: {
        //fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 30,
      },
      h2: {
        //fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 22,
      },
      h3: {
        //fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h4: {
        //fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 18,
      },
      h5: {
        //fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        //fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
