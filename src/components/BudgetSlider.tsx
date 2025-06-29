import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({ value, onChange }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSliderColor = (value: number) => {
    if (value < 15000) return 'from-green-400 to-green-600';
    if (value < 25000) return 'from-blue-400 to-blue-600';
    if (value < 35000) return 'from-purple-400 to-purple-600';
    if (value < 50000) return 'from-pink-400 to-pink-600';
    return 'from-yellow-400 to-yellow-600';
  };

  const getBudgetLabel = (value: number) => {
    if (value < 15000) return '🚀 Starter Package';
    if (value < 25000) return '💼 Business Package';
    if (value < 35000) return '⭐ Professional Package';
    if (value < 50000) return '🛒 E-commerce Package';
    return '👑 Premium Package';
  };

  return (
    <motion.div
      className="space-y-4"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center">
        <Label className="text-sm text-gray-400">💰 Project Budget</Label>
        <motion.div
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-lg font-bold text-white"
        >
          {formatCurrency(value)}
        </motion.div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="8500"
          max="100000"
          step="1000"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, transparent 0%, transparent ${((value - 8500) / (100000 - 8500)) * 100}%, rgba(255,255,255,0.1) ${((value - 8500) / (100000 - 8500)) * 100}%, rgba(255,255,255,0.1) 100%)`
          }}
        />
        
        <motion.div
          className={`absolute top-0 left-0 h-3 rounded-lg bg-gradient-to-r ${getSliderColor(value)}`}
          style={{ width: `${((value - 8500) / (100000 - 8500)) * 100}%` }}
          layoutId="slider-fill"
        />
        
        <motion.div
          className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${getSliderColor(value)} shadow-lg border-2 border-white`}
          style={{ left: `calc(${((value - 8500) / (100000 - 8500)) * 100}% - 12px)` }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
      
      <motion.p
        key={getBudgetLabel(value)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-center text-gray-300"
      >
        {getBudgetLabel(value)}
      </motion.p>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>₹8,500</span>
        <span>₹100,000+</span>
      </div>
    </motion.div>
  );
};

export default BudgetSlider;
