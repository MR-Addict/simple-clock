"use client";

import { createContext, useContext, useEffect, useState } from "react";

import useUserIdle from "@/hooks/useUserIdle";
import useAppConfig from "@/hooks/useAppConfig";

import { AppConfigType, defaultAppConfig } from "@/types/app";

interface AppContextProps {
  userIdle: boolean;

  config: AppConfigType;
  setConfig: React.Dispatch<React.SetStateAction<AppConfigType>>;

  openSettings: boolean;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>({
  userIdle: false,

  config: defaultAppConfig,
  setConfig: () => {},

  openSettings: false,
  setOpenSettings: () => {}
});

function setCursor(hide: boolean) {
  document.body.style.cursor = hide ? "none" : "auto";
}

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { config, setConfig } = useAppConfig();

  const [openSettings, setOpenSettings] = useState(false);

  const userIdle = useUserIdle({ disabled: openSettings });

  useEffect(() => {
    setCursor(userIdle);
    return () => setCursor(false);
  }, [userIdle]);

  return (
    <AppContext.Provider
      value={{
        userIdle,

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
