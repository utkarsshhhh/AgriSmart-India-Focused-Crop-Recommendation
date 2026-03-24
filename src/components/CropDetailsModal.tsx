import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Thermometer, Bug, IndianRupee, BookOpen, CheckCircle2, Sprout } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { CROP_IMAGES } from '../constants/cropImages';

interface CropDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cropName: string;
  details: {
    optimalConditions: { soil: string; climate: string };
    pestsAndDiseases: string[];
    marketPrice: string;
    bestPractices: string[];
  } | null;
  loading: boolean;
}

export function CropDetailsModal({ isOpen, onClose, cropName, details, loading }: CropDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-[var(--bg-card)] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="p-6 border-b border-[var(--border-main)] flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-900/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-lg text-white">
                < IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[var(--text-main)]">{cropName} Details</h2>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Agricultural Guide</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--bg-input)] rounded-full transition-colors text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-100 dark:border-emerald-900 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-[var(--text-muted)] font-medium">Fetching expert insights...</p>
              </div>
            ) : details ? (
              <>
                {/* Crop Image Header */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
                  {CROP_IMAGES[cropName.toLowerCase()] ? (
                    <img 
                      src={CROP_IMAGES[cropName.toLowerCase()]} 
                      alt={cropName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full organic-gradient flex items-center justify-center text-white">
                      <Sprout className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h3 className="text-2xl font-black text-white tracking-tight">{cropName}</h3>
                  </div>
                </div>

                {/* Market Price */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 flex items-center justify-between border border-emerald-100 dark:border-emerald-500/20">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Market Price (Approx.)</p>
                    <p className="text-2xl font-black text-emerald-900 dark:text-emerald-400">{details.marketPrice}</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-card)] rounded-xl shadow-sm">
                    <IndianRupee className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Optimal Conditions */}
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">
                      <Thermometer className="w-4 h-4 text-emerald-500" />
                      Optimal Conditions
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-[var(--bg-input)] rounded-xl border border-[var(--border-main)]">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">Soil Type</p>
                        <p className="text-sm text-[var(--text-main)] leading-relaxed">{details.optimalConditions.soil}</p>
                      </div>
                      <div className="p-4 bg-[var(--bg-input)] rounded-xl border border-[var(--border-main)]">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">Climate</p>
                        <p className="text-sm text-[var(--text-main)] leading-relaxed">{details.optimalConditions.climate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pests & Diseases */}
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">
                      <Bug className="w-4 h-4 text-emerald-500" />
                      Common Pests & Diseases
                    </h3>
                    <ul className="space-y-2">
                      {details.pestsAndDiseases.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-emerald-500" />
                    Cultivation Best Practices
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {details.bestPractices.map((practice, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-xl border border-emerald-100/50 dark:border-emerald-500/20">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <p className="text-sm text-[var(--text-main)] leading-relaxed">{practice}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
          
          <div className="p-6 bg-[var(--bg-input)] border-t border-[var(--border-main)]">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl font-bold text-[var(--text-main)] hover:bg-[var(--bg-input)] transition-colors"
            >
              Close Guide
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
