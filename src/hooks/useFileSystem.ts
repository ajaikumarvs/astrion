// src/hooks/useFileSystem.ts
import { useState, useCallback } from 'react';
import { fileSystem, FileEntry } from '../utils/fileSystem';
import { getLanguageFromExt } from '../utils/languages';

export function useFileSystem() {
  const [currentDir, setCurrentDir] = useState<string>('');
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadDirectory = useCallback(async (path: string) => {
    try {
      const files = await fileSystem.listDirectory(path);
      setEntries(files);
      setCurrentDir(path);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  const readFile = useCallback(async (path: string) => {
    try {
      const content = await fileSystem.readFile(path);
      const ext = path.split('.').pop()?.toLowerCase() || '';
      return {
        content,
        language: getLanguageFromExt(ext)
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    }
  }, []);

  const saveFile = useCallback(async (path: string, content: string) => {
    try {
      await fileSystem.writeFile(path, content);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    }
  }, []);

  return {
    currentDir,
    entries,
    error,
    loadDirectory,
    readFile,
    saveFile
  };
}
