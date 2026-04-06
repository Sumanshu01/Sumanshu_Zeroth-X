'use client';
import { Bookmark, Clock, GitBranch, Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

interface IssueCardProps {
  issue: {
    issueId: number;
    title: string;
    url: string;
    repoName: string;
    repoOwner: string;
    labels: string[];
    language?: string;
    stars?: number;
    relevanceScore?: number;
    createdAt?: string;
    savedAt?: string;
    [key: string]: unknown;
  };
  onBookmarkToggle?: (issueId: number) => void;
  isBookmarked?: boolean;
}

const getLanguageColor = (lang?: string) => {
  const l = lang?.toLowerCase() || '';
  if (l.includes('java')) return '#f1e05a'; // js/java
  if (l.includes('type')) return '#3178c6'; // ts
  if (l.includes('python')) return '#3572A5';
  if (l.includes('go')) return '#00ADD8';
  if (l.includes('rust')) return '#dea584';
  if (l.includes('ruby')) return '#701516';
  return '#1e1b4b'; // default purple-ish
};

const getLabelColorClass = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('bug')) return 'bg-red-500/10 text-red-400 border-red-500/20';
  if (l.includes('doc')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  if (l.includes('good first issue')) return 'bg-success/10 text-success border-success/20';
  if (l.includes('enhancement') || l.includes('feature')) return 'bg-accent-purple/10 text-accent-purple border-accent-purple/20';
  return 'bg-darkbase text-secondaryText border-border';
};

export default function IssueCard({ issue, onBookmarkToggle, isBookmarked = false }: IssueCardProps) {
  const score = issue.relevanceScore || 0;
  const langColor = getLanguageColor(issue.language);
  
  return (
    <div className="glass-card rounded-[1.25rem] p-6 hover:border-primary/30 transition-all group flex flex-col justify-between h-full relative overflow-hidden bg-darkcard/80">
      <div className="absolute left-0 top-0 bottom-0 w-1 opacity-80" style={{ backgroundColor: langColor }} />
      
      <div>
        <div className="flex justify-between items-start gap-4 mb-4">
          <a href={issue.url} target="_blank" rel="noreferrer" className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2 inline-flex items-start gap-2">
            {issue.title}
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0 text-secondaryText" />
          </a>
          {score > 0 && (
            <div className="relative group/score">
              <div className="absolute -inset-1 bg-gradient-to-r from-success to-primary rounded-full blur opacity-30 group-hover/score:opacity-100 transition-opacity"></div>
              <div className="relative px-3 py-1 bg-darkbase border border-border rounded-full flex items-center justify-center font-mono text-sm font-bold shadow-inner">
                <span className={score >= 80 ? 'text-success' : score >= 50 ? 'text-primary' : 'text-secondaryText'}>{score}</span>
                <span className="text-secondaryText/50 text-xs ml-1">/100</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 text-sm text-secondaryText mb-5 font-mono bg-darkbase/50 p-2 rounded-lg border border-border/50">
          <div className="flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-accent-purple" />
            <span className="font-semibold text-foreground/80">{issue.repoOwner}/{issue.repoName}</span>
          </div>
          <span className="opacity-50">|</span>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
            <span className="text-foreground/80 font-semibold">{issue.stars || 0}</span>
          </div>
          {issue.language && (
            <>
              <span className="opacity-50">|</span>
              <span className="flex items-center gap-1.5 font-sans font-medium text-xs uppercase tracking-wider text-foreground/70">
                <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: langColor, color: langColor }} />
                {issue.language}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {issue.labels?.slice(0, 4).map((label: string) => (
            <span key={label} className={cn("px-2.5 py-1 border rounded-md text-xs font-semibold tracking-wide", getLabelColorClass(label))}>
              {label}
            </span>
          ))}
          {issue.labels && issue.labels.length > 4 && (
             <span className="px-2.5 py-1 border border-border/50 bg-darkbase rounded-md text-xs font-mono text-secondaryText">+{issue.labels.length - 4}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-border mt-auto">
        <div className="flex items-center gap-2 text-xs text-secondaryText font-mono">
          <Clock className="w-4 h-4" />
          <span>{new Date(issue.createdAt || issue.savedAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onBookmarkToggle?.(issue.issueId)}
          className={cn("transition-colors p-2.5 rounded-full relative overflow-hidden group/btn", isBookmarked ? "bg-primary/10 text-primary" : "bg-darkbase border border-border text-secondaryText hover:text-foreground")}
          title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
        >
          {isBookmarked && <div className="absolute inset-0 bg-primary/20 blur-md pointer-events-none" />}
          <Bookmark className={cn("w-5 h-5 relative z-10 transition-colors", isBookmarked && "fill-primary")} />
        </motion.button>
      </div>
    </div>
  );
}
