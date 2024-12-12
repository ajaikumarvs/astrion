// src/utils/languages.ts
export function getLanguageFromExt(ext: string): string {
    const languageMap: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      jsx: 'javascript',
      tsx: 'typescript',
      py: 'python',
      rs: 'rust',
      go: 'go',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
      yml: 'yaml',
      yaml: 'yaml',
      toml: 'toml',
      sh: 'shell',
      bash: 'shell',
      sql: 'sql',
      // Add more as needed
    };
  
    return languageMap[ext] || 'plaintext';
  }
  