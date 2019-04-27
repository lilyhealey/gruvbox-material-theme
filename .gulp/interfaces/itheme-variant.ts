export interface IThemeVariant {
  id: string;
  name: string;
  scheme: {
    background: string;
    base: {
      black: string;
      blue: string;
      brown: string;
      cyan: string;
      green: string;
      orange: string;
      paleblue: string;
      pink: string;
      purple: string;
      red: string;
      violet: string;
      white: string;
      yellow: string;
    };
    caret: string;
    comments: string;
    findHighlight: string;
    focusBorder: string;
    foreground: string;
    guides: string;
    inputBackground: string;
    inputBorder: string;
    inputForeground: string;
    invisibles: string;
    lineHighlight: string;
    lineNumbers: string;
    listHoverForeground: string;
    scrollbars: string;
    scrollbarsHover: string;
    selection: string;
    shadow: string;
    sidebarForeground: string;
    statusbarForeground: string;
  };
  type: string;
}

interface ColourSet {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  teal: string;
  blue: string;
  purple: string;
}

export interface ColourVariant {
  id: string;
  name: string;
  colours: {
    dark: ColourSet;
    medium: ColourSet;
    light: ColourSet;
  };
  black: string[];
  white: string[];
}

export interface ThemeVariant {
  id: string;
  name: string;
  type: string;
  editor: {
    background: string;
    foreground: string;
  };
  ui: {
    background: string;
    foreground: string;
  };
  tokenColors: any[];
}
