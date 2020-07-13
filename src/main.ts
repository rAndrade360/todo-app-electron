import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import Window from './Window';
import DataStore from './DataStore';
const todoDataStore = new DataStore({name: 'Todos main'});

function createWindow() {
  // Create the browser window.
  const mainWindow = Window({file: path.join(__dirname, "../index.html")});
  let addTodoWin: BrowserWindow;
  mainWindow.once('show', () => {
    mainWindow.webContents.send('todos', todoDataStore.todos);
  })
  ipcMain.on('add-todo-window', () => {
    if(!addTodoWin){
      addTodoWin = Window({
        file: path.join(__dirname, '../add.html'),
        parent: mainWindow,
        height: 400,
        width: 300
      });
      addTodoWin.on('closed', () => {addTodoWin = null})
    }
  })
  ipcMain.on('add-todo', (event, todo) => {
    const updatedTodos = todoDataStore.addTodo(todo).todos;
    mainWindow.webContents.send('todos', updatedTodos);
  })
  ipcMain.on('delete-todo', (event, todo) => {
    const updatedTodos = todoDataStore.deleteTodo(todo).todos;
    mainWindow.webContents.send('todos', updatedTodos);
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
