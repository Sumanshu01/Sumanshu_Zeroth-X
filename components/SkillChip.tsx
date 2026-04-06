'use client';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  color?: 'primary' | 'success' | 'purple';
}

const colorMap = {
  primary: { dot: 'bg-primary', border: 'border-primary', bg: 'bg-primary/20', text: 'text-primary' },
  success: { dot: 'bg-success', border: 'border-success', bg: 'bg-success/20', text: 'text-success' },
  purple: { dot: 'bg-accent-purple', border: 'border-accent-purple', bg: 'bg-accent-purple/20', text: 'text-accent-purple' },
};

export default function SkillChip({ label, selected, onClick, color = 'primary' }: SkillChipProps) {
  const styles = colorMap[color];

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type="button"
      className={cn(
        "relative flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors shadow-sm overflow-hidden group",
        selected 
          ? `bg-darkcard border-border ${styles.text}`
          : "bg-darkcard text-secondaryText border-border hover:border-border/80"
      )}
    >
      {selected && (
         <div className={cn("absolute inset-0 opacity-20 pointer-events-none", styles.bg)} />
      )}
      
      {selected ? (
        <Check className="w-4 h-4 relative z-10" />
      ) : (
        <span className={cn("w-2 h-2 rounded-full relative z-10 transition-transform group-hover:scale-150", styles.dot)} />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
