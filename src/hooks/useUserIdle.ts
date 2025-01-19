import { useEffect, useRef, useState } from "react";

interface Options {
  idleTime?: number;
  disabled?: boolean;
}

const defaultOptions: Options = {
  idleTime: 3000,
  disabled: false
};

export default function useUserIdle(options = defaultOptions) {
  options = { ...defaultOptions, ...options };

  const [idle, setIdle] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If the hook is disabled, set the idle state to `false`
    if (options.disabled) return setIdle(false);

    function handleInteract() {
      setIdle(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIdle(true), options.idleTime);
    }

    // Attach the event listener
    window.addEventListener("click", handleInteract);
    window.addEventListener("keydown", handleInteract);
    window.addEventListener("mousemove", handleInteract);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("click", handleInteract);
      window.removeEventListener("keydown", handleInteract);
      window.removeEventListener("mousemove", handleInteract);
    };
  }, [options]);

  return idle;
}
