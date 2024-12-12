// src/components/Editor/Editor.tsx
import React, { useRef } from 'react';
import Editor, { EditorProps, OnChange } from '@monaco-editor/react';

interface AstrionEditorProps {
  value: string;
  language: string;
  onChange?: OnChange;
  theme?: 'vs-dark' | 'light';
  path?: string; // Add this line
}

export const AstrionEditor: React.FC<AstrionEditorProps> = ({
  value,
  language,
  onChange,
  theme = 'vs-dark',
  path, // Add this here
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    // Basic editor configurations
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true
    });
  };

  return (
    <div className="h-full w-full">
      <Editor
        path={path} // And here
        height="100%"
        defaultLanguage={language}
        defaultValue={value}
        theme={theme}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly: false,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          minimap: { enabled: true }
        }}
      />
    </div>
  );
};