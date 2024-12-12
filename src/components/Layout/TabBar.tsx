// src/components/Layout/TabBar.tsx
import React from 'react';
import { X } from 'lucide-react';

interface Tab {
  id: string;
  title: string;
  path: string;
  isActive: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, onTabClick, onTabClose }) => {
  return (
    <div className="flex flex-col bg-gray-900 w-48 border-r border-gray-700">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`
            flex items-center justify-between px-3 py-2 cursor-pointer
            ${tab.isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}
          `}
          onClick={() => onTabClick(tab.id)}
        >
          <span className="truncate text-sm">{tab.title}</span>
          <button
            className="p-1 rounded hover:bg-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};