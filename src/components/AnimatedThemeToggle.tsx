
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const AnimatedThemeToggle: React.FC<AnimatedThemeToggleProps> = ({ 
  isDarkMode, 
  onToggle 
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="relative overflow-hidden hover:bg-white/10 w-12 h-12 rounded-full"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDarkMode 
            ? 'rgba(59, 130, 246, 0.1)' 
            : 'rgba(251, 191, 36, 0.1)'
        }}
        transition={{ duration: 0.3 }}
      />
      
      <AnimatePresence mode="wait">
        {isDarkMode ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="h-5 w-5 text-blue-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="h-5 w-5 text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default AnimatedThemeToggle;
