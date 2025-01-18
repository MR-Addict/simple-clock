import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";
import Clock from "@/components/Clock/Clock.tsx";
import Settings from "@/components/Settings/Settings";

import { AppContextProvider } from "@/contexts/App";
import { ScreenHintContextProvider } from "@/contexts/ScreenHint";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <ScreenHintContextProvider>
        <Settings />
        <Clock />
      </ScreenHintContextProvider>
    </AppContextProvider>
  </StrictMode>
);
