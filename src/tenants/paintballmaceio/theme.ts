export const pbmTheme = {
  brandKey: 'paintballmaceio',
  colors: {
    bg: '#090C07',
    surface: '#111510',
    card: '#161C13',
    text: '#E8EDE4',
    muted: '#7A8A73',
    accent: '#E84C0A',
    accentDark: '#B83A08',
    green: '#2D4A1E',
    greenLight: '#3D6228',
    line: 'rgba(232,237,228,0.08)',
    overlay: 'rgba(9,12,7,0.72)',
  },
  typography: {
    heading: "'Barlow Condensed', 'Arial Narrow', Impact, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
  },
  layout: {
    maxWidth: '1200px',
    sectionGap: '96px',
  },
};

export type PbmTheme = typeof pbmTheme;
