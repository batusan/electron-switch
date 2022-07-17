const { app, BrowserWindow,Menu } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    resizable: false,
    icon: path.join(__dirname,"blockchain.png"),
    //transparent:true,
    //frame:false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  //win.webContents.openDevTools(); // Dev menu
  Menu.setApplicationMenu(null)
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
