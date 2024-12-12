// src/components/FileExplorer/FileExplorer.tsx
import React from 'react';
import { Folder, File } from 'lucide-react';
import { useFileSystem } from '../../hooks/useFileSystem';

interface FileExplorerProps {
  onFileSelect: (path: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ onFileSelect }) => {
  const { currentDir, entries, loadDirectory } = useFileSystem();

  return (
    <div className="w-60 bg-gray-900 border-r border-gray-700 overflow-y-auto">
      <div className="p-2">
        {entries.map((entry) => (
          <div
            key={entry.path}
            className="flex items-center px-2 py-1 hover:bg-gray-800 rounded cursor-pointer"
            onClick={() => entry.is_file ? onFileSelect(entry.path) : loadDirectory(entry.path)}
          >
            {entry.is_directory ? (
              <Folder size={16} className="mr-2 text-blue-400" />
            ) : (
              <File size={16} className="mr-2 text-gray-400" />
            )}
            <span className="text-sm truncate">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};