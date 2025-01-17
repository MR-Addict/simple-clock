"use client";

import { createContext, useContext, useEffect, useState } from "react";

import useAppConfig from "@/hooks/useAppConfig";
import useMouseVisibility from "@/hooks/useMouseVisibility";

import { AppConfigType, defaultAppConfig } from "@/types/app";

interface AppContextProps {
  isMouseVisible: boolean;

  config: AppConfigType;
  setConfig: React.Dispatch<React.SetStateAction<AppConfigType>>;

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
  const { config, setConfig } = useAppConfig();
  const [openSettings, setOpenSettings] = useState(false);

  const isMouseVisible = useMouseVisibility({ disabled: openSettings });

  useEffect(() => {
    setCursor(isMouseVisible);
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
