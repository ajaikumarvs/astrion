// src/components/Layout/MainLayout.tsx
import React, { useState } from 'react';
import { TabBar } from './TabBar';
import { AstrionEditor } from '../Editor/Editor';
import { FileExplorer } from '../FileExplorer/FileExplorer';
import { Folder, Settings, Files } from 'lucide-react';

interface OpenFile {
  id: string;
  path: string;
  content: string;
  language: string;
}

export const MainLayout: React.FC = () => {
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = openFiles.map(file => ({
    id: file.id,
    title: file.path.split('/').pop() || file.path,
    path: file.path,
    isActive: file.id === activeFileId
  }));

  const activeFile = openFiles.find(f => f.id === activeFileId);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="h-12 bg-gray-800 flex items-center px-4 justify-between border-b border-gray-700">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-4">Astrion</h1>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-700 rounded-md">
              <Files size={18} />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-md">
              <Folder size={18} />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-md">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="flex">
            <TabBar
              tabs={tabs}
              onTabClick={setActiveFileId}
              onTabClose={(id) => {
                setOpenFiles(files => files.filter(f => f.id !== id));
                if (activeFileId === id) {
                  setActiveFileId(openFiles[0]?.id || null);
                }
              }}
            />
            <FileExplorer
              onFileSelect={(path) => {
                // File selection logic here
              }}
            />
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-1">
          {activeFile ? (
            <AstrionEditor
              value={activeFile.content}
              language={activeFile.language}
              onChange={(newContent) => {
                if (newContent !== undefined) {
                  setOpenFiles(files =>
                    files.map(f =>
                      f.id === activeFile.id
                        ? { ...f, content: newContent }
                        : f
                    )
                  );
                }
              }}
              path={activeFile.path}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No file open
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <footer className="h-6 bg-gray-800 flex items-center px-4 text-sm text-gray-400 border-t border-gray-700">
        {activeFile && (
          <>
            <span>{activeFile.language}</span>
            <span className="mx-2">•</span>
            <span>{activeFile.path}</span>
          </>
        )}
      </footer>
    </div>
  );
};