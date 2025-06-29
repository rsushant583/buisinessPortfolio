
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Card className={`
        bg-white/5 
        backdrop-blur-xl 
        border-white/10 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        hover:bg-white/10 
        hover:border-white/20
        hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.5)]
        transition-all 
        duration-500
        relative
        overflow-hidden
        ${className}
      `}>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardContent className="relative z-10">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GlassmorphismCard;
