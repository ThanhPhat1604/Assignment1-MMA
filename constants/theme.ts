export type Theme = {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  card: string;
  cardSecondary: string;
  primary: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  border: string;
  placeholder: string;
  success: string;
  warning: string;
  error: string;
  shadow: string;
  gradient: {
    primary: string[];
    secondary: string[];
    background: string[];
  };
};

export const lightTheme: Theme = {
  background: "#FFFFFF",
  backgroundSecondary: "#F8FAFC",
  text: "#1E293B",
  textSecondary: "#64748B",
  card: "#FFFFFF",
  cardSecondary: "#F1F5F9",
  primary: "#6366F1",
  primaryLight: "#A5B4FC",
  secondary: "#EC4899",
  accent: "#10B981",
  border: "#E2E8F0",
  placeholder: "#94A3B8",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  shadow: "rgba(0, 0, 0, 0.1)",
  gradient: {
    primary: ["#6366F1", "#8B5CF6", "#A855F7"],
    secondary: ["#EC4899", "#F43F5E", "#EF4444"],
    background: ["#FFFFFF", "#F8FAFC", "#F1F5F9"],
  },
};

export const darkTheme: Theme = {
  background: "#0F172A",
  backgroundSecondary: "#1E293B",
  text: "#F8FAFC",
  textSecondary: "#CBD5E1",
  card: "#1E293B",
  cardSecondary: "#334155",
  primary: "#818CF8",
  primaryLight: "#A5B4FC",
  secondary: "#F472B6",
  accent: "#34D399",
  border: "#334155",
  placeholder: "#64748B",
  success: "#34D399",
  warning: "#FBBF24",
  error: "#F87171",
  shadow: "rgba(0, 0, 0, 0.3)",
  gradient: {
    primary: ["#818CF8", "#A78BFA", "#C084FC"],
    secondary: ["#F472B6", "#FB7185", "#FCA5A5"],
    background: ["#0F172A", "#1E293B", "#334155"],
  },
};
