import { createPortal } from "react-dom";
import { FiGithub } from "react-icons/fi";
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";

import { Switch, InputNumber } from "antd";
import { useEffect, useState } from "react";

import style from "./Settings.module.css";
import { useAppContext } from "@/contexts/App";

export default function Settings() {
  const [fullscreen, setFullscreen] = useState(false);
  const { isMouseVisible, config, setConfig, openSettings, setOpenSettings } = useAppContext();

  function handleFullscreen(value: boolean) {
    setOpenSettings(false);
    if (!value) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) setFullscreen(true);
      else setFullscreen(false);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Open Panel"
        className={style["settings-button"]}
        onClick={() => setOpenSettings(true)}
        data-visible={isMouseVisible && !openSettings}
      >
        <RiMenu2Line />
      </button>

      {createPortal(
        <section
          data-open={openSettings}
          className={style["settings-wrapper"]}
          onClick={(e) => e.target === e.currentTarget && setOpenSettings(false)}
        >
          <div className={style["settings-content"]}>
            <header>
              <h1>Settings</h1>
              <button type="button" onClick={() => setOpenSettings(false)} aria-label="Close Panel">
                <IoCloseOutline />
              </button>
            </header>

            <ul className={style["settings-list"]}>
              <li className={style["settings-item"]}>
                <p className={style.label}>Fullscreen</p>
                <Switch checked={fullscreen} onChange={handleFullscreen} disabled={!document.fullscreenEnabled} />
              </li>

              <li className={style["settings-item"]}>
                <p className={style.label}>Show seconds</p>
                <Switch
                  checked={config.showSeconds}
                  onChange={(value) => setConfig((prev) => ({ ...prev, showSeconds: value }))}
                />
              </li>

              <li className={style["settings-item"]}>
                <p className={style.label}>Show background</p>
                <Switch
                  checked={config.showBackground}
                  onChange={(value) => setConfig((prev) => ({ ...prev, showBackground: value }))}
                />
              </li>

              <li className={style["settings-item"]}>
                <p className={style.label}>Clock Size</p>
                <InputNumber
                  min={0}
                  value={config.size}
                  onChange={(value) => value !== null && setConfig((prev) => ({ ...prev, size: value }))}
                />
              </li>
            </ul>

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
          </div>
        </section>,
        document.getElementById("root")!
      )}
    </>
  );
}
