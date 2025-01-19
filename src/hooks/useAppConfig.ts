import { useEffect, useState } from "react";

import { AppConfig, AppConfigType, defaultAppConfig } from "@/types/app";

export function loadAppConfig(): AppConfigType {
  const localConfig = JSON.parse(localStorage.getItem("config") || "{}");

  // If the browser doesn't support the Wake Lock API, set the keepAwake to false
  if (!("wakeLock" in navigator)) Object.assign(localConfig, { keepAwake: false });

  const parsedConfig = AppConfig.safeParse(localConfig);

  if (!parsedConfig.success) return defaultAppConfig;

  return parsedConfig.data;
}

export default function useAppConfig() {
  const [config, setConfig] = useState(loadAppConfig);

  useEffect(() => localStorage.setItem("config", JSON.stringify(config)), [config]);

  return { config, setConfig };
}
