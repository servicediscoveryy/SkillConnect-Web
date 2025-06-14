import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/user.context.tsx";
import { LocationProvider } from "./context/useLocationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <LocationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocationProvider>
    </AuthProvider>
  </StrictMode>
);
