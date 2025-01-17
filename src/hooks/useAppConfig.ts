import { useEffect, useState } from "react";

import { AppConfig, AppConfigType, defaultAppConfig } from "@/types/app";

export function loadAppConfig(): AppConfigType {
  const localConfig = localStorage.getItem("config");
  const parsedConfig = AppConfig.safeParse(JSON.parse(localConfig || "{}"));

  if (!parsedConfig.success) return defaultAppConfig;

  return parsedConfig.data;
}

export default function useAppConfig() {
  const [config, setConfig] = useState(loadAppConfig);

  useEffect(() => localStorage.setItem("config", JSON.stringify(config)), [config]);

  return { config, setConfig };
}
