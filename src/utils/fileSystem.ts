// src/utils/fileSystem.ts
import { invoke } from '@tauri-apps/api/core';

export interface FileEntry {
  name: string;
  path: string;
  is_file: boolean;
  is_directory: boolean;
}

export const fileSystem = {
  async readFile(path: string): Promise<string> {
    return await invoke('read_file', { path });
  },
  
  async writeFile(path: string, content: string): Promise<void> {
    await invoke('write_file', { path, content });
  },
  
  async listDirectory(directory: string): Promise<FileEntry[]> {
    return await invoke('list_directory', { directory });
  }
};