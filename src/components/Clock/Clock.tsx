import { useEffect, useMemo, useState } from "react";

import style from "./Clock.module.css";

import { useAppContext } from "@/contexts/App";
import { formatTime, splitDigits } from "@/lib/utils/formatTime";

export default function Clock() {
  const { config } = useAppContext();

  const [time, setTime] = useState(formatTime(new Date()));

  const stringTime = useMemo(() => {
    const hourStr = splitDigits(time.hour);
    const minuteStr = splitDigits(time.minute);
    const secondStr = splitDigits(time.second);

    const timeWithtoutSecond = `${hourStr}:${minuteStr}`;
    if (config.showSeconds) return `${timeWithtoutSecond}:${secondStr}`;
    return timeWithtoutSecond;
  }, [time, config.showSeconds]);

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={style.wrapper}
      style={{ fontSize: `${config.size}em` }}
      data-show-background={config.showBackground}
    >
      {stringTime}
    </section>
  );
}
