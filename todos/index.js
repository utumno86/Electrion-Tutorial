const electron = require('electron')

const { app, BrowserWindow, Menu } = electron

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true, contextIsolation: false } })
    mainWindow.loadURL(`file://${__dirname}/main.html`)
    mainWindow.on('closed', () => app.quit())

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo'
    })
    addWindow.loadURL(`file://${__dirname}/add.html`)
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                click() {
                    createAddWindow()
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    }
]

if (process.platform == 'darwin') {
    menuTemplate.unshift({ label: 'Electron' })
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'DEBUG!!!',
        submenu: [
            {
                label: 'Open Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            }
        ]
    })
}