export const precisionSystemsTheme = {
  brandKey: 'precisionsystems',
  colors: {
    background: '#f4f0e8',
    surface: 'rgba(255, 255, 255, 0.72)',
    panel: 'rgba(255, 255, 255, 0.9)',
    text: '#111827',
    muted: '#5c6472',
    accent: '#8b7355',
    line: 'rgba(17, 24, 39, 0.12)',
    dark: '#16181d',
    haze: 'rgba(139, 115, 85, 0.14)',
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

export type PrecisionSystemsTheme = typeof precisionSystemsTheme;
