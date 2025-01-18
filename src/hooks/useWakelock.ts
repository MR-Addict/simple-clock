import { useEffect, useRef, useState } from "react";

export default function useWakelock(wake: boolean) {
  const [locked, setLocked] = useState(false);

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    (async () => {
      /**
       * If wake is true, request a wake lock.
       */
      if (wake) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
          setLocked(wakeLockRef.current?.released === false);
        } catch (e) {
          console.error(e);
          setLocked(false);
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
  }, [wake]);

  return locked;
}
