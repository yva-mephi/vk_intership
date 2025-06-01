import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0077FF", // vk-акцент
    },
    secondary: {
      main: "#3B82F6",
    },
    background: {
      default: "#FFFFFF", // белый фон
      paper: "#f9f9f9", // для карточек и контейнеров
    },
    text: {
      primary: "#000000", // чёрный текст
      secondary: "#555555", // серый для второстепенного текста
    },
    action: {
      active: "#4F9CFF", // для активных элементов
    },
  },
  typography: {
    fontFamily: ['"Inter"', "sans-serif"].join(","),
    h4: {
      fontWeight: 600,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
