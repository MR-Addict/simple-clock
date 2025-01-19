import { useRef, useState } from "react";

function isWakeLockAvailable() {
  if (typeof navigator === "undefined") return false;
  return "wakeLock" in navigator;
}

/**
 *
 * @returns A tuple containing the following values:
 * - `keepAwake`: A boolean indicating whether the wake lock is active, `null` if wake lock is not available
 * - `requestWakeLock`: A function to request a wake lock
 * - `releaseWakeLock`: A function to release the wake lock
 */
export default function useWakelock() {
  const [keepAwake, setKeepAwake] = useState<boolean | null>(() => (isWakeLockAvailable() ? false : null));

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  function updateLockStatus() {
    setKeepAwake(wakeLockRef.current?.released === false);
  }

  /**
   * @returns A boolean indicating whether the wake lock was successfully requested
   */
  async function requestWakeLock() {
    let success = false;

    try {
      // If the wake lock is not available, return false
      if (!isWakeLockAvailable()) success = false;
      // If the wake lock is already active, return true
      else if (wakeLockRef.current && !wakeLockRef.current.released) success = true;
      // Otherwise, request a new wake lock
      else {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
        wakeLockRef.current.addEventListener("release", updateLockStatus);
        success = true;
      }
    } catch (err) {
      console.error(err);
      success = false;
    }

    updateLockStatus();
    return success;
  }

  /**
   * @returns A boolean indicating whether the wake lock was successfully released
   */
  async function releaseWakeLock() {
    let success = false;

    try {
      // If the wake lock is not available, return false
      if (!isWakeLockAvailable()) success = false;
      // If there is no wake lock to release, return false
      else if (!wakeLockRef.current) success = false;
      // If the wake lock is already released, return true
      else if (wakeLockRef.current.released) success = true;
      // Otherwise, release the wake lock
      else {
        await wakeLockRef.current.release();
        wakeLockRef.current.removeEventListener("release", updateLockStatus);
        success = true;
      }
    } catch (err) {
      console.error(err);
      success = false;
    }

    updateLockStatus();

    return success;
  }

  return [keepAwake, requestWakeLock, releaseWakeLock] as const;
}
