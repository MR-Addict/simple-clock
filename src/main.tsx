import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";
import Clock from "@/components/Clock/Clock.tsx";
import Settings from "@/components/Settings/Settings";
import { AppContextProvider } from "./contexts/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <Settings />
      <Clock />
    </AppContextProvider>
  </StrictMode>
);
