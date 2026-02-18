export const THEMES = {
  AURORA_INK: {
    background: "#0B1020",
    foreground: "#E6E9F2",

    card: "#12172A",
    cardForeground: "#E6E9F2",

    popover: "#141A33",
    popoverForeground: "#E6E9F2",

    primary: "#7C8CFF",
    primaryRgb: "124, 140, 255",
    primaryForeground: "#0B1020",

    secondary: "#2A315A",
    secondaryForeground: "#E6E9F2",

    muted: "#1C2342",
    mutedForeground: "#9AA3C7",

    accent: "#A5B4FF",
    accentForeground: "#0B1020",

    destructive: "#FF5C7A",

    border: "#2A315A",
    input: "#2A315A",
    ring: "#7C8CFF",

    radius: "0.75rem",

    chart: ["#7C8CFF", "#5EEAD4", "#F472B6", "#FBBF24", "#60A5FA"],
  },

  DUSTY_ORCHID: {
    background: "#F6F3F8",
    foreground: "#2B2230",

    card: "#FFFFFF",
    cardForeground: "#2B2230",

    popover: "#FFFFFF",
    popoverForeground: "#2B2230",

    primary: "#9A74B5",
    primaryRgb: "154, 116, 181",
    primaryForeground: "#FFFFFF",

    secondary: "#EEE6F3",
    secondaryForeground: "#2B2230",

    muted: "#F3EDF6",
    mutedForeground: "#6F617A",

    accent: "#C6A4DB",
    accentForeground: "#2B2230",

    destructive: "#E2556E",

    border: "#E7DFF0",
    input: "#E7DFF0",
    ring: "#9A74B5",

    radius: "0.75rem",

    chart: ["#9A74B5", "#C084FC", "#F9A8D4", "#FDE68A", "#93C5FD"],
  },

  CITRUS_SLATE: {
    background: "#0F172A",
    foreground: "#E5E7EB",

    card: "#111827",
    cardForeground: "#E5E7EB",

    popover: "#111827",
    popoverForeground: "#E5E7EB",

    primary: "#FACC15",
    primaryRgb: "250, 204, 21",
    primaryForeground: "#0F172A",

    secondary: "#1F2933",
    secondaryForeground: "#E5E7EB",

    muted: "#1E293B",
    mutedForeground: "#9CA3AF",

    accent: "#22D3EE",
    accentForeground: "#0F172A",

    destructive: "#F43F5E",

    border: "#1F2933",
    input: "#1F2933",
    ring: "#FACC15",

    radius: "0.75rem",

    chart: ["#FACC15", "#22D3EE", "#A3E635", "#FB7185", "#60A5FA"],
  },

  MOSS_PARCHMENT: {
    background: "#FBF9F4",
    foreground: "#2E2E1E",

    card: "#FFFFFF",
    cardForeground: "#2E2E1E",

    popover: "#FFFFFF",
    popoverForeground: "#2E2E1E",

    primary: "#6A8F2A",
    primaryRgb: "106, 143, 42",
    primaryForeground: "#FFFFFF",

    secondary: "#ECE8D8",
    secondaryForeground: "#2E2E1E",

    muted: "#F2EFDF",
    mutedForeground: "#6A6A4A",

    accent: "#A8BC8A",
    accentForeground: "#2E2E1E",

    destructive: "#C2410C",

    border: "#E2DDC8",
    input: "#E2DDC8",
    ring: "#6A8F2A",

    radius: "0.75rem",

    chart: ["#6A8F2A", "#A8BC8A", "#EAB308", "#FB923C", "#93C5FD"],
  },

  POLAR_MINT: {
    background: "#F9FBFC",
    foreground: "#0F172A",

    card: "#FFFFFF",
    cardForeground: "#0F172A",

    popover: "#FFFFFF",
    popoverForeground: "#0F172A",

    primary: "#2EC4B6",
    primaryRgb: "46, 196, 182",
    primaryForeground: "#0F172A",

    secondary: "#E6F4F2",
    secondaryForeground: "#0F172A",

    muted: "#F1F7F8",
    mutedForeground: "#64748B",

    accent: "#7DD3FC",
    accentForeground: "#0F172A",

    destructive: "#EF4444",

    border: "#E3EEF0",
    input: "#E3EEF0",
    ring: "#2EC4B6",

    radius: "0.75rem",

    chart: ["#2EC4B6", "#7DD3FC", "#A5F3FC", "#60A5FA", "#818CF8"],
  },

  OBSIDIAN_BLOOM: {
    background: "#09090B",
    foreground: "#FAFAFA",

    card: "#111113",
    cardForeground: "#FAFAFA",

    popover: "#111113",
    popoverForeground: "#FAFAFA",

    primary: "#EC4899",
    primaryRgb: "236, 72, 153",
    primaryForeground: "#09090B",

    secondary: "#1C1C1F",
    secondaryForeground: "#FAFAFA",

    muted: "#18181B",
    mutedForeground: "#A1A1AA",

    accent: "#F472B6",
    accentForeground: "#09090B",

    destructive: "#DC2626",

    border: "#27272A",
    input: "#27272A",
    ring: "#EC4899",

    radius: "0.75rem",

    chart: ["#EC4899", "#8B5CF6", "#22D3EE", "#FACC15", "#4ADE80"],
  },

  NEON_NOIR: {
    background: "#050507",
    foreground: "#EDEDED",

    card: "#0D0D12",
    cardForeground: "#EDEDED",

    popover: "#0D0D12",
    popoverForeground: "#EDEDED",

    primary: "#00E5FF",
    primaryRgb: "0, 229, 255",
    primaryForeground: "#050507",

    secondary: "#1A1A22",
    secondaryForeground: "#EDEDED",

    muted: "#15151C",
    mutedForeground: "#9CA3AF",

    accent: "#A855F7",
    accentForeground: "#050507",

    destructive: "#FB7185",

    border: "#1F1F2B",
    input: "#1F1F2B",
    ring: "#00E5FF",

    radius: "0.75rem",

    chart: ["#00E5FF", "#A855F7", "#F43F5E", "#FACC15", "#22C55E"],
  },
} as const;

export const THEME_NAME_LIST = [
  "AURORA_INK",
  "DUSTY_ORCHID",
  "CITRUS_SLATE",
  "MOSS_PARCHMENT",
  "POLAR_MINT",
  "OBSIDIAN_BLOOM",
  "NEON_NOIR",
] as const;

export type ThemeKey = keyof typeof THEMES;
export type Theme = (typeof THEMES)[ThemeKey];

export function themeToCssVars(theme: any) {
  return `
  :root {
    --background: ${theme.background};
    --foreground: ${theme.foreground};

    --card: ${theme.card};
    --card-foreground: ${theme.cardForeground};

    --popover: ${theme.popover};
    --popover-foreground: ${theme.popoverForeground};

    --primary: ${theme.primary};
    --primary-foreground: ${theme.primaryForeground};

    --secondary: ${theme.secondary};
    --secondary-foreground: ${theme.secondaryForeground};

    --muted: ${theme.muted};
    --muted-foreground: ${theme.mutedForeground};

    --accent: ${theme.accent};
    --accent-foreground: ${theme.accentForeground};

    --destructive: ${theme.destructive};

    --border: ${theme.border};
    --input: ${theme.input};
    --ring: ${theme.ring};
    --radius: ${theme.radius};

    /* Chart colors */
    --chart-1: ${theme.chart?.[0]};
    --chart-2: ${theme.chart?.[1]};
    --chart-3: ${theme.chart?.[2]};
    --chart-4: ${theme.chart?.[3]};
    --chart-5: ${theme.chart?.[4]};
  }

  ::-webkit-scrollbar{
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 40px;
    -webkit-border-radius: 40px;
    -moz-border-radius: 40px;
    -ms-border-radius: 40px;
    -o-border-radius: 40px;
  }
  `;
}
