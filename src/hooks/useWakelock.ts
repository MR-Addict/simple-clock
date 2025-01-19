import { useRef, useState } from "react";

/**
 *
 * @returns A tuple containing the following values:
 * - `keepAwake`: A boolean indicating whether the screen is kept awake
 * - `requestWakeLock`: A function to request a wake lock
 * - `releaseWakeLock`: A function to release the wake lock
 */
export default function useWakelock() {
  const [keepAwake, setKeepAwake] = useState(false);

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  function updateLockStatus() {
    setKeepAwake(wakeLockRef.current?.released === false);
  }

  async function requestWakeLock() {
    try {
      wakeLockRef.current = await navigator.wakeLock.request("screen");
      wakeLockRef.current.addEventListener("release", updateLockStatus);
    } catch (err) {
      console.error(err);
    } finally {
      updateLockStatus();
    }
  }

  async function releaseWakeLock() {
    try {
      if (!wakeLockRef.current) return;
      await wakeLockRef.current.release();
      wakeLockRef.current.removeEventListener("release", updateLockStatus);
    } catch (err) {
      console.error(err);
    } finally {
      updateLockStatus();
    }
  }

  return [keepAwake, requestWakeLock, releaseWakeLock] as const;
}
