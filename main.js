const { app, BrowserWindow, globalShortcut, Menu, ipcMain, shell } = require('electron');
const { writeFile, readFile } = require('original-fs');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    resizable: false,     // Prevent resizing
    fullscreenable: false // Prevent full screen mode
  })

  // and load the index.html of the app.
  win.loadFile('./dist/frontend/index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

  Menu.setApplicationMenu(null);

  globalShortcut.register('CommandOrControl+Space', () => {
    if (win) {
      if (win.isMinimized()) {
        // Restore the window if it's minimized
        win.restore();
      }
      // Bring the window to the front
      win.focus();

      win.webContents.executeJavaScript(`
        if(!searchBox){
          const searchBox = document.getElementById('searchBox');
        }        
        searchBox.focus();
      `);
    }
  });


  ipcMain.on('open-in-browser', (event, data) => {
    shell.openExternal(data)
  });


  ipcMain.on('export-aliases', (event, data) => {

    writeFile(`${Date.now()}-aliases.json`, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    })
  })

  ipcMain.on('import-aliases', (event, _data) => {

    readFile(_data, (err, data) => {
      console.log("🚀 ~ file: main.js:75 ~ readFile ~ data:", data)
      win.webContents.send('import-aliases-response', data.toString());
    })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.