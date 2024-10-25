import { app, BrowserWindow } from "electron";
import { readFile, writeFile } from "fs/promises";

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

let mainWindow = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      center: true,
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
    },
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.webContents.on("did-finish-load", async (e) => {
    const url = mainWindow.webContents.getURL();
    if (url === "https://www.youtube.com/") {
      const match = await mainWindow.webContents.executeJavaScript(
        "/ytcfg\\.set\\(({.+?})\\);/.exec(document.head.innerHTML)",
        true
      );
      const sessionId = match
        ? JSON.parse(match[1])["DELEGATED_SESSION_ID"]
        : undefined;
      const ses = mainWindow.webContents.session;
      const cookies = await ses.cookies.get({});
      const creds = Object.fromEntries(
        cookies
          .filter((cookie) =>
            ["APISID", "HSID", "SAPISID", "SID", "SSID"].includes(cookie.name)
          )
          .map((cookie) => [cookie.name, cookie.value])
      );
      const token = Buffer.from(
        JSON.stringify({ ...creds, DELEGATED_SESSION_ID: sessionId })
      ).toString("base64");

      const envFile = await readFile(".env", "utf-8").catch(() => "");
      const env = envFile
        .trim()
        .split("\n")
        .reduce((acc, line) => {
          const [key, value] = line.split("=");
          acc[key] = value;
          return acc;
        }, {});
      env["YOUTUBE_BOT_CREDENTIALS"] = token;
      await writeFile(
        ".env",
        Object.entries(env)
          .map(([k, v]) => `${k}=${v}`)
          .join("\n")
      );

      console.log("Login successful.");
      app.quit();
    }
  });

  await mainWindow.loadURL(
    "https://accounts.google.com/ServiceLogin?service=youtube&passive=true&continue=https://www.youtube.com/channel_switcher&uilel=3&hl=en&flowName=GlifWebSignIn&flowEntry=ServiceLogin" +
      { userAgent: "Chrome" }
  );
}

app.on("session-created", (session) => {
  session.clearStorageData();
});

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error("Failed create window:", e));
