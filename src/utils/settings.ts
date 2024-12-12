interface EditorSettings {
    theme: 'vs-dark' | 'light';
    fontSize: number;
    tabSize: number;
    // Add more settings as needed
  }
  
  export const settings = {
    async load(): Promise<EditorSettings> {
      const stored = localStorage.getItem('astrion-settings');
      return stored ? JSON.parse(stored) : defaultSettings;
    },
    
    async save(settings: EditorSettings): Promise<void> {
      localStorage.setItem('astrion-settings', JSON.stringify(settings));
    }
  };
  
  const defaultSettings: EditorSettings = {
    theme: 'vs-dark',
    fontSize: 14,
    tabSize: 2
  };