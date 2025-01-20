import { VitePWA } from "vite-plugin-pwa";

const themeColor = "#000";
const appName = "Simple Clock";

const pwa = VitePWA({
  registerType: "autoUpdate",
  manifest: {
    name: appName,
    short_name: appName,
    description: appName,
    theme_color: themeColor,
    background_color: themeColor,
    display: "standalone",
    icons: [
      {
        src: "images/web-app-manifest-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "images/web-app-manifest-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "images/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "images/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ]
  }
});

export default pwa;
