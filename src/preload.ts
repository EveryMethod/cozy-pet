import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('pet', { onTogglePause: (fn: () => void) => ipcRenderer.on('toggle-pause', fn) });
