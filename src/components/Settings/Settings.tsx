import { createPortal } from "react-dom";
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";

import { Switch, InputNumber } from "antd";

import style from "./Settings.module.css";
import { useAppContext } from "@/contexts/App";

export default function Settings() {
  const { config, setConfig, isMouseVisible, openSettings, setOpenSettings } = useAppContext();

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
                <p className={style.label}>Show seconds</p>
                <Switch
                  checked={config.showSeconds}
                  onChange={(value) => setConfig((prev) => ({ ...prev, showSeconds: value }))}
                />
              </li>

              <li className={style["settings-item"]}>
                <p className={style.label}>Clock Size</p>
                <InputNumber
                  value={config.size}
                  onChange={(value) => value !== null && setConfig((prev) => ({ ...prev, size: value }))}
                />
              </li>
            </ul>
          </div>
        </section>,
        document.getElementById("root")!
      )}
    </>
  );
}
