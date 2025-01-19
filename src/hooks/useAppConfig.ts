import { useEffect, useState } from "react";

import { AppConfig, AppConfigType, defaultAppConfig } from "@/types/app";

export function loadAppConfig(): AppConfigType {
  let localConfig = {};

  try {
    localConfig = JSON.parse(localStorage.getItem("config") || "{}");
  } catch (err) {
    console.error(err);
  }

  const parsedConfig = AppConfig.safeParse(localConfig);

  if (!parsedConfig.success) return defaultAppConfig;
  return parsedConfig.data;
}

export default function useAppConfig() {
  const [config, setConfig] = useState(loadAppConfig);

  useEffect(() => localStorage.setItem("config", JSON.stringify(config)), [config]);

  return { config, setConfig };
}
