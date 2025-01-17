import { useEffect, useState } from "react";

export default function useMouseVisibility(idleTime = 5000) {
  const [isMouseVisible, setIsMouseVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleMouseMove = () => {
      setIsMouseVisible(true);

      // Reset the timer whenever the mouse moves
      if (timer) clearTimeout(timer);

      // Hide the mouse after `idleTime` of inactivity
      timer = setTimeout(() => setIsMouseVisible(false), idleTime);
    };

    // Attach the event listener
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Cleanup the event listener and timer
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [idleTime]);

  return isMouseVisible;
}
