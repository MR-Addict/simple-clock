import { useEffect, useRef, useState } from "react";

/**
 *
 * @param awake set to true to request a wake lock, false to release it
 * @returns whether the wake lock is active
 */
export default function useWakelock(awake: boolean) {
  const [keepAwake, setKeepAwake] = useState(false);

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const updateLockStatus = () => setKeepAwake(wakeLockRef.current?.released === false);

    (async () => {
      if (awake) {
        /**
         * If wake is true, request a wake lock.
         */

        try {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        } catch (e) {
          console.error(e);
        }
      } else {
        /**
         * If wake is false, release the wake lock
         */

        try {
          await wakeLockRef.current?.release();
          setKeepAwake(wakeLockRef.current?.released === false);
        } catch (e) {
          console.error(e);
        }
      }

      updateLockStatus();

      wakeLockRef.current?.addEventListener("release", updateLockStatus);
    })();

    /**
     * Cleanup function
     */
    return () => {
      (async () => {
        await wakeLockRef.current?.release();
        wakeLockRef.current?.removeEventListener("release", updateLockStatus);
        updateLockStatus();
      })();
    };
  }, [awake]);

  return keepAwake;
}
