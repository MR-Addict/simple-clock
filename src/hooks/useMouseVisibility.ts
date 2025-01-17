import { useEffect, useState } from "react";

interface Options {
  idleTime?: number;
  disabled?: boolean;
}

const defaultOptions: Options = {
  idleTime: 3000,
  disabled: false
};

export default function useMouseVisibility(options = defaultOptions) {
  options = { ...defaultOptions, ...options };

  const [isMouseVisible, setIsMouseVisible] = useState(false);

  useEffect(() => {
    if (options.disabled) {
      setIsMouseVisible(true);
      return;
    }

    let timer: NodeJS.Timeout;

    const handleMouseMove = () => {
      setIsMouseVisible(true);

      // Reset the timer whenever the mouse moves
      if (timer) clearTimeout(timer);

      // Hide the mouse after `idleTime` of inactivity
      timer = setTimeout(() => setIsMouseVisible(false), options.idleTime);
    };

    // Attach the event listener
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Cleanup the event listener and timer
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [options]);

  return isMouseVisible;
}
