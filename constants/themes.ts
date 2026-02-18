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

    chart: ["#7C8CFF", "#5EEAD4", "#F472B6", "#FBBF24", "#60A5FA"]
  },

  DUSTY_ORCHID: {
    background: "#F5F2F7",
    foreground: "#2C2433",

    card: "#FFFFFF",
    cardForeground: "#2C2433",

    popover: "#FFFFFF",
    popoverForeground: "#2C2433",

    primary: "#9D7BB0",
    primaryRgb: "157, 123, 176",
    primaryForeground: "#FFFFFF",

    secondary: "#E6DAEE",
    secondaryForeground: "#2C2433",

    muted: "#EFE8F3",
    mutedForeground: "#6B5E75",

    accent: "#C4A1D8",
    accentForeground: "#2C2433",

    destructive: "#E2556E",

    border: "#E1D4EA",
    input: "#E1D4EA",
    ring: "#9D7BB0",

    radius: "0.75rem",

    chart: ["#9D7BB0", "#C084FC", "#F472B6", "#FBBF24", "#60A5FA"]
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

    chart: ["#FACC15", "#22D3EE", "#A3E635", "#FB7185", "#60A5FA"]
  },

  MOSS_PARCHMENT: {
    background: "#FAF8F2",
    foreground: "#2F2F1F",

    card: "#FFFFFF",
    cardForeground: "#2F2F1F",

    popover: "#FFFFFF",
    popoverForeground: "#2F2F1F",

    primary: "#6B8E23",
    primaryRgb: "107, 142, 35",
    primaryForeground: "#FFFFFF",

    secondary: "#E6E3D3",
    secondaryForeground: "#2F2F1F",

    muted: "#EFECDC",
    mutedForeground: "#6B6B4F",

    accent: "#A3B18A",
    accentForeground: "#2F2F1F",

    destructive: "#C2410C",

    border: "#DDD8C4",
    input: "#DDD8C4",
    ring: "#6B8E23",

    radius: "0.75rem",

    chart: ["#6B8E23", "#A3B18A", "#EAB308", "#FB923C", "#60A5FA"]
  },

  POLAR_MINT: {
    background: "#F8FAFC",
    foreground: "#0F172A",

    card: "#FFFFFF",
    cardForeground: "#0F172A",

    popover: "#FFFFFF",
    popoverForeground: "#0F172A",

    primary: "#2DD4BF",
    primaryRgb: "45, 212, 191",
    primaryForeground: "#0F172A",

    secondary: "#E0F2F1",
    secondaryForeground: "#0F172A",

    muted: "#F1F5F9",
    mutedForeground: "#64748B",

    accent: "#67E8F9",
    accentForeground: "#0F172A",

    destructive: "#EF4444",

    border: "#E2E8F0",
    input: "#E2E8F0",
    ring: "#2DD4BF",

    radius: "0.75rem",

    chart: ["#2DD4BF", "#67E8F9", "#A5F3FC", "#60A5FA", "#818CF8"]
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

    chart: ["#EC4899", "#8B5CF6", "#22D3EE", "#FACC15", "#4ADE80"]
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

    chart: ["#00E5FF", "#A855F7", "#F43F5E", "#FACC15", "#22C55E"]
  }
} as const;

export const THEME_NAME_LIST = [
  "AURORA_INK",
  "DUSTY_ORCHID",
  "CITRUS_SLATE",
  "MOSS_PARCHMENT",
  "POLAR_MINT",
  "OBSIDIAN_BLOOM",
  "NEON_NOIR"
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
