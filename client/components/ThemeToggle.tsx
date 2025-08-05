import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { Button } from '@/components/ui/button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 90,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-4 h-4" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -90,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-4 h-4" />
      </motion.div>
      
      {/* Invisible placeholder to maintain button size */}
      <div className="w-4 h-4 opacity-0">
        <Sun className="w-4 h-4" />
      </div>
    </Button>
  );
};
