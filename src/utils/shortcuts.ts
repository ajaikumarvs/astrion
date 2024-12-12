import { platform } from '@tauri-apps/api/os';

export async function getShortcuts() {
  const plat = await platform();
  const isMac = plat === 'darwin';
  
  return {
    save: isMac ? '⌘+S' : 'Ctrl+S',
    open: isMac ? '⌘+O' : 'Ctrl+O',
    new: isMac ? '⌘+N' : 'Ctrl+N',
    // Add more shortcuts as needed
  };
}