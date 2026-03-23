export const exostifCoiffureTheme = {
  brandKey: 'exostif-coiffure',
  colors: {
    background: '#0F0B09', // near black, warm
    surface: '#1C1410',
    text: '#EDE7E1', // warm off-white
    muted: '#9B8A7E',
    accent: '#C8957A', // warm terracotta — vivid on dark bg
    line: 'rgba(237,231,225,0.10)',
    dark: '#070504',
  },
  typography: {
    heading: "'Cormorant Garamond', serif",
    body: "'DM Sans', 'DM Sans Variable', system-ui, -apple-system, sans-serif",
  },
  layout: {
    maxWidth: '1100px',
    sectionGap: '110px',
  },
};

export type ExostifCoiffureTheme = typeof exostifCoiffureTheme;
