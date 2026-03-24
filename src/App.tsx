/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Predictor from './pages/Predictor';
import EDA from './pages/EDA';
import Evaluation from './pages/Evaluation';
import { Sprout, BarChart3, ShieldCheck, ChevronRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('predictor');
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { id: 'predictor', label: 'Crop Predictor', icon: Sprout, desc: 'AI Recommendation' },
    { id: 'eda', label: 'EDA & Insights', icon: BarChart3, desc: 'Data Visualization' },
    { id: 'evaluation', label: 'Model Evaluation', icon: ShieldCheck, desc: 'Performance Metrics' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] font-sans text-[var(--text-main)] selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-main)] sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="organic-gradient p-2.5 rounded-xl text-white shadow-lg shadow-emerald-200/20 cursor-pointer"
                onClick={() => setActiveTab('predictor')}
              >
                <Sprout className="w-6 h-6" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-[var(--text-main)] tracking-tighter leading-none">AgriSmart</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] mt-1">Precision Agriculture</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-5 py-2.5 rounded-2xl transition-all duration-500 ${
                      isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <Icon className={`w-4 h-4 transition-all duration-500 ${isActive ? 'scale-110 rotate-12' : 'group-hover:scale-110'}`} />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-bold leading-none tracking-tight">{tab.label}</span>
                        <span className="text-[9px] font-semibold opacity-50 leading-none mt-1 uppercase tracking-wider">{tab.desc}</span>
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-emerald-50/80 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100/50 dark:border-emerald-500/20 shadow-sm"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-emerald-600 transition-all duration-300 shadow-sm"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] rounded-full text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest border border-[var(--border-main)]">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Analysis
              </div>
              
              {/* Mobile Nav Toggle */}
              <div className="lg:hidden flex items-center">
                 <select 
                  value={activeTab} 
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl px-4 py-2 text-sm font-bold text-[var(--text-main)] focus:ring-2 focus:ring-emerald-500 shadow-sm appearance-none pr-10 relative"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                 >
                   {tabs.map(tab => <option key={tab.id} value={tab.id} className="bg-[var(--bg-card)] text-[var(--text-main)]">{tab.label}</option>)}
                 </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {activeTab === 'predictor' && <Predictor />}
            {activeTab === 'eda' && <EDA />}
            {activeTab === 'evaluation' && <Evaluation />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--bg-card)] border-t border-[var(--border-main)] pt-20 pb-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h4 className="text-xs font-black text-[var(--text-main)] uppercase tracking-[0.2em]">Platform</h4>
              <ul className="space-y-3">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button 
                      onClick={() => setActiveTab(tab.id)}
                      className="text-sm text-[var(--text-muted)] hover:text-emerald-600 transition-colors font-medium"
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[var(--border-main)] flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.3em]">
              © 2026 • Intelligence for Agriculture
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Privacy Policy</span>
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
