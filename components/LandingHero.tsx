'use client';

import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Filter, ArrowRight } from 'lucide-react';
import React from 'react';
import HackerBackground from './HackerBackground';

const steps = [
  {
    icon: ShieldCheck,
    title: 'Secure Sign In',
    desc: 'Authenticate with GitHub or Google.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    icon: Rocket,
    title: 'Tell Us Your Skills',
    desc: 'Select languages & experience.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
    border: 'border-accent-purple/20',
  },
  {
    icon: Filter,
    title: 'Get Matched',
    desc: 'Browse curated issues for you.',
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/20',
  },
];

export default function LandingHero({
  githubAction,
  googleAction,
}: {
  githubAction: () => void;
  googleAction: () => void;
}) {
  return (
    <div className="relative overflow-hidden w-full flex flex-col items-center pt-20 pb-32 px-4 sm:px-6">
      {/* Background Animated Dots & Hacker Matrix */}
      <HackerBackground />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-darkcard/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,212,255,0.1)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-secondaryText font-mono">
            Built for Developer Discovery
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-[-0.02em] font-heading leading-tight mb-6">
            Find Your First <br className="hidden md:block" />
            <span className="text-gradient animate-shimmer bg-[size:200%_auto]"> Open Source</span> Contribution
          </h1>
          <p className="text-xl md:text-2xl text-secondaryText font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop searching blindly. Tell us your skills and we&apos;ll instantly match you with beginner-friendly issues from real GitHub repositories.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-2xl mx-auto"
        >
          <form action={githubAction} className="w-full relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent-purple rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <button
              type="submit"
              className="relative w-full bg-darkcard border border-border hover:border-primary/50 text-foreground font-semibold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              Get Started with GitHub <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <form action={googleAction} className="w-full relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-success to-primary rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <button
              type="submit"
              className="relative w-full bg-darkcard border border-border hover:border-success/50 text-foreground font-semibold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              Get Started with Google <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>

        {/* Steps */}
        <div className="mt-40 w-full max-w-5xl relative">
          <div className="hidden md:block absolute top-[35%] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-border/50 to-transparent -z-10 overflow-hidden">
            <motion.div 
               animate={{ x: ["-100%", "300%"] }} 
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="w-1/4 h-full bg-gradient-to-r from-transparent via-primary to-transparent blur-[1px]" 
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const glowShadow = i === 0 ? 'hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]' : 
                               i === 1 ? 'hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]' : 
                                         'hover:shadow-[0_0_40px_rgba(57,255,20,0.15)]';

            const glowBorder = i === 0 ? 'group-hover:border-primary/50' : 
                               i === 1 ? 'group-hover:border-accent-purple/50' : 
                                         'group-hover:border-success/50';

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`bg-darkcard/80 backdrop-blur-xl p-10 rounded-[2rem] border border-border/50 text-center flex flex-col items-center group relative overflow-hidden transition-all duration-500 hover:-translate-y-3 ${glowShadow} ${glowBorder}`}
              >
                {/* Giant Background Number */}
                <div className="absolute -top-6 -right-2 text-9xl font-black italic opacity-[0.02] text-white font-heading pointer-events-none group-hover:opacity-[0.08] group-hover:scale-105 transition-all duration-700">
                  0{i + 1}
                </div>

                {/* Glowing Background Blob inside card */}
                <div className={`absolute -inset-10 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[50px] rounded-full pointer-events-none ${step.bg}`} />

                <div className={`relative z-10 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 bg-darkbase border border-border/50 shadow-inner group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 overflow-hidden`}>
                  <div className={`absolute inset-0 opacity-20 ${step.bg}`} />
                  <step.icon className={`w-10 h-10 ${step.color} drop-shadow-lg`} />
                </div>

                <h3 className="relative z-10 text-2xl font-bold font-heading mb-4 text-foreground group-hover:text-white transition-colors">{step.title}</h3>
                <p className="relative z-10 text-secondaryText leading-relaxed font-medium">{step.desc}</p>
              </motion.div>
            );
          })}
          </div>
        </div>

        {/* Learning Path Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 w-full max-w-4xl group"
        >
          <div className="relative p-[2px] rounded-[2rem] overflow-visible">
            {/* Animated glowing gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent-purple to-success animate-shimmer bg-[size:200%_auto] opacity-80 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
            
            {/* Super blur glow behind the banner wrapping */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent-purple to-success blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none rounded-[3rem]" />

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-border/50 bg-darkbase/95 backdrop-blur-xl rounded-[calc(2rem-2px)] shadow-2xl">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-border flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(139,92,246,0.6)] animate-float">
                  <svg className="w-8 h-8 text-accent-purple drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#00d4ff] font-mono mb-2 drop-shadow-[0_0_5px_rgba(0,212,255,0.8)] animate-pulse">New ✦ Resource</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-heading mb-3 text-white drop-shadow-md">Not sure where to start?</h2>
                  <p className="text-secondaryText max-w-md text-sm md:text-base leading-relaxed">
                    Follow a structured learning path to master open-source contribution — from your first commit to your first merged PR.
                  </p>
                </div>
              </div>
              
              <a
                href="https://oss-learning-path.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-darkbase bg-white transition-all hover:scale-[1.05] active:scale-95 shrink-0 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]"
              >
                {/* Button Glow pulse */}
                <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-primary/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2 drop-shadow-sm font-extrabold">
                  Open Source Learning
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 drop-shadow-md" />
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
