export const iopartnerTheme = {
  brandKey: 'iopartner',
  colors: {
    background: '#eef3fb',
    surface: 'rgba(255, 255, 255, 0.74)',
    panel: 'rgba(255, 255, 255, 0.92)',
    text: '#0f172a',
    muted: '#475569',
    accent: '#2563eb',
    line: 'rgba(15, 23, 42, 0.1)',
    dark: '#0f172a',
    haze: 'rgba(37, 99, 235, 0.14)',
  },
  typography: {
    heading: "'Sora', 'Avenir Next', 'Segoe UI', sans-serif",
    body: "'Manrope', 'Segoe UI', sans-serif",
  },
  layout: {
    maxWidth: '1180px',
    sectionGap: '104px',
  },
} as const;

export type IoPartnerTheme = typeof iopartnerTheme;
