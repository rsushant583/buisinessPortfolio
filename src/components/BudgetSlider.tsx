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
    return 'from-red-400 to-red-600';
  };

  const getBudgetLabel = (value: number) => {
    if (value < 15000) return 'Starter';
    if (value < 25000) return 'Business';
    if (value < 35000) return 'Professional';
    if (value < 50000) return 'Premium';
    return 'Enterprise';
  };

  return (
    <div className="space-y-4">
      {/* Budget Display */}
      <div className="flex items-center justify-between">
        <span className="text-white font-bold text-lg sm:text-xl">
          {formatCurrency(value)}
        </span>
        <span className="text-blue-400 font-semibold text-sm sm:text-base">
          {getBudgetLabel(value)}
        </span>
      </div>

      {/* Slider Container */}
      <div className="relative">
        <input
          type="range"
          min="8500"
          max="100000"
          step="1000"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-3 sm:h-4 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, ${getSliderColor(value)}) 0%, ${getSliderColor(value)} ${((value - 8500) / (100000 - 8500)) * 100}%, rgba(255, 255, 255, 0.1) ${((value - 8500) / (100000 - 8500)) * 100}%, rgba(255, 255, 255, 0.1) 100%`
          }}
        />
        
        {/* Custom Slider Thumb */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg cursor-pointer"
          style={{
            left: `${((value - 8500) / (100000 - 8500)) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>

      {/* Budget Range Labels */}
      <div className="flex justify-between text-xs sm:text-sm text-gray-400">
        <span>₹8,500</span>
        <span>₹100,000+</span>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
        {[
          { label: 'Starter', range: '₹8.5K-15K', color: 'bg-green-500/20 text-green-400' },
          { label: 'Business', range: '₹15K-25K', color: 'bg-blue-500/20 text-blue-400' },
          { label: 'Professional', range: '₹25K-35K', color: 'bg-purple-500/20 text-purple-400' },
          { label: 'Premium', range: '₹35K-50K', color: 'bg-pink-500/20 text-pink-400' },
          { label: 'Enterprise', range: '₹50K+', color: 'bg-red-500/20 text-red-400' }
        ].map((category, index) => (
          <motion.div
            key={category.label}
            className={`p-2 rounded-lg text-center ${category.color} border border-current/20`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs font-semibold">{category.label}</div>
            <div className="text-xs opacity-75">{category.range}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSlider;
