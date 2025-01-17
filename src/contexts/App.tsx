"use client";

import { createContext, useContext, useEffect, useState } from "react";

import usePersistantState from "@/hooks/usePersistantState";
import useMouseVisibility from "@/hooks/useMouseVisibility";

import { AppConfig, defaultAppConfig } from "@/types/app";

interface AppContextProps {
  isMouseVisible: boolean;

  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;

  openSettings: boolean;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>({
  isMouseVisible: false,

  config: defaultAppConfig,
  setConfig: () => {},

  openSettings: false,
  setOpenSettings: () => {}
});

function setCursor(show: boolean) {
  document.body.style.cursor = show ? "auto" : "none";
}

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const isMouseVisible = useMouseVisibility();
  const [openSettings, setOpenSettings] = useState(false);
  const [config, setConfig] = usePersistantState("config", defaultAppConfig);

  useEffect(() => {
    setCursor(isMouseVisible);
    // if (!isMouseVisible) setOpenSettings(false);

    return () => setCursor(true);
  }, [isMouseVisible]);

  return (
    <AppContext.Provider
      value={{
        isMouseVisible,

        config,
        setConfig,

        openSettings,
        setOpenSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
