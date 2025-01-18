import { useEffect } from "react";

type Callback = (dir: "up" | "down") => void;

export default function useCtrlWheel(callback: Callback) {
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      if (e.ctrlKey) {
        e.preventDefault();
        callback(e.deltaY > 0 ? "down" : "up");
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [callback]);
}
