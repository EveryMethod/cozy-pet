import { app, BrowserWindow, Menu, screen } from 'electron';
import path from 'node:path';
import fs from 'node:fs';

let win: BrowserWindow | null = null;
const position = { x: 80, y: 80 };

function createWindow() {
  const file = path.join(app.getPath('userData'), 'position.json');
  try { Object.assign(position, JSON.parse(fs.readFileSync(file, 'utf8'))); } catch { /* first run */ }
  const saved = position;
  win = new BrowserWindow({ width: 128, height: 128, x: saved.x, y: saved.y, frame: false, transparent: true, alwaysOnTop: true, resizable: false, hasShadow: false, webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false } });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.setIgnoreMouseEvents(false);
  const menu = Menu.buildFromTemplate([
    { label: '暂停移动', click: () => win?.webContents.send('toggle-pause') },
    { label: '切换置顶', click: () => win?.setAlwaysOnTop(!win.isAlwaysOnTop()) },
    { type: 'separator' }, { label: '退出', click: () => app.quit() }
  ]);
  win.webContents.on('context-menu', () => menu.popup({ window: win! }));
  win.on('moved', () => { if (win) { const p = win.getPosition(); position.x = p[0]; position.y = p[1]; fs.writeFileSync(file, JSON.stringify(position)); } });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
