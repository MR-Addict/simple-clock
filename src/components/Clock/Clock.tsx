import { useEffect, useState } from "react";

import style from "./Clock.module.css";

import { useAppContext } from "@/contexts/App";
import { formatTime, splitDigits } from "@/lib/utils/formatTime";

export default function Clock() {
  const { config } = useAppContext();

  const [blink, setBlink] = useState<boolean | null>(null);
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
      if (config.showSeconds) setBlink(null);
      else setBlink((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, [config.showSeconds]);

  return (
    <section
      className={style.wrapper}
      data-show-background={config.showBackground}
      style={{ "--size": `${config.size}rem` } as React.CSSProperties}
    >
      <ul className={style.clock}>
        {/* Hour */}
        <li className={style["digit-group"]}>
          {splitDigits(time.hour).map((digit, index) => (
            <span key={index} className={style.digit}>
              {digit}
            </span>
          ))}
        </li>

        <li className={style.colon} data-hide={blink === false} />

        {/* Minute */}
        <li className={style["digit-group"]}>
          {splitDigits(time.minute).map((digit, index) => (
            <span key={index} className={style.digit}>
              {digit}
            </span>
          ))}
        </li>

        {config.showSeconds && (
          <>
            <li className={style.colon} />

            {/* Second */}
            <li className={style["digit-group"]}>
              {splitDigits(time.second).map((digit, index) => (
                <span key={index} className={style.digit}>
                  {digit}
                </span>
              ))}
            </li>
          </>
        )}
      </ul>
    </section>
  );
}
