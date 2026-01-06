import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/outfit";
import "quill/dist/quill.snow.css";

import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.jsx";
import { AppContexttProvider } from "./Context/AppContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppContexttProvider>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
        />
        <App />
      </AppContexttProvider>
    </ClerkProvider>
  </StrictMode>
);
