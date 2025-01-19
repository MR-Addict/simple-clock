import { createPortal } from "react-dom";
import { PiCoffee } from "react-icons/pi";
import { FiGithub } from "react-icons/fi";
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";

import { useState } from "react";
import { Switch, InputNumber } from "antd";

import useWakelock from "@/hooks/useWakelock";
import useCtrlWheel from "@/hooks/useCtrlWheel";
import useMatchMedia from "@/hooks/useMatchMedia";

import style from "./Settings.module.css";
import { useAppContext } from "@/contexts/App";
import { useScreenHintContext } from "@/contexts/ScreenHint";

export default function Settings() {
  const [fullscreen, setFullscreen] = useState(false);
  const [keepAwake, requestWakeLock, releaseWakeLock] = useWakelock();

  const { setHint } = useScreenHintContext();
  const { isMouseVisible, config, setConfig, openSettings, setOpenSettings } = useAppContext();

  async function handleFullscreen(value: boolean) {
    setOpenSettings(false);

    try {
      if (!value) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (err) {
      console.error(err);
      alert(`Unable to ${value ? "enter" : "exit"} fullscreen, you may need to manually toggle it`);
    }
  }

  function handleZoom(dir: "up" | "down") {
    const size = config.size + (dir === "up" ? 1 : -1);
    setHint(`Size ${size}`);
    setConfig((prev) => ({ ...prev, size }));
  }

  useCtrlWheel(handleZoom);
  useMatchMedia(setFullscreen, "(display-mode: fullscreen)");

  return (
    <>
      <div className={style["settings-buttons"]}>
        <button
          type="button"
          title="Open Settings"
          onClick={() => setOpenSettings(true)}
          data-visible={isMouseVisible && !openSettings}
        >
          <RiMenu2Line />
        </button>

        <button
          type="button"
          title="Your device is keeping awake"
          onClick={releaseWakeLock}
          data-visible={isMouseVisible && !openSettings && keepAwake}
        >
          <PiCoffee />
        </button>
      </div>

      {createPortal(
        <section
          data-open={openSettings}
          className={style["settings-wrapper"]}
          onClick={(e) => e.target === e.currentTarget && setOpenSettings(false)}
        >
          <div className={style["settings-content"]}>
            <header>
              <h1>Settings</h1>

              <button type="button" onClick={() => setOpenSettings(false)} title="Close Settings">
                <IoCloseOutline />
              </button>
            </header>

            <ul className={style["settings-list"]}>
              <li className={style["settings-item"]}>
                <p className={style.label}>Show seconds</p>
                <p className={style.description}>Show seconds in the clock</p>
                <Switch
                  checked={config.showSeconds}
                  onChange={(value) => setConfig((prev) => ({ ...prev, showSeconds: value }))}
                />
              </li>

              <li className={style["settings-item"]}>
                <p className={style.label}>Show background</p>
                <p className={style.description}>Show background in the clock</p>
                <Switch
                  checked={config.showBackground}
                  onChange={(value) => setConfig((prev) => ({ ...prev, showBackground: value }))}
                />
              </li>

              <li className={style["settings-item"]}>
                <p className={style.label}>Keep awake</p>
                <p className={style.description}>
                  Keep your device awake, this may not work due to your device settings or the page is not visible
                </p>
                <Switch
                  checked={keepAwake}
                  disabled={!("wakeLock" in navigator)}
                  onChange={(value) => (value ? requestWakeLock() : releaseWakeLock())}
                />
              </li>

              <li className={style["settings-item"]}>
                <p className={style.label}>Fullscreen</p>
                <p className={style.description}>
                  Toggle between fullscreen mode, this may not work due to your device settings
                </p>
                <Switch checked={fullscreen} onChange={handleFullscreen} disabled={!document.fullscreenEnabled} />
              </li>

              <li className={style["settings-item"]}>
                <p className={style.label}>Clock Size</p>
                <p className={style.description}>
                  Adjust the size of the clock, you can also use <kbd>Ctrl/Cmd</kbd> + <kbd>Wheel</kbd> to adjust the
                  size
                </p>
                <InputNumber
                  min={0}
                  value={config.size}
                  onChange={(value) => value !== null && setConfig((prev) => ({ ...prev, size: value }))}
                />
              </li>
            </ul>

            <footer className={style["settings-footer"]}>
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="Github Link"
                href="https://github.com/MR-Addict/simple-clock"
                className={style["github-link"]}
              >
                <span>Github</span>
                <FiGithub />
              </a>
            </footer>
          </div>
        </section>,
        document.getElementById("root")!
      )}
    </>
  );
}
