'use client';
import IssueCard from '@/components/IssueCard';
import FilterBar from '@/components/FilterBar';
import SkeletonCard from '@/components/SkeletonCard';
import EmptyState from '@/components/EmptyState';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Issue {
  issueId: number;
  title: string;
  url: string;
  repoName: string;
  repoOwner: string;
  labels: string[];
  language?: string;
  stars?: number;
  relevanceScore: number;
  createdAt: string;
  [key: string]: unknown;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
};

export default function FeedClient() {
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  const [languageFilter, setLanguageFilter] = useState('');
  const [starsFilter, setStarsFilter] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    Promise.all([
      fetch('/api/recommend').then(res => {
        if (res.status === 400) {
          router.push('/skills');
          throw new Error('No preferences');
        }
        return res.json();
      }),
      fetch('/api/bookmarks').then(res => res.json())
    ]).then(([recommendData, bookmarksData]) => {
      setIssues(recommendData.error ? [] : recommendData);
      setBookmarks(new Set((bookmarksData || []).map((b: { issueId: number }) => b.issueId)));
      setLoading(false);
    }).catch(console.error);
  }, [router]);

  const handleBookmarkToggle = async (issueId: number) => {
    const isBookmarked = bookmarks.has(issueId);

    setBookmarks(prev => {
      const next = new Set(prev);
      if (isBookmarked) next.delete(issueId);
      else next.add(issueId);
      return next;
    });

    try {
      if (isBookmarked) {
        await fetch(`/api/bookmarks/${issueId}`, { method: 'DELETE' });
      } else {
        const issue = issues.find(i => i.issueId === issueId);
        if (issue) {
          await fetch('/api/bookmarks', {
            method: 'POST',
            body: JSON.stringify({
              issueId,
              title: issue.title,
              url: issue.url,
              repoName: issue.repoName,
              repoOwner: issue.repoOwner,
              labels: issue.labels,
              language: issue.language,
              stars: issue.stars
            })
          });
        }
      }
    } catch {
      setBookmarks(prev => {
        const next = new Set(prev);
        if (!isBookmarked) next.delete(issueId);
        else next.add(issueId);
        return next;
      });
      alert('Failed to update bookmark');
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (languageFilter && issue.language?.toLowerCase() !== languageFilter.toLowerCase()) return false;
    if (starsFilter && (issue.stars || 0) < parseInt(starsFilter)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'stars') return (b.stars || 0) - (a.stars || 0);
    return b.relevanceScore - a.relevanceScore;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-[-20%] w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-extrabold text-foreground mb-8 font-heading tracking-tight">
          Your Recommended <span className="text-primary">Issues</span>
        </h1>
        
        <FilterBar
          onLanguageChange={setLanguageFilter}
          onStarsChange={setStarsFilter}
          onSortChange={setSortBy}
        />
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {[1, 2, 3, 4, 5, 6].map(n => <SkeletonCard key={n} />)}
        </div>
      ) : filteredIssues.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredIssues.map((issue: Issue) => (
            <motion.div key={issue.issueId} variants={itemVariants} layout className="h-full">
              <IssueCard
                issue={issue}
                isBookmarked={bookmarks.has(issue.issueId)}
                onBookmarkToggle={handleBookmarkToggle}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
          <EmptyState
            title="No issues found"
            description="We couldn't find any issues matching your criteria. Try adjusting your filters or broadening your skills."
            ctaText="Update Skills"
            ctaHref="/skills"
          />
        </motion.div>
      )}
    </main>
  );
}
