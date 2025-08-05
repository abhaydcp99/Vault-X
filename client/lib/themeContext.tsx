import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage for saved theme, default to light
    const savedTheme = localStorage.getItem('vaultx-theme') as Theme;
    return savedTheme || 'light';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('vaultx-theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Apply theme to document on initial load
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme-aware component utilities
export const getThemeClasses = (theme: Theme) => ({
  // Background gradients - Bold and impressive dark mode
  pageBackground: theme === 'dark'
    ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950'
    : 'bg-gradient-to-br from-blue-50 via-white to-green-50',

  heroBackground: theme === 'dark'
    ? 'bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-green-50',

  cardBackground: theme === 'dark'
    ? 'bg-slate-900/80 backdrop-blur-lg border-slate-700/50 shadow-2xl shadow-blue-500/10'
    : 'bg-white/90 backdrop-blur-sm border-gray-200',

  // Special feature section background
  featureBackground: theme === 'dark'
    ? 'bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-lg border-slate-700/30'
    : 'bg-white/50 backdrop-blur-sm',

  // Trust/Footer section background
  trustBackground: theme === 'dark'
    ? 'bg-gradient-to-r from-slate-900/90 via-indigo-900/90 to-violet-900/90 backdrop-blur-lg'
    : 'bg-white/10 backdrop-blur-sm',

  footerBackground: theme === 'dark'
    ? 'bg-gradient-to-r from-slate-950 via-blue-950 to-purple-950 border-t border-slate-700/50'
    : 'bg-black/20 backdrop-blur-sm',

  // Header/Navigation
  headerBackground: theme === 'dark'
    ? 'bg-slate-950/80 backdrop-blur-xl border-slate-700/50'
    : 'bg-white/80 backdrop-blur-sm border-gray-200',

  // Text colors
  primaryText: theme === 'dark' ? 'text-white' : 'text-gray-900',
  secondaryText: theme === 'dark' ? 'text-slate-300' : 'text-gray-600',
  mutedText: theme === 'dark' ? 'text-slate-400' : 'text-gray-500',

  // Accent colors - Enhanced for dark mode
  accentGradient: theme === 'dark'
    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600'
    : 'bg-gradient-to-r from-blue-600 to-green-600',

  // Special gradient for dark mode highlights
  highlightGradient: theme === 'dark'
    ? 'bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600'
    : 'bg-gradient-to-r from-blue-600 to-green-600',

  // Buttons
  primaryButton: theme === 'dark'
    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/25'
    : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700',

  secondaryButton: theme === 'dark'
    ? 'border-slate-600 text-slate-200 hover:bg-slate-800/50 hover:border-slate-500'
    : 'border-gray-300 text-gray-700 hover:bg-gray-50',

  // Feature cards for dark mode
  featureCard: theme === 'dark'
    ? 'bg-slate-800/60 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/80 hover:border-cyan-500/30 transition-all duration-500 shadow-xl shadow-slate-900/50'
    : 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all',

  // Team member cards for dark mode
  teamCard: theme === 'dark'
    ? 'bg-slate-800/80 backdrop-blur-xl border-slate-700/50 hover:border-cyan-500/30 shadow-2xl shadow-slate-900/50'
    : 'bg-white/90 backdrop-blur-sm',

  // Stats and achievement colors
  statsGradient: theme === 'dark'
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400'
    : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400',

  // Floating elements colors - Enhanced for dark mode
  floatingElements: theme === 'dark' ? [
    'bg-cyan-500/20',
    'bg-blue-500/20',
    'bg-purple-500/20',
    'bg-indigo-500/20'
  ] : [
    'bg-blue-200/30',
    'bg-green-200/30',
    'bg-purple-200/30',
    'bg-pink-200/30'
  ]
});
