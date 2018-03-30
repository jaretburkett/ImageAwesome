const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const ipc = require('electron').ipcMain;
const parseArgs = require('electron-args');
const cli = parseArgs(`
    sample-viewer
 
    Usage
      $ sample-viewer [path]
 
    Options
      --help     show help
      --version  show version
      --auto     slide show [Default: false]
 
    Examples
      $ sample-viewer . --auto
      $ sample-viewer ~/Pictures/
`, {
    alias: {
        h: 'help',
        f: 'file'
    },
    default: {
        file: null
    }
});

console.log('flags',cli.flags);
console.log('cli.input[0]',cli.input[0]);

const filePath = cli.flags.file;



let isDev = false;
if (process.argv.indexOf('--dev') > -1) {
    isDev = true;
}
console.log(`User data path "${app.getPath('userData')}"`);

if (isDev) {
    console.log('** DEV MODE **');
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const iconPath = path.join(__dirname, 'dist/icon.png');

require('electron-context-menu')({});

function createWindow() {
    const baseWidth = 600;
    const size = {
        width: isDev ? baseWidth + 400 : baseWidth,
        height: 480
    };

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        icon: iconPath,
        backgroundColor: '#fbf9f4',
        show: false,
        frame: false
        // titleBarStyle:'hidden'
    });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.webContents.on('did-finish-load', function () {
        mainWindow.show();
    });

    // set apple icon
    if (process.platform === 'darwin') {
        app.dock.setIcon(iconPath);
    }
    mainWindow.setMenu(null);

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
function init() {
    createWindow();

    ipc.on('init', () => {
        mainWindow.webContents.send('store', {
            filePath:filePath
        });
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', init);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    app.quit();
    // }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});