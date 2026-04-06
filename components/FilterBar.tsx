'use client';
import { ListFilter } from 'lucide-react';

interface FilterBarProps {
  onLanguageChange: (lang: string) => void;
  onStarsChange: (stars: string) => void;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({ onLanguageChange, onStarsChange, onSortChange }: FilterBarProps) {
  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-6 mb-10 w-full">
      <div className="flex items-center gap-3 text-foreground font-heading text-lg font-bold">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <ListFilter className="w-5 h-5 text-primary" />
        </div>
        Filter Feed
      </div>
      
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto font-mono text-sm">
        <div className="relative group">
          <select 
            onChange={(e) => onLanguageChange(e.target.value)}
            className="appearance-none bg-darkbase border border-border text-foreground rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary/50 cursor-pointer shadow-inner min-w-[140px]"
          >
            <option value="">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-secondaryText">▼</div>
        </div>
        
        <div className="relative group">
          <select 
            onChange={(e) => onStarsChange(e.target.value)}
            className="appearance-none bg-darkbase border border-border text-foreground rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary/50 cursor-pointer shadow-inner"
          >
            <option value="">Any Stars</option>
            <option value="100">100+</option>
            <option value="1000">1k+</option>
            <option value="5000">5k+</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-secondaryText">▼</div>
        </div>
        
        <div className="relative group">
          <select 
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-darkbase border border-border text-foreground rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary/50 cursor-pointer shadow-inner"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="stars">Most Stars</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-secondaryText">▼</div>
        </div>
      </div>
    </div>
  );
}
