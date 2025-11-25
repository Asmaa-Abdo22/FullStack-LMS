import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/outfit";
import "./index.css";
import App from "./App.jsx";
import { AppContexttProvider } from "./Context/AppContext.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContexttProvider>
      <App />
    </AppContexttProvider>
  </StrictMode>
);
