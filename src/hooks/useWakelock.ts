import { useEffect, useRef, useState } from "react";

export default function useWakelock(lock: boolean) {
  const [locked, setLocked] = useState(false);

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    (async () => {
      /**
       * If wake is true, request a wake lock.
       */
      if (lock) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
          setLocked(wakeLockRef.current?.released === false);
        } catch (e) {
          console.error(e);
          setLocked(false);
          alert("Your browser or device currently doesn't allow the screen to stay awake");
        }

        return;
      }

      /**
       * If wake is false, release the wake lock
       */
      try {
        await wakeLockRef.current?.release();
        setLocked(wakeLockRef.current?.released === false);
      } catch (e) {
        console.error(e);
        setLocked(false);
      }
    })();

    /**
     * Cleanup function
     */
    return () => {
      wakeLockRef.current?.release();
      setLocked(wakeLockRef.current?.released === false);
    };
  }, [lock]);

  return locked;
}
